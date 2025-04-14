class Star extends Entity {
  constructor({ type, stroke, fill }) {
    super();

    this.stroke = stroke;
    this.fill = fill;
    this.type = type;
    this.speedModifier = this.type === 'small' ? 1.3 : 1;
  }

  get size() {
    return {
      'small': 2,
      'normal': 5
    }[this.type];
  }

  _self(x, y) {
    line(width/2 + x - this.size/2, height/2 + y, width/2 + x + this.size/2, height/2 + y);
    line(width/2 + x, height/2 + y - this.size/2, width/2 + x, height/2 + y + this.size/2);
  }
}
