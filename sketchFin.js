//variabili batteria
let rectWidth;
let rectHeight;
let innerBatteryMargins;
let totalHeight;
let batteryX;
let batteryY;

//variabili shake
let shakeStrength = 0;
let totalShake = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background("#331005"); // Set background to brown

  //batteria
  rectWidth = windowWidth / 3;
  rectHeight = (windowHeight - 200) / 45; // Space for rectangles and margins
  innerBatteryMargins = rectHeight / 4; // margins between rectangles
  totalHeight = (rectHeight + innerBatteryMargins) * 40;
  batteryX = windowWidth - rectWidth + rectWidth / 6 - windowWidth / 6;
  batteryY = (windowHeight - totalHeight) / 2;
}

function draw() {
  if (frameCount % 4 == 0) {
    totalShake = totalShake + shakeStrength;
    shakeStrength = 0;
  }
  drawBattery();
  fillBattery(Math.round(map(totalShake, 0, 80000, 0, 40, true)));
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
