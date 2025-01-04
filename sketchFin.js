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

  //batteria
  rectWidth = windowWidth / 3;
  rectHeight = (windowHeight - 200) / 45; // Space for rectangles and margins
  innerBatteryMargins = rectHeight / 4; // margins between rectangles
  totalHeight = (rectHeight + innerBatteryMargins) * 40;
  batteryX = windowWidth - rectWidth - rectWidth / 12 - margin;
  batteryY = (windowHeight - totalHeight) / 2;

  //images
  imgHeight = totalHeight / 5;
  imgWidth = 700 * (imgHeight / 700);
  imgX = windowWidth / 20;
}

function draw() {
  background("#331005"); // Set background to brown
  if (frameCount % 4 == 0) {
    totalShake = totalShake + shakeStrength;
    shakeStrength = 0;
  }
  drawBattery();
  fillBattery(Math.round(map(totalShake, 0, 50000, 0, 40, true)));
  image(totalShake < 10000 ? lampOffImg : lampOnImg, imgX, batteryY + totalHeight - imgHeight, imgWidth, imgHeight);
  image(totalShake < 30000 ? microOffImg : microOnImg, imgX, batteryY + totalHeight - imgHeight * 2 - margin, imgWidth, imgHeight);
  image(totalShake < 50000 ? hairDryerOffImg : hairDryerOnImg, imgX, batteryY + totalHeight - imgHeight * 3 - margin * 2, imgWidth, imgHeight);
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

function drawImage(img, imgY = 0) {
  let imgHeight = totalHeight / 5;
  let imgWidth = img.width * (imgHeight / img.height);
  let imgX = windowWidth / 12;
  //let imgY = batteryY + totalHeight - imgHeight;

  image(img, imgX, imgY, imgWidth, imgHeight);
}
