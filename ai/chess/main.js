/* PlanktonAI browser inference adapter.
 * Board tensor follows core/data.py: FEN rank 8 -> rank 1, then files a -> h.
 * Context follows the actual training code: [whiteTurn, blackTurn, K, Q, k, q, halfmove/50].
 * The README's alternative context description does not match core/data.py.
 */
"use strict";

const PIECE_ID = { p: 1, n: 2, b: 3, r: 4, q: 5, k: 6 };
const statusNode = document.getElementById("status");
const restartButton = document.getElementById("startButton");
const game = new Chess();

let board = null;
let session = null;
let aiBusy = false;
let gameStarted = false;

function setStatus(message) {
    statusNode.textContent = message;
}

function boardTensor() {
    const rows = game.board(); // chess.js returns rank 8 first, as core/data.py expects.
    const values = [];
    for (const row of rows) {
        for (const piece of row) {
            if (!piece) {
                values.push(0);
                continue;
            }
            const id = PIECE_ID[piece.type];
            values.push(piece.color === "w" ? id : id + 6);
        }
    }
    return new BigInt64Array(values.map(BigInt));
}

function contextTensor() {
    const fields = game.fen().split(" ");
    const turn = fields[1];
    const castling = fields[2];
    const halfmove = Number(fields[4]) || 0;
    const has = (right) => castling !== "-" && castling.includes(right) ? 1 : 0;
    return new Float32Array([
        turn === "w" ? 1 : 0,
        turn === "b" ? 1 : 0,
        has("K"), has("Q"), has("k"), has("q"),
        halfmove / 50
    ]);
}

function moveScore(move, output) {
    const fromX = move.from.charCodeAt(0) - 97;
    const fromY = Number(move.from[1]) - 1;
    const toX = move.to.charCodeAt(0) - 97;
    const toY = Number(move.to[1]) - 1;
    // Model output is [batch, 4, 8]: from_x, from_y, to_x, to_y.
    return output[fromX] * output[8 + fromY] *
        output[16 + toX] * output[24 + toY];
}

async function chooseAIMove() {
    const legalMoves = game.moves({ verbose: true });
    if (!legalMoves.length) return null;

    const feeds = {
        board: new ort.Tensor("int64", boardTensor(), [1, 8, 8]),
        context: new ort.Tensor("float32", contextTensor(), [1, 7])
    };
    const results = await session.run(feeds);
    const outputName = session.outputNames[0];
    const output = results[outputName].data;

    let bestMove = legalMoves[0];
    let bestScore = -Infinity;
    for (const move of legalMoves) {
        const score = moveScore(move, output);
        if (Number.isFinite(score) && score > bestScore) {
            bestScore = score;
            bestMove = move;
        }
    }
    return bestMove;
}

async function playAI() {
    if (!session || aiBusy || game.game_over() || game.turn() !== "b") return;
    aiBusy = true;
    restartButton.disabled = true;
    board.draggable = false;
    setStatus("PlanktonAI думает…");

    try {
        const move = await chooseAIMove();
        if (move) {
            game.move({
                from: move.from,
                to: move.to,
                promotion: move.promotion || "q"
            });
            board.position(game.fen());
        }
        updateGameStatus();
    } catch (error) {
        console.error("PlanktonAI inference failed:", error);
        setStatus("Не удалось выполнить ход ИИ. Проверьте загрузку модели и обновите страницу.");
    } finally {
        aiBusy = false;
        restartButton.disabled = false;
        board.draggable = true;
    }
}

function updateGameStatus() {
    if (game.in_checkmate()) {
        setStatus(game.turn() === "w" ? "Мат. PlanktonAI победил." : "Мат! Вы победили.");
    } else if (game.in_draw()) {
        setStatus("Ничья.");
    } else if (game.in_check()) {
        setStatus(game.turn() === "w" ? "Шах вам." : "Шах PlanktonAI.");
    } else {
        setStatus(game.turn() === "w" ? "Ваш ход." : "Ход PlanktonAI.");
    }
}

function onDragStart(source, piece) {
    if (aiBusy || game.game_over() || game.turn() !== "w" || piece.search(/^w/) !== 0) {
        return false;
    }
}

function onDrop(source, target) {
    const move = game.move({ from: source, to: target, promotion: "q" });
    if (move === null) return "snapback";

    board.position(game.fen());
    updateGameStatus();
    if (!game.game_over()) {
        // Let the board finish its snap animation before the AI response.
        window.setTimeout(playAI, 80);
    }
}

function onSnapEnd() {
    board.position(game.fen());
}

function resetGame() {
    if (aiBusy) return;
    game.reset();
    board.start();
    updateGameStatus();
}

async function initialize() {
    const config = {
        position: "start",
        draggable: true,
        dropOffBoard: "snapback",
        pieceTheme: "./image/{piece}.png",
        onDragStart,
        onDrop,
        onSnapEnd
    };
    board = Chessboard("board", config);
    restartButton.addEventListener("click", resetGame);

    try {
        if (!window.ort) throw new Error("ONNX Runtime Web не загрузился");
        ort.env.wasm.numThreads = 1;
        session = await ort.InferenceSession.create("./plankton.onnx", {
            executionProviders: ["wasm"]
        });
        restartButton.disabled = false;
        gameStarted = true;
        updateGameStatus();
    } catch (error) {
        console.error("Could not load PlanktonAI model:", error);
        setStatus("Нейросеть не загрузилась. Проверьте поддержку ONNX-модели и доступность файлов модели.");
        restartButton.disabled = false;
    }
}

initialize();
