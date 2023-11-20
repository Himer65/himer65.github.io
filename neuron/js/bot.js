const _piece = {
    "r": 0, "q": 3,
    "n": 1, "k": 4,
    "b": 2, "p": 5,
};


const StrToArray = function(fen) {
    let hot = new Float32Array(385).fill(0);

    for (let idx = 0, hidx = 0; idx < fen.length; idx++, hidx += 6) {
        if (fen[idx] === " ") {
            let tour = fen[idx + 1] === "b" ? 1: -1;
            hot[384] = tour;
            break;
        } else if (fen[idx] === "/") {
            hidx -= 6;
            continue;
        } else if (!Object.keys(_piece).includes(fen[idx].toLowerCase())) {
            hidx += parseInt(fen[idx]) * 6 - 6;
            continue;
        }

        let P = !(fen[idx].toUpperCase() == fen[idx]) ? 1: -1;
        hot[hidx + _piece[fen[idx].toLowerCase()]] = P;
    }

    const x = new onnx.Tensor(hot, "float32", [1, 385]);
    return x;
};

let _cache = {};

const Bot = async function(fen) {
    let [part1, part2] = fen.split(" ").slice(0, 2);
    fen = part1 + " " + part2;

    if (Object.keys(_cache).includes(fen)) {
        return _cache[fen];
    } else {
        const inp = StrToArray(fen);
        let out = await _bot.run([inp]);
        out = out.values().next().value.data[0];
        _cache[fen] = out;
        return out;
    }
};


const _bot = new onnx.InferenceSession();
_bot.loadModel("./js/PlanktonBot.onnx").then(() => {
    console.log("Bot download");
});