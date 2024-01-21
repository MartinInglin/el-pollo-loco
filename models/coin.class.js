class Coin extends MovableObject {
  y = 100;
  x;
  height = 150;
  width = 150;

  constructor(xPosition) {
    super().loadImage("img/8_coin/coin_1.png");
    this.x = xPosition;
    this.coinCollected();
  }

  /**
   * This function checks if the character has hit th coin. If so it deletes the coin.
   */
  coinCollected() {
    let id = setInterval(() => {
      if (this.health === 0) {
        this.coinDisappersAnimation();
        this.deleteCoin();
      }
    }, 40);
    this.intervalIdsMovableObjects.push(id);
  }

  /**
   * This function creates an animation. After the character has hit the coin, it flies up and out of the canvas.
   */
  coinDisappersAnimation() {
    this.y -= 30;
  }

  /**
   * This function deletes the object coin from the array "world.level.coins". It waits for 1s because this time is needed to fulfill the coinDisappersAnimation().
   */
  deleteCoin() {
    setTimeout(() => {
      const index = world.level.coins.indexOf(this);
      if (index !== -1) {
        world.level.coins.splice(index, 1);
      }
    }, 1000);
  }
}

