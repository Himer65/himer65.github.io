const onDragStart = function(source, piece, position, orientation) {
    if (game.game_over()) {
        if (game.turn() === "b") alert("Вы выйграли!");
        else alert("Вы проиграли!");
        buttonRepit();
        return false;
    }

    if (piece[0] === "b") {
        return false;
    }
    
    if ((game.turn() === "w" && piece.search(/^b/) !== -1) ||
        (game.turn() === "b" && piece.search(/^w/) !== -1)) {
        return false;
    }
};

const onDrop = function(source, target) {
    let move = game.move({
        from: source,
        to: target,
        promotion: "q",
    });
  
    if (move === null){
        return "snapback";
    }
};

const onSnapEnd = function() {
    board.position(game.fen());
    MoveBot();
};

const MoveBot = async function() {
    console.log("you: ", await Bot(game.fen()));

    let save1 = game.fen();
    let save2 = game.fen();
    let min = 2;
    let moveBot = game.moves()[0];

    for (let moveBlack of game.moves()) {
        game.move(moveBlack);
        save2 = game.fen();
        let max = -2;

        for (let moveWhite of game.moves()) {
            game.move(moveWhite);
            let predWhite = await Bot(game.fen());

            if (predWhite > max) {
                max = predWhite;
            }

            game.load(save2);
        }

        if (max < min) {
            min = max;
            moveBot = save2;
        }

        game.load(save1);
    }

    game.load(moveBot);
    board.position(game.fen());
    console.log("bot: ", await Bot(game.fen()));
};

function buttonRepit() {
    game.load("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
    board.position(game.fen());
};


let config = {
    pieceTheme: "chess/{piece}.png",
    position: "start",
    draggable: true,
    orientation: "white",
    showErrors: "alert",
    onDragStart: onDragStart,
    onDrop: onDrop,
    onSnapEnd: onSnapEnd,
};

let board = Chessboard("board", config);
let game = new Chess();