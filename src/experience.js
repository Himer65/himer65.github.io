let exp = "\
<b>\
2023.10.12 - Программирование контролеров на базе TwinCat.<br></br>\
2023.10.06 - Изучение языка ST (Structured Text)<br></br>\
2023.09.18 - Изучение HTML/CSS/JS и написание этой <a target='_blank' href='https://github.com/Himer65/himer65.github.io'>визитки-сайта.</a><br></br>\
Опыт работы с Linux и командной строкой.<br></br>\
2022.10.05 - Начало работы с фреймворком <a target='_blank' href='https://github.com/Himer65/pytorch-test'>PyTorch.</a><br></br>\
2021 год - Изучение библеотек/фреймворков: Numpy/Pandas/Scikit Learn/Matplotlib.<br></br>\
2021 год - Начало изучения языка Python, в частности Искуственного Интелекта.<br></br>\
</b>\
"

let app = new Vue({
    el: '#experience',
    data: {
      inner: exp,
    }
})