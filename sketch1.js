function setup() {
  createCanvas(windowWidth, windowHeight);
  background("#331005"); // Set background to brown

  let rectWidth = windowWidth / 3;
  let rectHeight = (windowHeight - 200) / 45; // Space for rectangles and margins
  let margin = rectHeight / 4; // Margins between rectangles
  let totalHeight = (rectHeight + margin) * 40;

  let frameX = windowWidth - rectWidth + rectWidth / 6 - windowWidth / 6;
  let frameY = (windowHeight - totalHeight) / 2;

  noFill();
  strokeWeight(3);
  stroke("#FFFCF7");

  // Draw frame
  rect(frameX - rectWidth / 12, frameY - rectWidth / 12, rectWidth + rectWidth / 6, totalHeight + rectWidth / 6, 15);

  noStroke();
  fill("#804600"); // Brown rectangles
  for (let i = 0; i < 40; i++) {
    let rectY = frameY + i * (rectHeight + margin);
    rect(frameX, rectY, rectWidth, rectHeight, 10);
  }

  //yellow rectangles
  fill("#FFD12E"); // Brown rectangles
  for (let i = 0; i < 20; i++) {
    let rectY = frameY - i * (rectHeight + margin) + 39 * (rectHeight + margin);
    rect(frameX, rectY, rectWidth, rectHeight, 10);
  }

  // Draw white rectangle on top
  fill("#FFFCF7");
  rect(frameX + rectWidth / 3, frameY - 30, rectWidth / 3, 20, 5);
}
