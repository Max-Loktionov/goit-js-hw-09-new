

const refs = {
    body: document.querySelector('body'),
    btnStart: document.querySelector('[data-start]'),
    btnStop: document.querySelector('[data-stop]')
}
let timerId = null;

refs.btnStart.addEventListener('click', onBtnStartClick)
refs.btnStop.addEventListener('click', onBtnStopClick)


 function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
 }

function generateIntervalColor() {
    timerId = setInterval(() => {
        refs.body.style.backgroundColor = getRandomHexColor()
    }, 1000);   
 }
 
 function onBtnStartClick() {
    refs.btnStart.disabled = true;
    refs.btnStop.disabled = false;
   generateIntervalColor();
}

function onBtnStopClick() {
    clearInterval(timerId);
    refs.btnStart.disabled = false;
    refs.btnStop.disabled = true;
    
}



