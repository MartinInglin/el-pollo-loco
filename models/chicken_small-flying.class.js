class ChickenSmallFlying extends MovableObject {
  height = 40;
  width = 40;
  y = 200;
  x;
  speed = 10;
  imageDead = [
    "img/3_enemies_chicken/chicken_small/2_dead/dead.png",
  ]

  constructor(xPosition, yPosition) {
    super().loadImage("img/3_enemies_chicken/chicken_small/1_walk/2_w.png");
    this.loadImages(this.imageDead);
    this.x = xPosition;
    this.y = yPosition;

    checkWorldExistence().then(() => {
    this.startMovingTowardsCharacter();
    this.enemyDies()
    });
  }

  /**
   * This function checks if the character is within 200 pixels of the character. It then executes the walking animation and the movement. Because the small chicken runs faster than the character there is no need to retrigger the function.
   */
  startMovingTowardsCharacter() {
    let id = setInterval(() => {
      this.moveLeft()
    }, 30);
    this.intervalIdsMovableObjects.push(id);
  }
}
