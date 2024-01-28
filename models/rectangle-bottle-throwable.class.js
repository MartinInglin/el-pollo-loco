class RectangleBottleThrowable extends MovableObject{
  x;
  y = 0;
  height = 80;
  width = 80;

  constructor() {
    super();
    checkWorldExistence().then(() => {
      this.getPositionBottle();
    });
  }

  /**
   * This function gets the position of the bottle. It is needed so the rectangle is at the same spot as the bottle itself.
   */
  getPositionBottle() {
    this.setStoppableInterval(() => {
        this.x = world.level.throwableBottles[0].x;
        this.y = world.level.throwableBottles[0].y;
    }, 40);
  }
}
