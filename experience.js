let exp = [
  "<b>",
  "Hellofdbndlfknbdlkfnlkbndflknbdlfkbndlfkbndflkn",
  "HelloHellofdbndlfknbdlkfnlkbndflknbdlfkbndlfkbndflkn",
  "Hellofdbndlfknbdlkfnlkbndflknbdlfkbndlfkbndflkn",
  "HelloHellofdbndlfknbdlkfnlkbndflknbdlfkbndlfkbndflkn",
  "</b>",
]

let app = new Vue({
    el: '#experience',
    data: {
      inner: exp.join("<br></br>"),
    }
})