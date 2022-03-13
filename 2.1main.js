'use strict';
{
  
let time = document.getElementById('count');
let start = document.getElementById('start');
let stop = document.getElementById('stop');
let reset = document.getElementById('reset');

//経過時間のms
let elapsed = 0;

//STOP
let intervalID = null;

function updateTime() {
  const ms = Math.floor(elapsed % 1000 / 100);
  const second = Math.floor(elapsed / 1000) % 60;
  const minute = Math.floor(elapsed / (1000*60)) % 60;
  const hour = Math.floor(elapsed / (1000*60*60));
  
  time.textContent = `${hour}:${minute}:${second}:${ms}`; 
}


//フラット状態
function initial() {
  start.classList.remove('inactive');
  stop.classList.add('inactive');
  reset.classList.add('inactive');
}

//タイマー動作中
function counting() {
  start.classList.add('inactive');
  stop.classList.remove('inactive');
  reset.classList.remove('inactive');
}

//停止中
function stopped() {
  start.classList.remove('inactive');
  stop.classList.add('inactive');
  reset.classList.remove('inactive');
}

initial();

start.addEventListener('click', function(e) {
  counting();
  if (intervalID !== null) { return; }
  let present = new Date();
  intervalID = setInterval(function() {
    const now = new Date();
    elapsed += now - present;
    present = now;
    updateTime();
},1);
});

stop.addEventListener('click', function(e) {
  stopped();
  clearInterval(intervalID);
  intervalID = null;
});

reset.addEventListener('click', function(e) {
  
  elapsed = 0;
  updateTime();
});

}