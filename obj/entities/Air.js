// provides oxygen to ship upon collision
class Air extends Entity {
  constructor({ stroke, fill }) {
    super();

    this.stroke = stroke;
    this.fill = fill;
    this.size = 8;
    this.pinged = false;
  }
}
