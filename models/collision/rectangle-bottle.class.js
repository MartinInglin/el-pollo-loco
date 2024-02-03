class RectangleBottle extends MovableObject {
  bottle;

  constructor(bottle) {
    super();
    this.bottle = bottle;
    this.x = this.bottle.x;
    this.y = this.bottle.y;
    this.height = this.bottle.height;
    this.width = this.bottle.width;
  }
}
