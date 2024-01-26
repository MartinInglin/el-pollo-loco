class Bottle extends MovableObject {
  y = 370;
  x;
  height = 80;
  width = 80;

  constructor(xPosition) {
    super().loadImage("img/6_salsa_bottle/2_salsa_bottle_on_ground.png");
    this.x = xPosition;

    checkWorldExistence().then(() => {
      this.bottleCollected();
    });
  }

  /**
   * This function checks if the player has collected a bottle. If so, it calls the function to delete the bottle.
   */
  bottleCollected() {
    this.setStoppableInterval(() => {
      if (this.health === 0) {
        this.deleteBottle();
      }
    }, 40);
  }

  /**
   * This function deletes the bottle object from the array "world.level.bottles"
   */
  deleteBottle() {
    this.stopIntervalsMovableObjects();
    const index = world.level.bottles.indexOf(this);
    if (index !== -1) {
      world.level.bottles.splice(index, 1);
    }
  }
}
