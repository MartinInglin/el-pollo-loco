class RectangleBottleThrowable {
  x;
  y = 0;
  height = 80;
  width = 80;
  intervalIdsRectangleThrowableBottle = [];

  constructor() {
    checkWorldExistence().then(() => {
      this.getPositionBottle();
    });
  }

  getPositionBottle() {
    let id = setInterval(() => {
        this.x = world.level.throwableBottles[0].x;
        this.y = world.level.throwableBottles[0].y;
    }, 40);
    this.intervalIdsRectangleThrowableBottle.push(id);
  }

  stopIntervals() {
    this.intervalIdsRectangleThrowableBottle.forEach(clearInterval);
  }
}
