let boll = document.querySelector("#neuron").querySelector(".boll");
let bollX = Math.floor(Math.random() * 30); let XP = 0;
let bollY = 0; let YP = 0;


const boll_animation = function () {
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
};
setInterval(boll_animation, 15);


let canvas = document.querySelector("#noise");
let ctx = canvas.getContext("2d");
let imageData = ctx.createImageData(ctx.canvas.width, ctx.canvas.height);

const noise_animation = function () {
    for (let i = 0; i < imageData.data.length; i += 4) {
        color = Math.random() * 255;
        imageData.data[i]     = color;
        imageData.data[i + 1] = color;
        imageData.data[i + 2] = color;
        imageData.data[i + 3] = 255;
    }
    ctx.putImageData(imageData, 0, 0);
}
setInterval(noise_animation, 30);



	
	