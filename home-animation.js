let boll = document.querySelector("#neuron").querySelector(".boll");
let bollX = Math.floor(Math.random() *  30); let XP = Math.random() * 4 - 2;
let bollY = Math.floor(Math.random() * 280); let YP = Math.random() * 4 - 2;


const boll_animation = function () {
    if (bollX <= 0 || bollX >= 30 ||
        bollY <= 0 || bollY >= 280) {
        XP = Math.random() * 4 - 2;
        YP = Math.random() * 4 - 2;
    }
    
    bollX += XP; bollY += YP;
    boll.style = `top: ${Math.floor( bollX )}px; left: ${Math.floor( bollY )}px`;
};
setInterval(boll_animation, 15);


let canvas = document.querySelector("#noise");
let ctx = canvas.getContext("2d");
ctx.canvas.width  = canvas.offsetWidth;
ctx.canvas.height = canvas.offsetHeight;
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



	
	