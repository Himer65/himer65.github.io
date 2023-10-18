let board = document.getElementById("board");
let ctx = board.getContext("2d");


let part = drawStart();
let move = false;
let goesX, goesY;

board.onclick = function (event) {
    let x = Math.floor(event.offsetX / 40) * 40;
    let y = Math.floor(event.offsetY / 40) * 40;

    if (move && (x != goesX || y != goesY)) {
        if (rightMoves(goesX, goesY, part)
            .findIndex(
                (e) => e.x === x && e.y == y
            ) != -1 ) {
            part[y][x] = part[goesY][goesX]
            part[goesY][goesX] = "NN-";
        }

        move = false;
    } else if (!move && (x === goesX && y === goesY)) { 
        move = true;
    } else if (!move && part[y][x][0] != "N") {
        move = true;
        goesX = x;
        goesY = y;
    } else {
        move = false;
    }

    if (move) {
        for ({x, y} of rightMoves(x, y, part)) {
            if (part[y][x][0] === "N") {
                part[y][x] =  part[y][x][0] + part[y][x][1] + "G";
            } else {
                part[y][x] =  part[y][x][0] + part[y][x][1] + "R";
            }
        }
    } else {
        for (let x = 0; x != 320; x += 40) {
            for (let y = 0; y != 320; y += 40) {
                part[y][x] =  part[y][x][0] + part[y][x][1] + "-";
            }
        }
    }
    
    drawPart(part);
}

let repit = document.getElementById("repit");
repit.onclick = function () {
    part = drawStart();
    move = false;
    goesX, goesY;
}