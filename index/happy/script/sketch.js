//참고 Web Bae의 'Picture to Particles'
//https://webflow.com/made-in-webflow/website/picture-to-particles?utm_medium=affiliate&ps_partner_key=a2VlZ2FubGVhcnk4Njcy&ps_xid=h8pb9E7TZK6YMO&gsxid=h8pb9E7TZK6YMO&gspk=a2VlZ2FubGVhcnk4Njcy

//크기
const particleSize = 10;
//간격
const RESOLUTION = 12;
const MAX_FORCE = 200;
const MIN_FORCE = 0;

let particles = [];

let imgUrl = '../../src/happiness.png';
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
  //파티클을 그리드 형태로 배치
  for (let i = 0; i < width; i += RESOLUTION) {
    for (let j = 0; j < height; j += RESOLUTION) {
      let x = (i / width) * img.width;
      let y = (j / height) * img.height;

      //color에 각 좌표의 이미지 색상 데이터를 저장
      const color = img.get(x, y);
      // console.log({ color });

      particles.push(
        //화면에서 벗어나지 않게 하기 위해 x, y에 파티클 사이즈/2 씩을 더해준다.
        //파티클에 같은 위치에 있는 이미지의 색상이 들어옴
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
      let respulsionForce = map(distanceToMouse, 10, 100, MAX_FORCE, MIN_FORCE);
      mouseToParticle.setMag(respulsionForce);
      totalForce.add(mouseToParticle);
    }

    if (distanceToMouse > 10) {
      let attractionForce = map(
        distanceToTarget,
        10,
        100,
        MIN_FORCE,
        MAX_FORCE
      );
      particleToTarget.setMag(attractionForce);
      totalForce.add(particleToTarget);
    }

    this.x += totalForce.x;
    this.y += totalForce.y;
  }

  draw() {
    fill(this.color);
    noStroke();
    //파티클 형태= 원
    ellipse(this.x, this.y, particleSize);
  }
}
