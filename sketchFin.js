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

let lampOffImg;
let lampOnImg;

let microOnImg;
let microOffImg;

let hairDryerOnImg;
let hairDryerOffImg;

let timer = 20;
let timerInterval;

let state = "start"; // Stato iniziale della macchina a stati
let score = 0;
let playButton, replayButton;
let finalAppliance = "lampadina";
let logoImg;

function preload() {
  logoImg = loadImage("footage/logo_wattAbout.png");
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
  rectHeight = (windowHeight - 300) / 50; // Space for rectangles and margins
  innerBatteryMargins = rectHeight / 4; // margins between rectangles
  totalHeight = (rectHeight + innerBatteryMargins) * 40;
  batteryX = windowWidth - rectWidth - rectWidth / 12 - margin;
  batteryY = (windowHeight - totalHeight) / 2 + margin * 2;

  //immagini
  imgHeight = totalHeight / 5;

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
  let margin = 20;
  let logoHeight = (logoImg.height * (windowWidth / 5)) / logoImg.width;
  image(logoImg, windowWidth / 2 - windowWidth / 10, margin, windowWidth / 5, logoHeight);

  textAlign(LEFT, TOP);
  textSize(24);
  fill("#FFFCF7");
  text("Scuoti il telefono per generare energia. Hai 30 secondi per generare più energia possibile, scopri quale di questi elettrodomestici saresti in grado di accendere", margin, logoHeight + 2 * margin, windowWidth - margin);
  drawImage(lampOnImg, 0, windowHeight / 2);
  drawImage(microOnImg, 1, windowHeight / 2);
  drawImage(hairDryerOnImg, 2, windowHeight / 2);
  playButton.show();
  replayButton.hide();
}

function drawGameScreen() {
  let margin = 20;
  let logoHeight = (logoImg.height * (windowWidth / 5)) / logoImg.width;
  image(logoImg, windowWidth / 2 - windowWidth / 10, margin, windowWidth / 5, logoHeight);

  textAlign(CENTER, TOP);
  textSize(60);
  fill("#FFFCF7");
  text(timer, windowWidth / 2, logoHeight + 2 * margin);

  if (frameCount % 4 == 0) {
    totalShake = totalShake + shakeStrength;
    shakeStrength = 0;
    score = Math.round(map(totalShake, 0, 50000, 0, 100)); //da sostituire con i kw effettivi
  }
  drawBattery(logoHeight + 3 * margin + 60); // Passa la posizione Y della batteria
  fillBattery(Math.round(map(totalShake, 0, 50000, 0, 40, true)));

  drawImage(totalShake < 10000 ? lampOffImg : lampOnImg, 0, batteryY + totalHeight - imgHeight);
  drawImage(totalShake < 30000 ? microOffImg : microOnImg, 0, batteryY + totalHeight - imgHeight * 2 - margin);
  drawImage(totalShake < 50000 ? hairDryerOffImg : hairDryerOnImg, 0, batteryY + totalHeight - imgHeight * 3 - margin * 2);

  // image(totalShake < 10000 ? lampOffImg : lampOnImg, imgX, batteryY + totalHeight - imgHeight, imgWidth, imgHeight);
  // image(totalShake < 30000 ? microOffImg : microOnImg, imgX, batteryY + totalHeight - imgHeight * 2 - margin, imgWidth, imgHeight);
  // image(totalShake < 50000 ? hairDryerOffImg : hairDryerOnImg, imgX, batteryY + totalHeight - imgHeight * 3 - margin * 2, imgWidth, imgHeight);

  if (timer <= 0) {
    state = "end";

    playButton.hide();
    replayButton.show();
    clearInterval(timerInterval); // Ferma il timer quando il gioco finisce
  }
}

function drawEndScreen() {
  let margin = 20;
  let logoHeight = (logoImg.height * (windowWidth / 5)) / logoImg.width;
  image(logoImg, windowWidth / 2 - windowWidth / 10, margin, windowWidth / 5, logoHeight);

  textAlign(LEFT, TOP);
  textSize(24);
  fill("#FFFCF7");
  text(`Tempo scaduto!\nIn 30 secondi hai generato:`, margin, logoHeight + 2 * margin, windowWidth - margin);

  textAlign(CENTER, TOP);
  textSize(50);
  text(`${score}kW`, windowWidth / 2, logoHeight + 2 * margin + 48 + margin);

  textAlign(LEFT, TOP);
  textSize(24);

  if (totalShake < 10000) {
    textAlign(LEFT, TOP);
    textSize(24);
    text(`Non è abbastanza energia nemmeno per accendere una lampadina per 10 secondi`, margin, logoHeight + 2 * margin + 48 + margin + 50 + margin, windowWidth - margin);
    drawImage(lampOffImg, 1, windowHeight / 2);
  }

  if (totalShake >= 10000 && totalShake < 30000) {
    textAlign(LEFT, TOP);
    textSize(24);
    text(`Hai generato energia sufficiente per accendere una lampadina per 10 secondi`, margin, logoHeight + 2 * margin + 48 + margin + 50 + margin, windowWidth - margin);
    drawImage(lampOnImg, 1, windowHeight / 2);
  }
  if (totalShake >= 30000 && totalShake < 50000) {
    textAlign(LEFT, TOP);
    textSize(24);
    text(`Hai generato energia sufficiente per accendere un microonde per 10 secondi`, margin, logoHeight + 2 * margin + 48 + margin + 50 + margin, windowWidth - margin);
    drawImage(microOnImg, 1, windowHeight / 2);
  }
  if (totalShake >= 50000) {
    textAlign(LEFT, TOP);
    textSize(24);
    text(`Hai generato energia sufficiente per accendere un asciugacapelli per 10 secondi`, margin, logoHeight + 2 * margin + 48 + margin + 50 + margin, windowWidth - margin);
    drawImage(hairDryerOnImg, 1, windowHeight / 2);
  }

  replayButton.show();
}

function startGame() {
  state = "game";
  timer = 20;
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
  timer = 10;
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
  text(`${score}kW`, batteryX + rectWidth / 2, batteryY + totalHeight + totalHeight / 12);
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

function drawImage(img, index, imgY = 0) {
  //imgHeight è gia stato stanziato prima
  let imgWidth = img.width * (imgHeight / img.height);
  let imgX;

  // Calcola la larghezza massima consentita

  let maxWidth = (windowWidth - 20 * 2) / 3 - 20;

  // Se la larghezza dell'immagine supera la larghezza massima, ridimensiona l'immagine
  if (imgWidth > maxWidth) {
    imgWidth = maxWidth;
    imgHeight = img.height * (imgWidth / img.width);
  }

  // Calcola la posizione X in base all'indice
  switch (index) {
    case 0:
      imgX = margin;
      break;
    case 1:
      imgX = windowWidth / 2 - imgWidth / 2;
      break;
    case 2:
      imgX = windowWidth - margin - imgWidth;
      break;
  }

  image(img, imgX, imgY, imgWidth, imgHeight);
}
