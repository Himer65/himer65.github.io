function main(){
    ctx.fillStyle = "rgb(200,0,0)";
    ctx.fillRect(0, 0, 400, 400);
}


const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");          
window.setInterval(main, 30);