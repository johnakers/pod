// provides oxygen to ship upon collision
class Fuel extends Entity {
  constructor({ stroke, fill }) {
    super();

    this.stroke = stroke;
    this.fill = fill;
    this.size = 8;
    this.pinged = false;
  }
}
