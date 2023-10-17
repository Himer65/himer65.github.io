const drawSquare = function (x, y, width, height, color) {
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.fillStyle = color;
    ctx.fill();
}
 
const drawCall = function () {
    let color;
    for (let x = 0; x < 320; x += 40) {
        for (let y = 0; y < 320; y += 40) {
            if ((x / 40 + y / 40) % 2) {
                color = "#555555";
            } else {
                color = "#ececec";
            }

            drawSquare(x, y, 40, 40, color)
        }
    }
}

const drawPawn = function (x, y, color) {
    let pawn = new Image();
    pawn.src = "src/himer.png";
    ctx.drawImage(pawn, 0, 0, 40, 40)

}