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

let config = {
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

const board = Chessboard("board", config);
const game = new Chess();
$("#startButton").on("click", function startButton() {
    board.start();
    game.reset();
});