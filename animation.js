// neuron widget
let boll = document.querySelector(".boll");

const winH = window.innerHeight - 30
const winW = window.innerWidth - 30

let bollX = Math.floor(30);
let speedX = Math.random() * 4 - 2;

let bollY = Math.floor(30);
let speedY = Math.random() * 4 - 2;


const boll_animation = function () {
    if ((bollX >= winH)||(bollX <= 0)) {
        speedX = -speedX
    } else if ((bollY >= winW)||(bollY <= 0)) {
        speedY = -speedY
    }

    bollX += speedX; bollY += speedY;
    boll.style = `top: ${bollX}px; left: ${bollY}px`;
};
setInterval(boll_animation, 15);