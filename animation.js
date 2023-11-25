// neuron widget
let boll = document.querySelector("#neuron").querySelector(".boll");
let bollX = Math.floor(Math.random() *  30); let speedX = Math.random() * 4 - 2;
let bollY = Math.floor(Math.random() * 280); let speedY = Math.random() * 4 - 2;


const boll_animation = function () {
    if (bollX <= 0 || bollX >= 30 ||
        bollY <= 0 || bollY >= 280) {
        speedX = (Math.random() * 4 - 2 - speedX * 1e-1) / 2;
        speedY = (Math.random() * 4 - 2 - speedY * 1e-1) / 2;
    }
    bollX += speedX; bollY += speedY;
    boll.style = `top: ${bollX}px; left: ${bollY}px`;
};
setInterval(boll_animation, 15);