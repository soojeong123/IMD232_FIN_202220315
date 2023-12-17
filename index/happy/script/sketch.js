let myImages = [];

const SCALE_FACTOR = 0.15;

const DISTANCE_FACTOR = SCALE_FACTOR * 2;

const MAX_VELOCITY = 2;

function preload() {
  const images = document.querySelectorAll('');
}

function setup() {
  setCanvasContainer('canvas', 1, 1, true);
  background(50);
}

function draw() {
  background(50);

  for (let image of myImages) {
  }
}

class MyImage {
  constructor(img) {
    this.img = img;
  }

  updateScale(mouseX, mouseY) {}

  update() {}

  display() {}
}

function easeOutQuart(x) {
  return 1 - Math.pow(1 - x, 4);
}
