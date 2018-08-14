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
      newLengthValue += 1;
      timerLengthNode.innerHTML = newLengthValue;
    },
    minusOne: function() {
      let newLengthValue = parseFloat(timerLengthNode.innerHTML);
      console.log(typeof newLengthValue);
      newLengthValue -= 1;
      timerLengthNode.innerHTML = newLengthValue;
    }
  };
  plusBtn.addEventListener("click", () => PomoClock.addOne());
  minusBtn.addEventListener("click", () => PomoClock.minusOne());

  return PomoClock;
}

const breakLengthSection = pomodoroClock("break-length");
const sessionLengthSection = pomodoroClock("session-length");
