let timer;
let elapsedTime = 0;
let running = false;

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const clearButton = document.getElementById('clear');
const lapHistory = document.getElementById('lap-history');

function updateDisplay() {
    const hours = Math.floor(elapsedTime / 3600000).toString().padStart(2, '0');
    const minutes = Math.floor((elapsedTime % 3600000) / 60000).toString().padStart(2, '0');
    const seconds = Math.floor((elapsedTime % 60000) / 1000).toString().padStart(2, '0');
    const milliseconds = (elapsedTime % 1000).toString().padStart(3, '0');
    display.textContent = `${hours}:${minutes}:${seconds}:${milliseconds}`;
}

function start() {
    if (!running) {
        running = true;
        const startTime = Date.now() - elapsedTime;
        timer = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 1);
    }
}

function stop() {
    if (running) {
        running = false;
        clearInterval(timer);
    }
}

function reset() {
    stop();
    elapsedTime = 0;
    updateDisplay();
    lapHistory.innerHTML = '';  // Clear lap history when reset
}

function lap() {
    if (running) {
        const lapTime = display.textContent;
        const lapEntry = document.createElement('div');
        lapEntry.textContent = lapTime;
        lapHistory.appendChild(lapEntry);
    }
}

function clear() {
    lapHistory.innerHTML = '';
}

startButton.addEventListener('click', start);
stopButton.addEventListener('click', stop);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);
clearButton.addEventListener('click', clear);

updateDisplay();