class Timer {
  constructor(timeInput, startButton, stopButton, callbacks) {
    if (callbacks) {
      this.onTick = callbacks.onTick;
      this.onStart = callbacks.onStart;
      this.onFinish = callbacks.onFinish;
    }
    this.timeInput = timeInput;
    this.startButton = startButton;
    this.stopButton = stopButton;
    this.circle = circle;
    this.timeLeft = 10;
    this.startButton.addEventListener("click", this.start);
    this.stopButton.addEventListener("click", this.stop);
    this.timeInput.addEventListener("click", this.changeTime);
    this.timeInput.value = this.timeLeft;
  }
  get timeRemaining() {
    return parseFloat(this.timeInput.value);
  }
  set timeRemaining(time) {
    this.timeInput.value = time.toFixed(2);
  }
  start = () => {
    if (this.onStart) {
      this.onStart(this.timeRemaining);
    }
    this.tick();
    this.timer = setInterval(this.tick, 50);
  };
  tick = () => {
    if (this.timeRemaining <= 0) {
      this.onFinish();
    } else {
      this.timeRemaining = this.timeRemaining - 0.05;
      if (this.onTick) {
        this.onTick(this.timeRemaining);
      }
    }
  };
  stop = () => {
    console.log("we are at stop");
    clearInterval(this.timer);
  };

  changeTime = () => {
    clearInterval(this.timer, this.onFinish);
    this.start;
  };
}
const timeInput = document.querySelector(".duration");
const startButton = document.querySelector(".play");
const stopButton = document.querySelector(".stop");
const circle = document.querySelector("circle");

const perimeter = circle.getAttribute("r") * 2 * Math.PI;
circle.setAttribute("stroke-dasharray", perimeter);

let duration;
const timer = new Timer(timeInput, startButton, stopButton, {
  onStart(totalDuration) {
    duration = totalDuration;
  },
  onTick(timeRemaining) {
    circle.setAttribute(
      "stroke-dashoffset",
      (perimeter * timeRemaining) / duration - perimeter
    );
  },
  onFinish() {
    return circle.setAttribute("stroke-dasharray", this.perimeter);
    this.start();
  }
});
