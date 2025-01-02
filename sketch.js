let shakeStrength = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textSize(32);
  background(255, 0, 0);
  fill(255);
}

function draw() {
  background(255, 0, 0);
  text(`Shake Strength: ${shakeStrength.toFixed(2)}`, width / 2, height / 2);
}

function deviceShaken() {
  // Calculate shake strength using the magnitude of the acceleration
  shakeStrength = sqrt(sq(accelerationX) + sq(accelerationY) + sq(accelerationZ));
}

function touchEnded() {
  if (DeviceOrientationEvent && DeviceOrientationEvent.requestPermission) {
    DeviceOrientationEvent.requestPermission();
  }
}
