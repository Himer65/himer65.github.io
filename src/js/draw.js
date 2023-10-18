const drawSquare = function (x, y, width, height, color) {
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.fillStyle = color;
    ctx.fill();
}
 
const drawCell = function () {
    let color;
    for (let x = 0; x != 320; x += 40) {
        for (let y = 0; y != 320; y += 40) {
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
    drawCell();

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

    // Первая буква название фигуры, вторая цвет фигуры, третья тень на ячейке.
    let part = {
      0: {  0: "TB-",  40: "HB-",  80: "RB-", 120: "QB-", 160: "KB-", 200: "RB-", 240: "HB-", 280: "TB-"},
     40: {  0: "PB-",  40: "PB-",  80: "PB-", 120: "PB-", 160: "PB-", 200: "PB-", 240: "PB-", 280: "PB-"},
     80: {  0: "NN-",  40: "NN-",  80: "NN-", 120: "NN-", 160: "NN-", 200: "NN-", 240: "NN-", 280: "NN-"},
    120: {  0: "NN-",  40: "NN-",  80: "NN-", 120: "NN-", 160: "NN-", 200: "NN-", 240: "NN-", 280: "NN-"},
    160: {  0: "NN-",  40: "NN-",  80: "NN-", 120: "NN-", 160: "NN-", 200: "NN-", 240: "NN-", 280: "NN-"},
    200: {  0: "NN-",  40: "NN-",  80: "NN-", 120: "NN-", 160: "NN-", 200: "NN-", 240: "NN-", 280: "NN-"},
    240: {  0: "PW-",  40: "PW-",  80: "PW-", 120: "PW-", 160: "PW-", 200: "PW-", 240: "PW-", 280: "PW-"},
    280: {  0: "TW-",  40: "HW-",  80: "RW-", 120: "QW-", 160: "KW-", 200: "RW-", 240: "HW-", 280: "TW-"},
    }

    return part;
}

const drawPart = function (part) {
    drawCell();
    let figure, color;

    for (let x = 0; x != 320; x += 40) {
        for (let y = 0; y != 320; y += 40) {
            figure = part[y][x];

            if (figure[1] === "B") {
                color = "black";
            } else {
                color = "white";
            }

            switch (figure[0]) {
                case "P":
                    if (y === 0) {
                        drawQueen(x, y, color); 
                        part[y][x] = "Q" + part[y][x][1] + part[y][x][2]
                        break;
                    }
                    drawPawn(x, y, color); break;
                case "T":
                    drawTower(x, y, color); break;
                case "H":
                    drawHorse(x, y, color); break;
                case "R":
                    drawRook(x, y, color); break;
                case "Q":
                    drawQueen(x, y, color); break;
                case "K":
                    drawKing(x, y, color); break;
            }

            switch (figure[2]) {
                case "G":
                    drawSquare(x, y, 40, 40, "#00ff37a8");
                case "R":
                    drawSquare(x, y, 40, 40, "#6e000090")
            }
        }
    }
}