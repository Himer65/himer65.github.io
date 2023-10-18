const drawSquare = function (x, y, width, height, color) {
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.fillStyle = color;
    ctx.fill();
}
 
const drawCell = function () {
    let color;
    for (let x = 0; x < 320; x += 40) {
        for (let y = 0; y < 320; y += 40) {
            if ((x / 40 + y / 40) % 2) {
                color = "#686868";
            } else {
                color = "#8b8b8b";
            }

            drawSquare(x, y, 40, 40, color);
        }
    }
}

const drawPawn = function (x, y, color) {
    drawSquare(x + 5, y + 33, 31, 6, color);
    drawSquare(x + 13, y + 27, 15, 6, color);
    drawSquare(x + 17, y + 10, 7, 17, color);
    drawSquare(x + 12, y + 13, 17, 6, color);
}

const drawKing = function (x, y, color) {
    drawSquare(x + 5, y + 38, 32, 2, color);
    drawSquare(x + 8, y + 34, 26, 5, color);
    drawSquare(x + 10, y + 31, 22, 3, color);
    drawSquare(x + 13, y + 15, 16, 16, color);
    drawSquare(x + 10, y + 17, 22, 9, color);
    drawSquare(x + 5, y + 7, 32, 8, color);
    drawSquare(x + 8, y + 4, 5, 3, color);
    drawSquare(x + 10, y + 1, 3, 3, color);
    drawSquare(x + 15, y + 4, 12, 3, color);
    drawSquare(x + 18, y + 1, 6, 3, color);
    drawSquare(x + 29, y + 4, 5, 3, color);
    drawSquare(x + 29, y + 1, 3, 3, color);
}

const drawQueen = function (x, y, color) {
    drawSquare(x + 4, y + 38, 32, 2, color);
    drawSquare(x + 7, y + 30, 26, 9, color);
    drawSquare(x + 12, y + 25, 16, 5, color);
    drawSquare(x + 9, y + 16, 22, 9, color);
    drawSquare(x + 7, y + 11, 26, 5, color);
    drawSquare(x + 4, y + 5, 5, 8, color);
    drawSquare(x + 31, y + 5, 5, 8, color);
    drawSquare(x + 17, y, 6, 11, color);
    drawSquare(x + 12, y + 2, 16, 6, color);
}

const drawRook = function (x, y, color) {
    drawSquare(x + 3, y + 38, 34, 2, color);
    drawSquare(x + 8, y + 36, 24, 2, color);
    drawSquare(x + 14, y + 33, 12, 3, color);
    drawSquare(x + 8, y + 8, 24, 25, color);
    drawSquare(x + 11, y + 3, 18, 5, color);
    drawSquare(x + 14, y, 12, 3, color);
}

const drawHorse = function (x, y, color) {
    drawSquare(x + 4, y + 38, 32, 2, color);
    drawSquare(x + 9, y + 33, 22, 6, color);
    drawSquare(x + 14, y + 28, 14, 5, color);
    drawSquare(x + 12, y + 25, 13, 3, color);
    drawSquare(x + 9, y + 21, 19, 4, color);
    drawSquare(x + 31, y + 22, 5, 3, color);
    drawSquare(x + 9, y + 20, 30, 2, color);
    drawSquare(x + 6, y + 17, 27, 4, color);
    drawSquare(x + 36, y + 17, 3, 5, color);
    drawSquare(x + 9, y + 14, 27, 3, color);
    drawSquare(x + 6, y + 9, 16, 5, color);
    drawSquare(x + 22, y + 12, 4, 4, color);
    drawSquare(x + 25, y + 11, 8, 3, color);
    drawSquare(x + 25, y + 9, 6, 3, color);
    drawSquare(x + 9, y + 6, 19, 3, color);
    drawSquare(x + 12, y + 3, 16, 3, color);
    drawSquare(x + 16, y + 1, 3, 2, color);
    drawSquare(x + 22, y + 1, 3, 2, color);
}

const drawTower = function (x, y, color) {
    drawSquare(x + 5, y + 38, 31, 2, color);
    drawSquare(x + 10, y + 33, 5, 5, color);
    drawSquare(x + 26, y + 33, 6, 5, color);
    drawSquare(x + 10, y + 30, 8, 3, color);
    drawSquare(x + 23, y + 30, 9, 3, color);
    drawSquare(x + 10, y + 19, 22, 11, color);
    drawSquare(x + 5, y + 6, 32, 13, color);
    drawSquare(x + 5, y, 5, 6, color);
    drawSquare(x + 13, y, 5, 6, color);
    drawSquare(x + 23, y, 5, 6, color);
    drawSquare(x + 32, y, 5, 6, color);
}

const drawStart = function () {
    let pawnBlackXY = [
        {x: 0, y: 40},
        {x: 40, y: 40},
        {x: 80, y: 40},
        {x: 120, y: 40},
        {x: 160, y: 40},
        {x: 200, y: 40},
        {x: 240, y: 40},
        {x: 280, y: 40},
    ]
    for ({x, y} of pawnBlackXY) {
        drawPawn(x, y, "black");
    }

    let pawnWhiteXY = [
        {x: 0, y: 240},
        {x: 40, y: 240},
        {x: 80, y: 240},
        {x: 120, y: 240},
        {x: 160, y: 240},
        {x: 200, y: 240},
        {x: 240, y: 240},
        {x: 280, y: 240},
    ]
    for ({x, y} of pawnWhiteXY) {
        drawPawn(x, y, "white");
    }

    drawKing(160, 0, "black");
    drawKing(160, 280, "white");
    drawQueen(120, 0, "black");
    drawQueen(120, 280, "white");
    drawRook(80, 0, "black"); drawRook(200, 0, "black");
    drawRook(80, 280, "white"); drawRook(200, 280, "white");
    drawHorse(40, 0, "black"); drawHorse(240, 0, "black");
    drawHorse(40, 280, "white"); drawHorse(240, 280, "white");
    drawTower(0, 0, "black"); drawTower(280, 0, "black");
    drawTower(0, 280, "white"); drawTower(280, 280, "white");
}