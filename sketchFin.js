//fine pre state machine
let margin;

//variabili batteria
let rectWidth;
let rectHeight;
let innerBatteryMargins;
let totalHeight;
let batteryX;
let batteryY;
let img;

//variabili shake
let shakeStrength = 0;
let totalShake = 0;

//variabili immagine
let imgHeight;
let imgWidth;
let imgX;

let lampOffImg;
let lampOnImg;

let microOnImg;
let microOffImg;

let hairDryerOnImg;
let hairDryerOffImg;

let timer = 30;
let timerInterval;

let state = "start"; // Stato iniziale della macchina a stati
let score = 0;
let playButton, replayButton;
let finalAppliance = "lampadina";

function preload() {
  lampOffImg = loadImage("footage/lampOff.png");
  lampOnImg = loadImage("footage/lampOn.png");

  microOffImg = loadImage("footage/microOff.png");
  microOnImg = loadImage("footage/microOn.png");

  hairDryerOffImg = loadImage("footage/hairDryerOff.png");
  hairDryerOnImg = loadImage("footage/hairDryerOn.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  margin = windowWidth / 12;

  textFont("satoshi");

  // Inizializza il timer
  timerInterval = setInterval(() => {
    if (timer > 0) {
      timer--;
    } else {
      clearInterval(timerInterval);
    }
  }, 1000);

  //batteria
  rectWidth = windowWidth / 3;
  rectHeight = (windowHeight - 300) / 45; // Space for rectangles and margins
  innerBatteryMargins = rectHeight / 4; // margins between rectangles
  totalHeight = (rectHeight + innerBatteryMargins) * 40;
  batteryX = windowWidth - rectWidth - rectWidth / 12 - margin;
  batteryY = (windowHeight - totalHeight) / 2 + windowHeight / 12;

  //images
  imgHeight = totalHeight / 5;
  imgWidth = 700 * (imgHeight / 700);
  imgX = windowWidth / 20;

  // Crea i pulsanti
  playButton = createButton("Gioca");
  playButton.position(windowWidth / 2 - playButton.width / 2, windowHeight - margin * 3);
  playButton.mousePressed(startGame);

  replayButton = createButton("Rigioca");
  replayButton.position(windowWidth / 2 - replayButton.width / 2, windowHeight - margin * 3);
  replayButton.mousePressed(restartGame);
  replayButton.hide();
}

function draw() {
  background("#331005"); // Set background to brown

  if (state === "start") {
    drawStartScreen();
  } else if (state === "game") {
    drawGameScreen();
  } else if (state === "end") {
    drawEndScreen();
  }
}

function drawStartScreen() {
  textAlign(LEFT, TOP);
  textSize(24);
  fill("#FFFCF7");
  text("Scuoti il telefono per generare energia.hai 30 secondi per generare più energia possibile, scopri quale di questi elettrodomestici saresti in grado di accendere", margin, margin, windowWidth - margin);
  drawImage(lampOnImg, margin, windowHeight / 2);
  drawImage(microOnImg, windowWidth / 2 - (microOnImg.width * (imgHeight / microOnImg.height)) / 2, windowHeight / 2);
  drawImage(hairDryerOnImg, windowWidth - margin - hairDryerOnImg.width * (imgHeight / hairDryerOnImg.height), windowHeight / 2);
  //drawImage(microOnImg, batteryY + totalHeight - imgHeight * 2 - margin);
  //drawImage(hairDryerOnImg, batteryY + totalHeight - imgHeight * 3 - margin * 2);
  playButton.show();
  replayButton.hide();
}

function drawGameScreen() {
  // Disegna il timer
  textAlign(CENTER, TOP);
  textSize(60);
  fill("#FFFCF7");
  text(timer, windowWidth / 2, margin);

  if (frameCount % 4 == 0) {
    totalShake = totalShake + shakeStrength;
    shakeStrength = 0;
  }
  drawBattery();
  fillBattery(Math.round(map(totalShake, 0, 50000, 0, 40, true)));
  image(totalShake < 10000 ? lampOffImg : lampOnImg, imgX, batteryY + totalHeight - imgHeight, imgWidth, imgHeight);
  image(totalShake < 30000 ? microOffImg : microOnImg, imgX, batteryY + totalHeight - imgHeight * 2 - margin, imgWidth, imgHeight);
  image(totalShake < 50000 ? hairDryerOffImg : hairDryerOnImg, imgX, batteryY + totalHeight - imgHeight * 3 - margin * 2, imgWidth, imgHeight);

  if (timer <= 0) {
    state = "end";
    score = math.round(map(totalShake, 0, 50000, 0, 100)); //da sostituire con i kw effettivi
    playButton.hide();
    replayButton.show();
    clearInterval(timerInterval); // Ferma il timer quando il gioco finisce
  }
}

function drawEndScreen() {
  textAlign(LEFT, TOP);
  textSize(24);
  fill("#FFFCF7");
  text(`Tempo scaduto!\nIn 30 secondi hai generato ${score}kW. abbastanza per accendere un piccolo nano da giardino `, windowWidth / 2, windowHeight / 2 - 50);
  //text(`Tempo scaduto!\nIl tuo punteggio è: ${score}kW\nPremi 'Rigioca' per riprovare.`, windowWidth / 2, windowHeight / 2 - 50);
  playButton.hide();
  replayButton.show();
}

function startGame() {
  state = "game";
  timer = 30;
  totalShake = 0;
  playButton.hide();
  replayButton.hide();
  clearInterval(timerInterval); // Assicurati che non ci siano timer attivi
  timerInterval = setInterval(() => {
    if (timer > 0) {
      timer--;
    } else {
      clearInterval(timerInterval);
    }
  }, 1000);
}

function restartGame() {
  state = "start";
  timer = 30;
  totalShake = 0;
  score = 0;
  playButton.show();
  replayButton.hide();
  clearInterval(timerInterval); // Ferma il timer quando si torna allo stato iniziale
}

function drawBattery() {
  noFill();
  strokeWeight(3);
  stroke("#FFFCF7");

  // Draw battery
  rect(batteryX - rectWidth / 12, batteryY - rectWidth / 12, rectWidth + rectWidth / 6, totalHeight + rectWidth / 6, 15);

  noStroke();
  fill("#804600"); // Brown rectangles
  for (let i = 0; i < 40; i++) {
    let rectY = batteryY + i * (rectHeight + innerBatteryMargins);
    rect(batteryX, rectY, rectWidth, rectHeight, 10);
  }
  // Draw white rectangle on top
  fill("#FFFCF7");
  rect(batteryX + rectWidth / 3, batteryY - 30, rectWidth / 3, 20, 5);
  //punteggio sotto la batteria
  textAlign(CENTER, CENTER);
  textSize(20);
  fill("#FFFCF7");
  text(`${totalShake}kW`, batteryX + rectWidth / 2, batteryY + totalHeight + totalHeight / 12);
}

function fillBattery(filledBattery = 0) {
  //yellow rectangles
  fill("#FFD12E"); // Brown rectangles
  for (let i = 0; i < filledBattery; i++) {
    let rectY = batteryY - i * (rectHeight + innerBatteryMargins) + 39 * (rectHeight + innerBatteryMargins);
    rect(batteryX, rectY, rectWidth, rectHeight, 10);
  }
}

//calculate shake strength
function deviceShaken() {
  // Calculate shake strength using the magnitude of the acceleration
  shakeStrength = sqrt(sq(accelerationX) + sq(accelerationY) + sq(accelerationZ));
}

// Request permission for device orientation
function touchEnded() {
  if (DeviceOrientationEvent && DeviceOrientationEvent.requestPermission) {
    DeviceOrientationEvent.requestPermission();
  }
}

function drawImage(img, imgX = windowWidth / 12, imgY = 0) {
  let imgHeight = totalHeight / 5;
  let imgWidth = img.width * (imgHeight / img.height);

  //let imgY = batteryY + totalHeight - imgHeight;

  image(img, imgX, imgY, imgWidth, imgHeight);
}
