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

  getPositionBottle() {
    this.setStoppableInterval(() => {
        this.x = world.level.throwableBottles[0].x;
        this.y = world.level.throwableBottles[0].y;
    }, 40);
  }
}
