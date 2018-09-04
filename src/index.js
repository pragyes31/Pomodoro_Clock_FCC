let shouldLog = false;
function log(...args) {
  if (shouldLog) {
    console.log(...args);
  }
}

function pomodoroClockFn() {
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
  const pomodoroClock = {
    getTimerLength: function(timerType) {
      return parseFloat(
        document.querySelector(`#${timerType} .timer-length`).innerHTML
      );
    },
    addOne: function(btnId) {
      const timerType = btnId === "break-plus" ? "break" : "session";
      const timerLengthNode = document.querySelector(
        `#${timerType} .timer-length`
      );
      if (pomodoroClock.getTimerLength(timerType) >= 60) return;
      timerLengthNode.innerHTML = pomodoroClock.getTimerLength(timerType) + 1;
    },
    subtractOne: function(btnId) {
      console.log(btnId);
      const timerType = btnId === "break-minus" ? "break" : "session";
      const timerLengthNode = document.querySelector(
        `#${timerType} .timer-length`
      );
      if (pomodoroClock.getTimerLength(timerType) <= 1) return;
      timerLengthNode.innerHTML = pomodoroClock.getTimerLength(timerType) - 1;
    },
    timerLength: function(lengthNode) {
      return parseFloat(lengthNode.innerHTML);
    },
    timerFn: function(seconds) {
      let totalSecondsLeft = seconds;
      let counter = 0;
      let mins = Math.floor(totalSecondsLeft / 60); //Math.floor(totalSecondsLeft / 60);
      let secs = Math.floor(totalSecondsLeft % 60);
      let getTime = `${mins}:${secs < 10 ? "0" : ""}${secs}`;
      counter++;
      totalSecondsLeft = seconds - counter;
      console.log("reached this point");
      timeLeft.innerHTML = getTime;
      if (totalSecondsLeft < 1) {
        clearInterval(intervalFn);
      }
    },
    startClock: function(seconds) {
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
      let intervalFn = setInterval(pomodoroClock.timerFn(seconds), 1000);
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
    pomodoroClock.startClock(parseFloat(sessionLengthValueNode.innerHTML) * 60)
  );
  return pomodoroClock;
}

const pomodoroClock = pomodoroClockFn();
