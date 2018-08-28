const playBtn = document.querySelector("#play");
const timeLeft = document.querySelector(".current-timer");
const resetBtn = document.querySelector("#reset");
const sessionLengthNode = document.querySelector(".session");
const breakLengthNode = document.querySelector(".break");
const currentTimer = document.querySelector("#current-clock");

function pomodoroClock(sectionId) {
  const timerLengthNode = document.querySelector(
    `#${sectionId} .change-length .timer-length`
  );
  const plusBtn = document.querySelector(`#${sectionId} .change-length .plus`);
  const minusBtn = document.querySelector(
    `#${sectionId} .change-length .minus`
  );
  const PomoClock = {
    addOne: function() {
      console.log("entered addOne fn");
      let newLengthValue = parseFloat(timerLengthNode.innerHTML);
      console.log(typeof newLengthValue);
      if (newLengthValue >= 60) return;
      newLengthValue += 1;
      timerLengthNode.innerHTML = newLengthValue;
      if (sectionId === "session-length") {
        timeLeft.innerHTML = `${newLengthValue}:00`;
      }
    },
    minusOne: function() {
      let newLengthValue = parseFloat(timerLengthNode.innerHTML);
      console.log(typeof newLengthValue);
      if (newLengthValue <= 1) return;
      newLengthValue -= 1;
      timerLengthNode.innerHTML = newLengthValue;
      if (sectionId === "session-length") {
        timeLeft.innerHTML = `${newLengthValue}:00`;
      }
    },
    startTimer: function(seconds) {
      let sessionState = true;
      let totalSecondsLeft = seconds;
      let counter = 0;
      function getMinsSecs() {
        counter++;
        let mins = Math.floor(totalSecondsLeft / 60);
        let secs = Math.floor(totalSecondsLeft % 60);
        return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
      }
      function timerFn() {
        setTimeout(timerFn(), breakLengthNode.innerHTML * 60);
        totalSecondsLeft = seconds - counter;
        timeLeft.innerHTML = getMinsSecs();
        if (totalSecondsLeft < 1) {
          clearInterval(intervalFn);
          // if (sessionState) {
          //   sessionState = false;
          //   console.log(sessionState);
          //   currentTimer.innerHTML = "Break";
          //   PomoClock.startTimer(breakLengthNode.innerHTML * 60);
          // } else {
          //   sessionState = true;
          //   currentTimer.innerHTML = "session";
          //   PomoClock.startTimer(sessionLengthNode.innerHTML * 60);
          // }
          if ((currentTimer.innerHTML = "Session")) {
            console.log("reached break");
            currentTimer.innerHTML = "Break";
            PomoClock.startTimer(breakLengthNode.innerHTML * 60);
          } else if ((currentTimer.innerHTML = "Break")) {
            console.log("reached session");
            currentTimer.innerHTML = "Session";
            PomoClock.startTimer(sessionLengthNode.innerHTML * 60);
          }
        }
      }
      let intervalFn = setInterval(timerFn, 1000);
    },
    resetClock: function() {
      timeLeft.innerHTML = "25:00";
    }
  };
  plusBtn.addEventListener("click", () => PomoClock.addOne());
  minusBtn.addEventListener("click", () => PomoClock.minusOne());
  playBtn.addEventListener("click", () =>
    PomoClock.startTimer(sessionLengthNode.innerHTML * 60)
  );
  resetBtn.addEventListener("click", () => PomoClock.resetClock());

  return PomoClock;
}

const breakLengthSection = pomodoroClock("break-length");
const sessionLengthSection = pomodoroClock("session-length");
