let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;

const display = document.getElementById("display");
const startStopBtn = document.getElementById("startStop");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("lap");
const laps = document.getElementById("laps");
const themeSwitch = document.getElementById("themeSwitch");
const themeLabel = document.getElementById("themeLabel");

function formatTime(ms) {
  const totalMilliseconds = ms % 1000;
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${pad(hours)}-${pad(minutes)}-${pad(seconds)}-${padMilliseconds(totalMilliseconds)}`;
}

function pad(num) {
  return num.toString().padStart(2, "0");
}

function padMilliseconds(ms) {
  return ms.toString().padStart(3, "0");
}

function updateDisplay() {
  const currentTime = Date.now();
  const diff = currentTime - startTime + elapsedTime;
  display.textContent = formatTime(diff);
}

startStopBtn.addEventListener("click", () => {
  if (!isRunning) {
    isRunning = true;
    startTime = Date.now();
    timer = setInterval(updateDisplay, 10); // update every 10ms
    startStopBtn.innerHTML = '<i class="fas fa-pause"></i> Pause';
  } else {
    isRunning = false;
    elapsedTime += Date.now() - startTime;
    clearInterval(timer);
    startStopBtn.innerHTML = '<i class="fas fa-play"></i> Start';
  }
});

resetBtn.addEventListener("click", () => {
  clearInterval(timer);
  isRunning = false;
  startTime = null;
  elapsedTime = 0;
  display.textContent = "00-00-00-000";
  startStopBtn.innerHTML = '<i class="fas fa-play"></i> Start';
  laps.innerHTML = "";
});

lapBtn.addEventListener("click", () => {
  if (isRunning) {
    const lapTime = display.textContent;
    const lapItem = document.createElement("li");
    lapItem.textContent = `Lap ${laps.children.length + 1}: ${lapTime}`;
    laps.appendChild(lapItem);
  }
});

// Theme toggle
themeSwitch.addEventListener("change", () => {
  document.body.classList.toggle("dark");
  themeLabel.textContent = document.body.classList.contains("dark") ? "Light Mode" : "Dark Mode";
});
