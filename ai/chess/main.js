function square(square, piece) {
    let moves = game.moves({square: square, verbose: true});

    if (moves.length === 0) return;

    for (let i = 0; i < moves.length; i++) {
        let $square = $("#board .square-" + moves[i].to);
        $square.css("background", "#2cff367b");
        
        if ($square.hasClass('black-3c85d')) {
            $square.css("background", "#125d157b");
        }
    }
}

function removeSquare(square, piece) {
    $("#board .square-55d63").css("background", "");
}

function onDragStart(source, piece, position, orientation) {
  if ((piece.search(/^w/) === -1) || game.game_over()) {
    return false;
  }
}

function onDrop (source, target) {
    removeSquare();

    let move = game.move({
        from: source,
        to: target,
        promotion:"q",
    });

    if (move === null) return "snapback";
}

function onSnapEnd () {
    board.position(game.fen());
}

async function loadModel() {
    try {
        console.log("Загрузка ONNX модели PlanktonAI...");

        // 1. Отключаем многопоточность (устраняет предупреждение)
        ort.env.wasm.numThreads = 1;

        // 2. Пробуем загрузить модель напрямую по URL
        // Это самый простой и часто самый надежный способ
        ortSession = await ort.InferenceSession.create(MODEL_URL, {
            executionProviders: ['wasm'],
        });

        console.log("Модель успешно загружена. Входы:", ortSession.inputNames, "Выходы:", ortSession.outputNames);

    } catch (e) {
        // 3. Если прямая загрузка не удалась, пробуем через fetch (ваш старый метод)
        console.warn("Прямая загрузка не удалась, пробуем через fetch...", e);
        try {
            const response = await fetch(MODEL_URL);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const modelBuffer = await response.arrayBuffer();
            
            ortSession = await ort.InferenceSession.create(modelBuffer, {
                executionProviders: ['wasm'],
            });
            console.log("Модель успешно загружена через fetch.");
        } catch (fetchError) {
            console.error("Критическая ошибка загрузки модели:", fetchError);
        }
    }
}

const config = {
    position: "start",
    draggable: true, 
    dropOffBoard: "snapback",
    pieceTheme: "./image/{piece}.png",
    onDragStart: onDragStart,
    onDrop: onDrop,
    onSnapEnd: onSnapEnd,
    onMouseoverSquare: square,
    onMouseoutSquare: removeSquare,
};
const pieceMap = {
    "P": 1, "N": 2, "B": 3, "R": 4, "Q": 5, "K": 6,
    "p": 7, "n": 8, "b": 9, "r": 10, "q": 11, "k": 12
};
const MODEL_URL = "https://cdn.jsdelivr.net/gh/Himer65/PlanktonAI@main/onnx_models/plankton.onnx";
const MODEL_DATA_URL = "https://cdn.jsdelivr.net/gh/Himer65/PlanktonAI@main/onnx_models/plankton.onnx.data";

loadModel();
const board = Chessboard("board", config);
const game = new Chess();
$("#startButton").on("click", function startButton() {
    board.start();
    game.reset();
});