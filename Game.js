class Game {
  constructor() {
    this.config = new Config();
    this.hud = new Hud({ stroke: this.config.foregroundColor, fill: this.config.foregroundColor });
    this.ship = new Ship({ stroke: this.config.foregroundColor });
    this.entities = [];
    this.over = false;

    this.startTime = new Date();
    this.endTime = null;
    this.time = null;

    // sounds
    this.gameOverSoundPlaying = false;
  }

  build() {
    // small stars
    for (let i = 0; i < 3; i++) {
      this.entities.push(new Star({ type: 'small', stroke: this.config.starColor, fill: this.config.backgroundColor }));
    }

    // normal stars
    for (let i = 0; i < 7; i++) {
      this.entities.push(new Star({ type: 'normal', stroke: this.config.starColor, fill: this.config.backgroundColor }));
    }

    // debris
    for (let i = 0; i < 3; i++) {
      this.entities.push(new Debris({ stroke: this.config.foregroundColor, fill: this.config.backgroundColor }));
    }

    // fuel
    this.entities.push(new Fuel({ stroke: this.config.foregroundColor, fill: this.config.backgroundColor }));

    // air
    for (let i = 0; i < 2; i++) {
      this.entities.push(new Air({ stroke: this.config.foregroundColor, fill: this.config.backgroundColor }))
    }
  }

  update() {
    this.ship.update();
    this.#updateEntities();
    this.#checkCollisions();
    this.#checkGameOver();

    this.hud.update();
  }

  draw() {
    this.ship.draw();
    this.#drawEntities();

    if (this.over) {
      if (!this.gameOverSoundPlaying) {
        this.gameOverSoundPlaying = true;
        soundGameOver.play();
      }

      fill(this.config.foregroundColor);
      noStroke();
      textAlign(CENTER);
      text('GAME OVER', this.ship.x, this.ship.y + 25);
      textAlign(RIGHT);
      text(`air: ${this.ship.airCounter}`, this.ship.x + 10, this.ship.y + 45);
      text(`fuel: ${this.ship.fuelCounter}`, this.ship.x + 10, this.ship.y + 60);
      text(`debris: ${this.ship.debrisCounter}`, this.ship.x + 10, this.ship.y + 75);
      text(`survived (minutes): ${round(this.time, 1)}`, this.ship.x + 10, this.ship.y + 90);
    }

    this.hud.draw(game.entities, game.ship);
  }

  #updateEntities() {
    for (let i = 0; i < this.entities.length; i++) {
      this.entities[i].update(this.ship);
    }
  }

  #checkCollisions() {
    // check pings vs entities
    for (let i = 0; i < this.entities.length; i++) {
      let entity = this.entities[i];

      if (entity.isPingable && entity.distance < this.ship.pingSize/2) {
        entity.ping();
      }

      if (
        this.ship.x > entity.xActual - this.ship.size/2 &&
        this.ship.x < entity.xActual + this.ship.size/2 &&
        this.ship.y > entity.yActual - this.ship.size/2 &&
        this.ship.y < entity.yActual + this.ship.size/2 &&
        entity.isPingable
      ) {
        this.ship.collide(entity);
        entity.recycle();
      }
    }
  }

  #checkGameOver() {
    if (this.ship.air <= 0) {
      this.over = true;
      this.endTime === null ? this.endTime = new Date() : null;
      this.time = Math.abs(this.startTime.getTime() - this.endTime.getTime())/1000/60.0;
    }
  }

  #drawEntities() {
    for (let i = 0; i < this.entities.length; i++) {
      this.entities[i].draw();
    }
  }
}
