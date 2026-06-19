function main(){
    ctx.drawImage(board, 0, 0);
}


const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const board = new Image();
board.src = "./image/board.png";

window.setInterval(main, 30);