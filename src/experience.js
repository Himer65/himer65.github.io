let exp = "\
<b>\
2023.10.06 - Изучение языка ST (Structured Text)<br></br>\
2023.09.18 - Изучение HTML/CSS/JS и написание этой <a target='_blank' href='https://github.com/Himer65/himer65.github.io'>визитки-сайта.</a><br></br>\
2022.10.05 - Начало работы с фреймворком <a target='_blank' href='https://github.com/Himer65/pytorch-test'>PyTorch.</a><br></br>\
2021 год - Начало изучения языка Python, в частности Искуственного Интелекта.<br></br>\
</b>\
"

let app = new Vue({
    el: '#experience',
    data: {
      inner: exp,
    }
})