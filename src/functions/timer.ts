export const timer = (): void => {
const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;

const COLOR_CODES = {
  info: {
    color: "green"
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD
  }
};

const TIME_LIMIT = 59;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval: NodeJS.Timeout;
let remainingPathColor = COLOR_CODES.info.color;

const timer = document.getElementById("timer") as HTMLElement;
if(timer){
  timer.innerHTML = `
  <div class="base-timer">
    <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <g class="base-timer__circle">
        <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
        <path
          id="base-timer-path-remaining"
          stroke-dasharray="283"
          class="base-timer__path-remaining ${remainingPathColor}"
          d="
            M 50, 50
            m -45, 0
            a 45,45 0 1,0 90,0
            a 45,45 0 1,0 -90,0
          "
        ></path>
      </g>
    </svg>
    <span id="base-timer-label" class="base-timer__label">${formatTime(
      timeLeft
    )}</span>
  </div>
  `;
startTimer();
}




function onTimesUp() {
  clearInterval(timerInterval);
}

function startTimer() {
  timerInterval = setInterval(() => {
    timePassed = timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;
    const label = document.getElementById("base-timer-label") as HTMLElement;
    label.innerHTML = formatTime(
      timeLeft
    );
    setCircleDasharray();
    setRemainingPathColor(timeLeft);

    if (timeLeft === 0) {
      onTimesUp();
    }
  }, 1000);
}

function formatTime(time: number) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = Number(`0${seconds}`);
  }

  return `${minutes}:${seconds}`;
}

function setRemainingPathColor(timeLeft: number) {
  const { alert, warning, info } = COLOR_CODES;
  if (timeLeft <= alert.threshold) {
    const baseTimerPathRemaining =  document.getElementById("base-timer-path-remaining") as HTMLElement;
    baseTimerPathRemaining.classList.remove(warning.color);
    baseTimerPathRemaining.classList.add(alert.color);
  } else if (timeLeft <= warning.threshold) {
    const baseTimerPathRemaining =  document.getElementById("base-timer-path-remaining") as HTMLElement;
    baseTimerPathRemaining.classList.remove(info.color);
    baseTimerPathRemaining.classList.add(warning.color);
  }
}

function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  const baseTimerPathRemaining =  document.getElementById("base-timer-path-remaining") as HTMLElement;
  baseTimerPathRemaining.setAttribute("stroke-dasharray", circleDasharray);
}
}