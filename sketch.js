let value = 0;
let threshold = 30;

function setup() {
  setShakeThreshold(threshold);
}
function draw() {
  fill(value);
  rect(25, 25, 50, 50);
  describe(`50-by-50 black rect in center of canvas.
    turns white on mobile when device is being shaked`);
}
function deviceMoved() {
  value = value + 5;
  threshold = threshold + 5;
  if (value > 255) {
    value = 0;
    threshold = 30;
  }
  setShakeThreshold(threshold);
}

function touchEnded() {
  if (DeviceOrientationEvent && DeviceOrientationEvent.requestPermission) {
    DeviceOrientationEvent.requestPermission();
  }
}
