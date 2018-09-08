let shouldLog = false;
function log(...args) {
  if (shouldLog) {
    console.log(...args);
  }
}

function createPomodoroClock() {
  const minusBtns = document.querySelectorAll(".minus");
  const plusBtns = document.querySelectorAll(".plus");
  const playBtn = document.querySelector("#play");
  const sessionLengthValueNode = document.querySelector(
    "#session-length .timer-length"
  );
  const breakLengthValueNode = document.querySelector(
    "#break-length .timer-length"
  );
  const timeLeft = document.querySelector(".current-clock");
  const currentClockHeading = document.querySelector("#current-clock-heading");
  console.log(currentClockHeading.innerHTML);
  const pomodoroClock = {
    getTimerLength: function(timerType) {
      return parseFloat(
        document.querySelector(`#${timerType} .timer-length`).innerHTML
      );
    },
    addOne: function(signBtnId) {
      const timerType = signBtnId === "break-plus" ? "Break" : "Session";
      const timerLengthNode = document.querySelector(
        `#${timerType} .timer-length`
      );
      if (pomodoroClock.getTimerLength(timerType) >= 60) return;
      timerLengthNode.innerHTML = pomodoroClock.getTimerLength(timerType) + 1;
    },
    subtractOne: function(signBtnId) {
      console.log(signBtnId);
      const timerType = signBtnId === "break-minus" ? "Break" : "Session";
      const timerLengthNode = document.querySelector(
        `#${timerType} .timer-length`
      );
      if (pomodoroClock.getTimerLength(timerType) <= 1) return;
      timerLengthNode.innerHTML = pomodoroClock.getTimerLength(timerType) - 1;
    },
    timerLength: function(lengthNode) {
      return parseFloat(lengthNode.innerHTML);
    },
    getMinsSecs: function(totalSecondsLeft) {
      let mins = Math.floor(totalSecondsLeft / 60);
      let secs = Math.floor(totalSecondsLeft % 60);
      return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
    },
    counter: 0,
    clockInterval: "",
    startClock: function(timerType) {
      let clockInterval = setInterval(
        pomodoroClock.timer(currentClockHeading.innerHTML),
        1000
      );
    },

    // startClock: {
    //   // clockInterval: setInterval(
    //   //   pomodoroClock.timer(currentClockHeading.innerHTML),
    //   //   1000
    //   // )
    //  },
    timer: function(timerType) {
      console.log("sdf", pomodoroClock.counter);
      let seconds = pomodoroClock.getTimerLength(timerType) * 60;
      let totalSecondsLeft = seconds - pomodoroClock.counter;
      console.log(totalSecondsLeft);
      pomodoroClock.counter++;
      timeLeft.innerHTML = pomodoroClock.getMinsSecs(totalSecondsLeft);
      if (totalSecondsLeft < 1) {
        console.log("clearInterval");
        clearInterval(pomodoroClock.clockInterval);
      }
    }
  };
  plusBtns.forEach(plusBtn =>
    plusBtn.addEventListener("click", e => pomodoroClock.addOne(e.target.id))
  );
  minusBtns.forEach(minusBtn =>
    minusBtn.addEventListener("click", e =>
      pomodoroClock.subtractOne(e.target.id)
    )
  );
  playBtn.addEventListener("click", () =>
    pomodoroClock.startClock(currentClockHeading.innerHTML)
  );
  return pomodoroClock;
}

const pomodoroClock = createPomodoroClock();

// let nextClock =
//   currentClockHeading.innerHTML === "Session"
//     ? setTimeout(
//         pomodoroClock.startClock(
//           pomodoroClock.timerLength(breakLengthValueNode) * 60
//         ),
//         pomodoroClock.timerLength(breakLengthValueNode) * 1000
//       )
//     : setTimeout(
//         pomodoroClock.startClock(
//           pomodoroClock.timerLength(sessionLengthValueNode) * 60
//         ),
//         pomodoroClock.timerLength(sessionLengthValueNode) * 1000
//       );
//nextClock();
