let boll = document.querySelector("#neuron").querySelector(".boll");
let bollX = Math.floor(Math.random() * 30); let XP = 0;
let bollY = 0; let YP = 0;


const neuron_animation = function () {
    if (bollX === 0 || bollX === 30 ||
        bollY === 0 || bollY === 280) {
        if (Math.random() > 0.5) {
            XP = 1;
        } else {
            XP = -1;
        }

        if (Math.random() > 0.5) {
            YP = 1;
        } else {
            YP = -1;
        }
    }
    
    bollX = Math.max(Math.min(bollX + XP, 30), 0);
    bollY = Math.max(Math.min(bollY + YP, 280), 0);
    boll.style = `top: ${bollX}px; left: ${bollY}px`;
}


let noise = document.querySelector("#noise");
let ctx = noise.getContext("2d");
let color;

const game_animation = function () {
    for (let x = 0; x < 300; x += 2) {
        for (let y = 0; y < 50; x += 2) {
            ctx.beginPath();
            ctx.rect(y, x, 2, 2);
            ctx.fillStyle = "#FF0000f0";
            ctx.fill();
            ctx.closePath();
        }
    }
    
    
}


setInterval(neuron_animation, 15);
//setInterval(game_animation, 1000)
	
	