class Config {
  constructor() {
    this.debugColor      = color('red');
    this.backgroundColor = color(40, 40, 50);
    this.foregroundColor = color('white');
    this.starColor       = color(150);
  }

  default() {
    strokeWeight(1);
    angleMode(RADIANS);
    noFill();
    noStroke();
  }
}
