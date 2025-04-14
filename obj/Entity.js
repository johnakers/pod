class Entity {
  #x;
  #y;

  constructor() {
    this.vector = createVector();
    this.x = random(-width/2, width/2);
    this.y = random(-height/2, height/2);
    this.locations = [];
    this.speedModifier = 1;
    this.pingSoundPlaying = false;
  }

  get x() {
    return this.#x;
  }

  set x(x) {
    this.#x = x;
    this.vector.set(this.#x, this.#y);
  }

  get y() {
    return this.#y;
  }

  set y(y) {
    this.#y = y;
    this.vector.set(this.#x, this.#y);
  }

  get angle() {
    return atan2(this.y, this.x);
  }

  set angle(a) {
    let r = this.radius;
    this.x = r * cos(a);
    this.y = r * sin(a);
  }

  get radius() {
    return sqrt(this.x * this.x + this.y * this.y);
  }

  set radius(r) {
    let a = this.angle;
    this.x = r * cos(a);
    this.y = r * sin(a);
  }

  // ---
  get xActual() {
    return this.x + width/2;
  }

  get yActual() {
    return this.y + height/2;
  }

  // ---
  get isPingable() {
    return this.constructor.name !== 'Star';
  }

  get distance() {
    return dist(this.xActual, this.yActual, width/2, height/2);
  }

  // this needs to use the Ship's speed
  update(ship) {
    if (ship.fuel > 0 && !game.over) {
      if (keyIsDown(LEFT_ARROW)) {
        this.angle += 0.01;
      } else if (keyIsDown(RIGHT_ARROW)) {
        this.angle -= 0.01;
      }
    }

    if (keyIsDown(UP_ARROW)) {
      this.y += ship.speed;
    } else {
      this.y += ship.speed * this.speedModifier;
    }

    this.#storePastLocation();
    this.#wrapLocation();
  }

  draw() {
    fill(this.fill);
    stroke(this.stroke);

    for (let location of this.locations) {
      this._self(location.x, location.y);
    }

    this._self(this.x, this.y);
  }

  ping() {
    if (this.isPingable) {
      this.pinged = true;
      if (!this.pingSoundPlaying) {
        soundPing.play();
        this.pingSoundPlaying = true;
        this.pinged = false;
      }
    }
  }

  // move off the screen, so the #wrapLocation picks it up
  recycle() {
    this.pingSoundPlaying = false;
    this.y = height*2;
    this.pinged = false;
  }

  #storePastLocation() {
    this.locations.push({ x: this.x, y: this.y });
    if (this.locations.length > 3) {
      this.locations.shift();
    }
  }

  #wrapLocation() {
    if (this.yActual > height) {
      this.y = -1 * height/2;
      this.x = random(-width/2, width/2);
      this.pinged = false;
      this.pingSoundPlaying = false;
    } else if (this.yActual < 0) {
      this.y = height/2;
      this.x = random(-width/2, width/2);
      this.pinged = false;
      this.pingSoundPlaying = false;
    }

    if (this.xActual > width) {
      this.x = -1 * width/2;
      this.y = random(-height/2, height/2);
      this.pinged = false;
      this.pingSoundPlaying = false;
    } else if (this.xActual < 0) {
      this.x = width/2;
      this.y = random(-height/2, height/2);
      this.pinged = false;
      this.pingSoundPlaying = false;
    }
  }

  _self(x, y) {
    fill(this.fill);
    stroke(this.stroke);
    rect(
      width/2 + x - this.size/2,
      height/2 + y + this.size/2,
      this.size
    );

    if (this.pinged) {
      noStroke();
      fill(this.stroke);
      textAlign(CENTER);
      textSize(10);
      text(`[${this.constructor.name.toLocaleUpperCase()}]`, width/2 + x, height/2 + y);
    }
  }
}
