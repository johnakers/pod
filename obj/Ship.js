class Ship {
  constructor({ stroke }) {
    this.x = width/2;
    this.y = height/2;
    this.vector = createVector(0, 0);
    this.size = 10;
    this.speed = 0;
    this.maxSpeed = 5;
    this.isPinging = false;
    this.pingSize = 0;
    this.maxPingSize = width/2;
    this.maxFuel = 100;
    this.fuel = 100;
    this.fuelCounter = 0;
    this.maxAir = 100;
    this.air = 100;
    this.airCounter = 0;
    this.debrisCounter = 0;
    this.disabled = false;
    this.resonatorCounter = 0;
    this.shaking = false;

    this.stroke = stroke;
  }

  ping() {
    this.isPinging = true
  }

  update() {
    if (this.shaking) {
      translate(
        random(-10, 10),
        random(-10, -10)
      );
    }

    // pings
    if (this.isPinging) {
      this.pingSize += 2;
    }

    if (this.pingSize > this.maxPingSize) {
      this.pingSize = 0;
      this.isPinging = false;
    }

    this.air -= 0.05;

    if (this.fuel < 0) { this.fuel = 0; }
    if (this.air < 0) { this.air = 0; }
    if (this.air <= 0) { return; }

    // doin't allow movement if disabled
    if (this.disabled) { return; }

    if (this.fuel > 0) {
      if (keyIsDown(UP_ARROW)) {
        this.fuel -= 0.2;
        this.speed += 0.1;
      } else if (keyIsDown(DOWN_ARROW)) {
        this.speed -= 0.05;
        this.fuel -= 0.1;
      }

      if (keyIsDown(LEFT_ARROW)) {
        this.fuel -= 0.05;
      } else if (keyIsDown(RIGHT_ARROW)) {
        this.fuel -= 0.05;
      }
    }

    // set speed
    if (this.speed > this.maxSpeed) {
      this.speed = this.maxSpeed;
    }
  }

  collide(entity) {
    let name = entity.constructor.name;
    switch(name) {
      case 'Air':
        this.airCounter++;
        this.air += 20;
        if (this.air > this.maxAir) { this.air = this.maxAir; }
        soundCollect.play();
        break;
      case 'Fuel':
        this.fuelCounter++;
        this.fuel += 20;
        if (this.fuel > this.maxAir) { this.fuel = this.maxFuel; }
        soundCollect.play();
        break;
      case 'Debris':
        this.debrisCounter++;
        this.speed = 0;
        this.disable();
        break;
    }
  }

  enable() {
    this.disabled = false;
  }

  disable() {
    this.disabled = true;
    this.shaking = true;
    soundCrash.play();

    setTimeout(() => {
      game.ship.shaking = false;
    }, 500)

    setTimeout(() => {
      game.ship.enable();
    }, 1000);
  }

  draw() {
    noFill();
    stroke(this.stroke);
    if (this.isPinging) {
      circle(this.x, this.y, this.pingSize);
    }

    triangle(
      this.x - this.size/2, this.y + this.size/2,
      this.x + this.size/2, this.y + this.size/2,
      this.x, this.y - this.size/2
    )
  }
}
