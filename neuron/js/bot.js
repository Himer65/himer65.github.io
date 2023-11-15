const StrToArray = function(str) {
    let [fen, tour] = str.split(" ").slice(0, 2);
    fen = fen.replace(/\//gi, "")
        .replace(/1/gi, ".")
        .replace(/2/gi, "..")
        .replace(/3/gi, "...")
        .replace(/4/gi, "....")
        .replace(/5/gi, ".....")
        .replace(/6/gi, "......")
        .replace(/7/gi, ".......")
        .replace(/8/gi, "........");
    let hot = new Float32Array(770).fill(0.0);

    for (let idx = 0; idx < fen.length; idx++) {
        switch (fen[idx]) {
            case "r":
                hot[idx*12 +  0] = 1.0;
                continue;
            case "n":
                hot[idx*12 +  1] = 1.0;
                continue;
            case "b": 
                hot[idx*12 +  2] = 1.0;
                continue;
            case "q":
                hot[idx*12 +  3] = 1.0;
                continue;
            case "k":
                hot[idx*12 +  4] = 1.0;
                continue;
            case "p":
                hot[idx*12 +  5] = 1.0;
                continue;
            case "R":
                hot[idx*12 +  6] = 1.0;
                continue;
            case "N":
                hot[idx*12 +  7] = 1.0;
                continue;
            case "B":
                hot[idx*12 +  8] = 1.0;
                continue;
            case "Q":
                hot[idx*12 +  9] = 1.0;
                continue;
            case "K":
                hot[idx*12 + 10] = 1.0;
                continue;
            case "P":
                hot[idx*12 + 11] = 1.0;
                continue;
            case ".":
                continue;
        }
    }

    if (tour === "b") {
        hot[768] = 1.0;
    } else {
        hot[769] = 1.0;
    }

    const x = new onnx.Tensor(hot, "float32", [1, 770]);
    return x;
};

const Bot = async function(fen) {
    const inp = StrToArray(fen);
    let out = await _bot.run([inp]);
    return out.values().next().value.data[0];
};


const _bot = new onnx.InferenceSession();
_bot.loadModel("./js/ChessBot.onnx").then(() => {
    console.log("Bot download");
});