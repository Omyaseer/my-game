//                                                        بسم الله الرحمن الرحيم

//   selectors

const play = document.querySelector(".play");
const count = document.querySelector("span");
const high = document.querySelector(".span1");
const tim = document.querySelector(".tim");
const h = document.querySelector(".h");
const m = document.querySelector(".m");
const s = document.querySelector(".s");
const btn = document.querySelector("button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".btn");

let starttime;

// score

let score = 0;
let highscore = 0;
highscore = localStorage.getItem("highscore");
high.textContent = highscore;

// time

let time = 0;

let sec = 0;
let min = 0;
let hou = 0;
let besttime = Infinity;
let timerId = null;

let savedTime = 0;
savedTime = localStorage.getItem("time");
if (savedTime) {
  time = savedTime;

  sec = Math.floor(time % 60);
  min = Math.floor((time / 60) % 60);
  hou = Math.floor(time / 3600);

  h.innerHTML = hou.toString().padStart(2, "0");
  m.innerHTML = min.toString().padStart(2, "0");
  s.innerHTML = sec.toString().padStart(2, "0");
}

// verify if clicked or not
let clicked = 0;
let removeTimeoutId = null;

// change colour

//  first

// function changecol() {
//   const colours = "0123456789abcdef";
//   let color = "#";

//   for (let i = 0; i < 6; i++) {
//     color += colours.charAt(Math.floor(Math.random() * 15));
//   }

//   if (color === "#1e90ff") {
//     changecol();
//   } else {
//     return color;
//   }
// }

// update and used gpt to do this colors
function changecol() {
  const colors = [
    "#ffffff",
    "#f1f1f1",
    "#ffeb3b",
    "#ffc107",
    "#f48fb1",
    "#ff80ab",
    "#00e676",
    "#69f0ae",
    "#00bcd4",
    "#40c4ff",
    "#ba68c8",
    "#9575cd",
    "#ff7043",
    "#ff8a65",
    "#cfd8dc",
    "#b2ebf2",
    "#b3e5fc",
    "#d1c4e9",
    "#ffe082",
    "#aed581",
  ];

  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

//  display
const display = () => {
  // position
  let topv = Math.random() * 500;
  let leftv = Math.random() * 1050;

  // play color and position
  play.style.top = `${topv}px`;
  play.style.left = `${leftv}px`;
  play.style.backgroundColor = changecol();
  play.style.display = "block";

  starttime = Date.now();

  clicked = 0;

  //  remove the circle when time ende

  let timeremove;
  
  timeremove = Math.floor(Math.random() * 2000) + 800;
  removeTimeoutId = setTimeout(() => {
    if (clicked === 0) {
      play.style.display = "none";

      modal.style.display = "block";
    }
  }, timeremove);
};

// timer duration
function timer() {
  let starttime = Date.now();

  if (timerId) {
    clearInterval(timerId);
  }

  timerId = setInterval(() => {
    const changetime = (Date.now() - starttime) / 1000;
    starttime = Date.now();
    time += changetime;

    sec = Math.floor(time % 60);
    min = Math.floor((time / 60) % 60);
    hou = Math.floor(time / 3600);

    // save time
    localStorage.setItem("time", time.toString());

    localStorage.setItem("sec", sec);
    localStorage.setItem("min", min);
    localStorage.setItem("hou", hou);

    h.innerHTML = hou.toString().padStart(2, "0");
    m.innerHTML = min.toString().padStart(2, "0");
    s.innerHTML = sec.toString().padStart(2, "0");
  }, 1000);
}

// show circle
const show = () => {
  //  display
  setTimeout(display, Math.random() * 2000);

  // show points
  count.innerHTML = score;
};

// duration play what happen
const click = () => {
  // block the clocked
  clearTimeout(removeTimeoutId);

  play.style.display = "none";

  // score change
  score++;
  highscore = Math.max(score, highscore);
  localStorage.setItem("highscore", highscore);
  count.innerHTML = score;

  // change time
  const changetime = (Date.now() - starttime) / 1000;
  besttime = Math.min(changetime, besttime);
  tim.innerHTML = `${besttime.toFixed(1)} s`;

  // clicked
  clicked = 1;

  // show circle again
  show();
};

// reset automatic after one week
const reset = () => {
  localStorage.removeItem("highscore");
  localStorage.setItem("sec", sec);
  localStorage.setItem("min", min);
  localStorage.setItem("hou", hou);
};

// reset the storage
setInterval(() => reset(), 604800000);

//  events
play.addEventListener("click", click);
btn.addEventListener("click", show);

// btn.addEventListener("click", timer);
btn.addEventListener("click", () => {
  // rescore again
  score = 0;
  count.innerHTML = score;

  //best time
  tim.innerHTML = "0" + " s";

  // reset time
  time = 0;
  sec = 0;
  min = 0;
  hou = 0;

  h.innerHTML = "00";
  m.innerHTML = "00";
  s.innerHTML = "00";

  timer();
});

// close alert and restart the game
close.addEventListener("click", () => {
  // close modal
  modal.style.display = "none";

  // rescore again high score
  highscore = localStorage.getItem("highscore");
  high.textContent = highscore;

  // rescore
  score = 0;
  count.innerHTML = score;

  //best time
  tim.innerHTML = "0" + " s";

  // reset time
  time = 0;
  sec = 0;
  min = 0;
  hou = 0;

  h.innerHTML = "00";
  m.innerHTML = "00";
  s.innerHTML = "00";

  // restart
  timer();

  //re show
  show();
});
