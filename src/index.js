const playBtn = document.querySelector("#play");
const timeLeft = document.querySelector(".current-timer");
const resetBtn = document.querySelector("#reset");
const sessionLengthValue = document.querySelector(".session");
const breakLengthValue = document.querySelector(".break");

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
      console.log(seconds);
      let totalSecondsLeft = seconds;
      let counter = 0;
      function getMinsSecs() {
        counter++;
        let mins = Math.floor(totalSecondsLeft / 60);
        let secs = Math.floor(totalSecondsLeft % 60);
        return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
      }
      function timerFn() {
        totalSecondsLeft = seconds - counter;
        timeLeft.innerHTML = getMinsSecs();
        if (totalSecondsLeft < 1) {
          clearInterval(intervalFn);
          PomoClock.startTimer(breakLengthValue.innerHTML * 60);
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
    PomoClock.startTimer(sessionLengthValue.innerHTML * 60)
  );
  resetBtn.addEventListener("click", () => PomoClock.resetClock());

  return PomoClock;
}

const breakLengthSection = pomodoroClock("break-length");
const sessionLengthSection = pomodoroClock("session-length");
