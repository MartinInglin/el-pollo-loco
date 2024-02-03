class Cloud extends MovableObject {
  y = 20;
  x;
  height = 250;
  width = 500;

  constructor(cloudNumber) {
    super().loadImage("img/5_background/layers/4_clouds/1.png");
    this.width = 500;
    this.height = 250;
    this.x = cloudNumber * 720;

    checkWorldExistence().then(() => {
      this.moveClouds();
    });
  }

  /**
   * This function moves the clouds. If the cloud is outside the canvas on the leftside, x is changed so it reappears on the right side again.
   */
  moveClouds() {
    this.setStoppableInterval(() => {
      if (this.x < -500) {
        this.x = world.level.levelEnd + 720;
      }
      this.x -= 0.5;
    }, 100);
  }
}
