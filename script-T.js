const timeDisplay = document.querySelector("#timeDisplay");
const startBtn = document.querySelector("#startBtn");
const pauseBtn = document.querySelector("#pauseBtn");
const resetBtn = document.querySelector("#resetBtn");

let startTime = 0;
let elapsedTime = 0;
let currentTime = 0;
let paused = true;
let intervalId; // Timer ID to control the timer interval.
let hrs = 0;
let mins = 0;
let secs = 0;


// When the start button is clicked, it starts the timer
startBtn.addEventListener("click", () => {
    if (paused) {
        paused = false;
        startTime = Date.now() - elapsedTime;
        intervalId = setInterval(updateTime,1000); //  setInterval function and continuously updates the displayed time
    }
});

pauseBtn.addEventListener("click", () => {
    if (!paused) {
        paused = true;
        elapsedTime = Date.now() - startTime;
        clearInterval(intervalId); // clears the interval using clearInterval() by passing the interval id 
    }
});

// the reset button clears the time and resets all relevant variables
resetBtn.addEventListener("click", () => {
    paused = true;
    clearInterval(intervalId);
    elapsedTime = 0;
    startTime = 0;
    currentTime = 0;
    hrs = 0;
    mins = 0;
    secs = 0;
    timeDisplay.textContent = "00:00:00";
});

// updateTime function calculates the elapsed time
function updateTime() {
    elapsedTime = Date.now() - startTime; // difference between the current time and the start time

    // Calculate hours/minutes/seconds
    hrs = Math.floor((elapsedTime / (1000 * 60 * 60)) % 24);
    mins = Math.floor((elapsedTime / (1000 * 60)) % 60);
    secs = Math.floor((elapsedTime / 1000) % 60);

    // 1000(milisecond) * 60(second) * 60(minute)

    // pad function adds leading zeros to single-digit hour/minute/second values for time display
    hrs = pad(hrs);
    mins = pad(mins);
    secs = pad(secs);

    timeDisplay.textContent = `${hrs}:${mins}:${secs}`;

    // these variables to ensure they are always at least two characters long
    function pad(unit) {
        return (("0") + unit).length > 2 ? unit : "0" + unit;
    }

    // document.getElementById('timeDisplay').value = '';
}