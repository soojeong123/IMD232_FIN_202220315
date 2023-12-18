//크기
const particleSize = 20;
//간격
const RESOLUTION = 10;
const MAX_FORCE = 10;
const MIN_FORCE = 0;

let particles = [];

let imgUrl = '../../src/anger.png';
let img;

function preload() {
  img = loadImage(imgUrl);
}

function setup() {
  setCanvasContainer('canvas', 1, 1, true);
  background(0);
  p = spawnParticles();
}

function draw() {
  background(0);
  // image(img, 0, 0, width, height);
  particles.forEach((particle) => {
    particle.update();
    particle.draw();
  });
}

function spawnParticles() {
  for (let i = 0; i < width; i += RESOLUTION) {
    for (let j = 0; j < height; j += RESOLUTION) {
      let x = (i / width) * img.width;
      let y = (j / height) * img.height;

      const color = img.get(x, y);
      // console.log({ color });

      particles.push(
        new Particle(i + particleSize / 2, j + particleSize / 2, color)
      );
    }
  }
}

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.targetX = x;
    this.targetY = y;
  }

  update() {
    let MV = createVector(mouseX, mouseY);
    let CV = createVector(this.x, this.y);
    let TV = createVector(this.targetX, this.targetY);

    let mouseToParticle = p5.Vector.sub(CV, MV);
    let distanceToMouse = mouseToParticle.mag();

    let particleToTarget = p5.Vector.sub(TV, CV);
    let distanceToTarget = particleToTarget.mag();

    let totalForce = createVector(0, 0);

    if (distanceToMouse < 100) {
      let respulsionForce = map(distanceToMouse, 0, 100, MAX_FORCE, MIN_FORCE);
      mouseToParticle.setMag(respulsionForce);
      totalForce.add(mouseToParticle);
    }

    if (distanceToMouse > 0) {
      let attractionForce = map(distanceToTarget, 0, 100, MIN_FORCE, MAX_FORCE);
      particleToTarget.setMag(attractionForce);
      totalForce.add(particleToTarget);
    }

    this.x += totalForce.x;
    this.y += totalForce.y;
  }

  draw() {
    fill(this.color);
    noStroke();
    rect(this.x, this.y, particleSize);
  }
}
