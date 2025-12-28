let video;
let canvas;
let ctx;

let mode = null;
let gameRunning = false;
let score = 0;
let playerX = 180;
let lastX = null;
let fitnessCount = 0;
let lastBrightness = null;

function startMode(selectedMode) {
  mode = selectedMode;

  video = document.getElementById("camera");
  canvas = document.getElementById("gameCanvas");
  ctx = canvas.getContext("2d");

  video.style.display = "block";
  canvas.style.display = "block";

  navigator.mediaDevices.getUserMedia({
    video: { facingMode: "user" },
    audio: false
  }).then(stream => {
    video.srcObject = stream;
    video.onloadedmetadata = () => {
      gameRunning = true;
      requestAnimationFrame(gameLoop);
    };
  });
}

function gameLoop() {
  if (!gameRunning) return;

  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = "#111";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  if (mode === "race") raceMode();
  if (mode === "fitness") fitnessMode();
  if (mode === "party") partyMode();

  requestAnimationFrame(gameLoop);
}

function analyzeFrame() {
  const temp = document.createElement("canvas");
  temp.width = video.videoWidth;
  temp.height = video.videoHeight;
  const tctx = temp.getContext("2d");
  tctx.drawImage(video,0,0);

  const data = tctx.getImageData(0,0,temp.width,temp.height).data;
  let sumX = 0;
  let count = 0;
  let brightness = 0;

  for (let i=0;i<data.length;i+=4*80) {
    const b = data[i]+data[i+1]+data[i+2];
    brightness += b;
    if (b > 500) {
      sumX += (i/4)%temp.width;
      count++;
    }
  }

  return {
    x: count ? (sumX/count)/temp.width*canvas.width : null,
    brightness: brightness
  };
}

/* ===== MODOS ===== */

function raceMode() {
  const frame = analyzeFrame();
  if (frame.x !== null && lastX !== null) {
    playerX += (frame.x - lastX)*0.3;
  }
  lastX = frame.x;

  if (playerX < 20) playerX = 20;
  if (playerX > canvas.width-20) playerX = canvas.width-20;

  ctx.fillStyle="#00ffcc";
  ctx.beginPath();
  ctx.arc(playerX,540,20,0,Math.PI*2);
  ctx.fill();

  score++;
  ctx.fillStyle="#fff";
  ctx.fillText("Distância: "+score,20,40);
}

function fitnessMode() {
  const frame = analyzeFrame();
  if (lastBrightness !== null) {
    if (frame.brightness < lastBrightness-2000) {
      fitnessCount++;
    }
  }
  lastBrightness = frame.brightness;

  ctx.fillStyle="#ffcc00";
  ctx.font="30px Arial";
  ctx.fillText("Agachamentos",60,200);
  ctx.fillText(fitnessCount,160,260);
}

function partyMode() {
  const frame = analyzeFrame();
  if (frame.x !== null && lastX !== null) {
    score += Math.abs(frame.x-lastX)>15 ? 1 : 0;
  }
  lastX = frame.x;

  ctx.fillStyle="#ff00ff";
  ctx.font="28px Arial";
  ctx.fillText("Mexa-se!",110,200);
  ctx.fillText("Pontos: "+score,100,260);
}