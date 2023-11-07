const onDragStart = function(source, piece, position, orientation) {
    if (piece[0] === "b") {
        return false;
    }
    
    if (game.game_over()) {
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

    console.log("you: ", Bot(game.fen()));
    MoveBot();
};

const MoveBot = function() {
    let save = game.fen(),
        max  = -2,
        max_fen;

    for (let move of game.moves()) {
        game.move(move);
        let pred = Bot(game.fen());

        if (pred > max) {
            max = pred;
            max_fen = game.fen();
        }

        game.load(save);
    }

    console.log("bot: ", max);
    game.load(max_fen);
    board.position(game.fen());
}

function buttonRepit() {
    game.load("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
    board.position(game.fen());
};


let config = {
    pieceTheme: "chess/{piece}.png",
    position: "start",
    draggable: true,
    onDragStart: onDragStart,
    onDrop: onDrop,
    onSnapEnd: onSnapEnd,
};

let board = Chessboard("board", config);
let game = new Chess();