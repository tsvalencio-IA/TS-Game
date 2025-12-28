const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const timerEl = document.getElementById("timer");
const scoreEl = document.getElementById("score");
const finalScreen = document.getElementById("final");
const finalScore = document.getElementById("finalScore");

let width, height;
let lastFrame = null;
let score = 0;
let timeLeft = 30;
let playing = true;

navigator.mediaDevices.getUserMedia({
  video: { facingMode: "user" },
  audio: false
}).then(stream => {
  video.srcObject = stream;
});

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

function getMotionLevel(current, last) {
  let diff = 0;
  for (let i = 0; i < current.data.length; i += 4) {
    diff += Math.abs(current.data[i] - last.data[i]);
  }
  return diff / current.data.length;
}

function gameLoop() {
  if (!playing) return;

  ctx.drawImage(video, 0, 0, width, height);
  const frame = ctx.getImageData(0, 0, width, height);

  if (lastFrame) {
    const motion = getMotionLevel(frame, lastFrame);
    if (motion > 20) {
      score += Math.floor(motion / 10);
      scoreEl.textContent = score;
    }
  }

  lastFrame = frame;
  requestAnimationFrame(gameLoop);
}

function countdown() {
  const interval = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(interval);
      endGame();
    }
  }, 1000);
}

function endGame() {
  playing = false;
  finalScore.textContent = `Score: ${score}`;
  finalScreen.classList.remove("hidden");
}

function restart() {
  location.reload();
}

setTimeout(() => {
  gameLoop();
  countdown();
}, 1000);