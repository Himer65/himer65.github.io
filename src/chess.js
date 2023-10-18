let board = document.getElementById("board")
let ctx = board.getContext("2d")


drawCell();
drawStart();

board.onclick = function (event) {
    let x = Math.floor(event.offsetX / 40) * 40;
    let y = Math.floor(event.offsetY / 40) * 40;
    drawPawn(x, y, "#ffdf5f")
    console.log(x, y);
}
