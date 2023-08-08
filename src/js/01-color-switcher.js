const startBtn = document.querySelector('[data-start]');
let intervalId;

startBtn.addEventListener('click', startColorSwitcher);
document.querySelector('[data-stop]').addEventListener('click', stopColorSwitcher);


function getRandomHexColor() {
  document.body.style.backgroundColor = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}

function startColorSwitcher() {
  startBtn.disabled = true;
  intervalId = setInterval(getRandomHexColor, 1000);
}

function stopColorSwitcher() {
  startBtn.disabled = false;
  clearInterval(intervalId);
}