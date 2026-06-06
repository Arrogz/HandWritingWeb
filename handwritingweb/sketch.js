var shapes = [];  // Stores completed shapes
var currentShape = [];  // Stores points for the shape being drawn
var curX, curY;
var curStrokeWeight = 11;
var canvas, canvasX = 0;
var newP = false;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0,0);
  layer1 = createGraphics(width, height);
  background(255);
  curX = mouseX;
  curY = mouseY;
}

function draw() {
  background(255, 10);
  noFill();
  stroke(0);
  strokeWeight(5);
  newPaper();
  line(0, 0, 0, height);
  // Smoothly interpolate current position towards mouse position
  curX = lerp(curX, mouseX, 0.45);
  curY = lerp(curY, mouseY, 0.45);
  // Draw the shape currently being drawn
  for(let s of shapes){
    s.draw();
  }
  if (currentShape.length >= 0) {
    noFill();
    strokeWeight(curStrokeWeight);
    stroke(150, 0, 200);
    beginShape();
    for (let pt of currentShape) {
      vertex(pt.x, pt.y);
    }
    endShape();
  }
}

function mouseDragged() {
  if(curStrokeWeight>0) currentShape.push(createVector(curX, curY));
}

function mouseReleased() {
  if (currentShape.length > 0) {
    let curLetter = new letterShape(currentShape, curStrokeWeight);
    curLetter.draw();
    shapes.push(curLetter);
    currentShape = [];
  }
}

function keyPressed() {
  switch (key) {
    case 'z':
      shapes.pop();
      background(255);
      for (let s of shapes) {
        s.draw();
      }
      break;
    case 'c':
      newP = true;
      break;
    case 'b':
      fill(0);
      if(curStrokeWeight >= 3)
        drawInkSplash(mouseX, mouseY, random(curStrokeWeight , curStrokeWeight*2 )), curStrokeWeight -= 2;
      break;
    case 'r': 
      curStrokeWeight = 11;
      break;
    case 'i':
      background(255);
      for (let s of shapes) {
        s.isItalic = s.isItalic == 0 ? 1 : 0;
        s.draw();
      }
      break;
    default:
      break;
  }
}

// Function to smoothly move the canvas to simulate new paper
function newPaper() {
  if(newP == true){
      canvasX = lerp(canvasX, windowWidth+300, 0.05*(( windowWidth+1000 - canvasX)/windowWidth));
      //shapes = [];
      //background(255);
      if(canvasX > windowWidth+5){
        newP = false;
        canvasX = 0;
        canvas.position(canvasX, 0);
        shapes = [];
        background(255);
      }
  }
  canvas.position(canvasX, 0);
}

function letterShape(currentShape, curStrokeWeight) {
  this.shape = currentShape;
  this.strokeW = curStrokeWeight;
  this.maxX = -Infinity;
  this.maxY = -Infinity;
  this.minX = Infinity;
  this.minY = Infinity;
  this.coreX = 0;
  this.coreY = 0;
  this.isItalic = 0;

  // Calculate bounding box and core position
  this.calBounds = function() {

    for (let pt of this.shape) {
      this.maxX = max(this.maxX, pt.x);
      this.minX = min(this.minX, pt.x);
      this.maxY = max(this.maxY, pt.y);
      this.minY = min(this.minY, pt.y);
      this.coreX += pt.x;
      this.coreY += pt.y;
    }
    this.coreX /= this.shape.length;
    this.coreY /= this.shape.length;
    //console.log("coreX: " + this.coreX + " coreY: " + this.coreY);
  }

  this.draw = function() {
    // Draw the shapes
    this.calBounds();
    noFill();
    stroke(0);
    strokeWeight(this.strokeW);
    beginShape();
      for (let pt of this.shape) {
        vertex(pt.x + (this.coreX-this.minX+200) * (1-pt.y/this.coreY)/2 * this.isItalic, pt.y);
      }
    endShape();
  }
}


function drawInkSplash(x, y, r) {
  beginShape();
  strokeWeight(0);
  fill(0, 900);
  let points = 30; // Number of points for the splash edge
  for (let i = 0; i < points; i++) {
    let angle = map(i, 0, points, 0, TWO_PI);
    // Add some random jaggedness
    r += random(-2, 2);
    let px = x + r * cos(angle);
    let py = y + r   * sin(angle);
    vertex(px, py);
  }
  endShape(CLOSE);

  // Add a few small dots around for splatter effect
  for (let i = 0; i < 3 * curStrokeWeight; i++) {
    let a = random(TWO_PI);
    let d = random(r * 2.6, r * 5);
    let dotSize = random(3, 10);
    ellipse(x + cos(a) * d, y + sin(a) * d, dotSize);
  }
}