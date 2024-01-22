class RectangleBottle {
    bottle;
    x;
    y;
    width;
    height;
    invervalIdsRectangleBottle = [];
  
    constructor(bottle) {
      this.bottle = bottle;
      this.x = this.bottle.x;
      this.y = this.bottle.y;
      this.height = this.bottle.height;
      this.width = this.bottle.width;
    }

    stopIntervals() {
      this.invervalIdsRectangleBottle.forEach(clearInterval);
    }
  }