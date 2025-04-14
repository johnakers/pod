class Hud {
  constructor({ stroke, fill }) {
    this.stroke = stroke;
    this.fill = fill;
    this.danger = 'red';
    this.sound = false;
  }

  update() {
    // ...
  }

  draw(_entities, ship) {
    textAlign(LEFT);

    this.#drawAir(ship);
    this.#drawFuel(ship);

    if (this.sound) {
      text('SOUND ON', 10, height - 10);
    } else {
      text('CLICK FOR SOUND', 10, height - 10);
    }

    textAlign(RIGHT)
    text('USE ARROW KEYS TO MOVE | SPACEBAR TO PING', width - 10, height - 10);
  }

  #drawAir(ship) {
    noFill();
    stroke(this.stroke);
    text('AIR', 10, 20);
    this.#meter(50, 10, 200.0, 12, ship.air);
  }

  #drawFuel(ship) {
    noFill();
    stroke(this.stroke);
    text('FUEL', 10, 40);
    this.#meter(50, 30, 200.0, 12, ship.fuel);
  }

  #meter(x, y, w, h, resource) {
    let fillLength = resource / 100 * w;
    let fillColor = resource < 10 ? this.danger : this.fill;

    rect(x, y, w, h, 3);
    fill(fillColor);
    rect(x, y, fillLength, h);
  }
}
