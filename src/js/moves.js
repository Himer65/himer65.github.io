const _movesPawn = function (x, y, part) {
    if (part[y][x][1] === "W" &&
        part[y - 40][x][1] != "W") {
        if (y === 240 &&
            part[y - 80][x][1] != "W") {
            return [
                {x: x, y: y - 40},
                {x: x, y: y - 80},
            ];
        }
        return [{x: x, y: Math.max(y - 40, 0)}];
    }
    return [];
}

const _movesTower = function (x, y, part) {
    if (part[y][x][1] === "W") {
        let moves = [];

        for (let i = 40; i != 320; i += 40) {
            if (!((y - i) >= 0)) break;

            if (part[y - i][x][0] === "N") moves.push({x: x, y: y - i}) // Вверх
            else if (part[y - i][x][0] != "N") {
                if (part[y - i][x][1] === "B") moves.push({x: x, y: y - i})
                break;
            }
        }

        for (let i = 40; i != 320; i += 40) {
            if (!((y + i) <= 280)) break;

            if (part[y + i][x][0] === "N") moves.push({x: x, y: y + i}) // Вниз
            else if (part[y + i][x][0] != "N") {
                if (part[y + i][x][1] === "B") moves.push({x: x, y: y + i})
                break;
            }
        }

        for (let i = 40; i != 320; i += 40) {
            if (!((x + i) <= 280)) break;

            if (part[y][x + i][0] === "N") moves.push({x: x + i, y: y}) // Вправо
            else if (part[y][x + i][0] != "N") {
                if (part[y][x + i][1] === "B") moves.push({x: x + i, y: y})
                break;
            }
        }

        for (let i = 40; i != 320; i += 40) {
            if (!((x - i) >= 0)) break;

            if (part[y][x - i][0] === "N") moves.push({x: x - i, y: y}) // Влево
            else if (part[y][x - i][0] != "N") {
                if (part[y][x - i][1] === "B") moves.push({x: x - i, y: y})
                break;
            }
        }
        return moves;
    }
    return [];
}

const _movesHorse = function (x, y, part) {
    if (part[y][x][1] === "W") {
        let moves = [];

        for (r of [-2, -1, 1, 2]) {
            for (i of [-2, -1, 1, 2]) {
                if ((x + r*40) <= 280 &&
                    (y + i*40) <= 280 &&
                    (x + r*40) >=   0 &&
                    (y + i*40) >=   0 &&
                    (Math.abs(r) + Math.abs(i) === 3))  {
            
                    if (part[y + i*40][x + r*40][1] != "W") moves.push({x: x + r*40, y: y + i*40});
                }
            }
        }
        return moves;
    }
    return [];
}

const _movesRook = function (x, y, part) {
    if (part[y][x][1] === "W") {
        let moves = [];

        for (let i = 40; i != 320; i += 40) {
            if (!((y - i) >= 0 &&
                  (x + i) <= 280)) break;

            if (part[y - i][x + i][0] === "N") moves.push({x: x + i, y: y - i})
            else if (part[y - i][x + i][0] != "N") {
                if (part[y - i][x + i][1] === "B") moves.push({x: x + i, y: y - i})
                break;
            }
        }

        for (let i = 40; i != 320; i += 40) {
            if (!((y + i) <= 280 &&
                  (x + i) <= 280)) break;

            if (part[y + i][x + i][0] === "N") moves.push({x: x + i, y: y + i})
            else if (part[y + i][x + i][0] != "N") {
                if (part[y + i][x + i][1] === "B") moves.push({x: x + i, y: y + i})
                break;
            }
        }

        for (let i = 40; i != 320; i += 40) {
            if (!((y + i) <= 280 &&
                  (x - i) >= 0)) break;

            if (part[y + i][x - i][0] === "N") moves.push({x: x - i, y: y + i})
            else if (part[y + i][x - i][0] != "N") {
                if (part[y + i][x - i][1] === "B") moves.push({x: x - i, y: y + i})
                break;
            }
        }

        for (let i = 40; i != 320; i += 40) {
            if (!((y - i) >= 0 &&
                  (x - i) >= 0)) break;

            if (part[y - i][x - i][0] === "N") moves.push({x: x - i, y: y - i})
            else if (part[y - i][x - i][0] != "N") {
                if (part[y - i][x - i][1] === "B") moves.push({x: x - i, y: y - i})
                break;
            }
        }
        return moves;
    }
    return [];
}

const _movesQueen = function (x, y, part) {
    if (part[y][x][1] === "W") {
        let tower = _movesTower(x, y, part);
        let rook = _movesRook(x, y, part);
        return [...tower, ...rook];
    }
    return [];
}

const _movesKing = function (x, y, part) {
    if (part[y][x][1] === "W") {
        let moves = [];

        for (r of [-40, 0, 40]) {
            for (i of [-40, 0, 40]) {
                if ((x + r) <= 280 &&
                    (y + i) <= 280 &&
                    (x + r) >=   0 &&
                    (y + i) >=   0) {
                    
                    if (part[y + i][x + r][1] != "W") moves.push({x: x + r, y: y + i});
                }
            }
        }
        return moves;
    }
    return [];
}

const rightMoves = function (x, y, part) {
    switch (part[y][x][0]) {
        case "P":
            return _movesPawn(x, y, part);
        case "T":
            return _movesTower(x, y, part);
        case "H":
            return _movesHorse(x, y, part);
        case "R":
            return _movesRook(x, y, part);
        case "Q":
            return _movesQueen(x, y, part);
        case "K":
            return _movesKing(x, y, part);
    }

    return [];
}