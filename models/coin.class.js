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

  coinCollected() {
    let id = setInterval(() => {
      if (this.health === 0) {
        this.coinDisappersAnimation();
        this.deleteCoin();
      }
    }, 40);
    this.intervalIdsMovableObjects.push(id);
  }

  coinDisappersAnimation() {
    this.y -= 30;
  }

  deleteCoin() {
    setTimeout(() => {
      const index = world.level.coins.indexOf(this);
      if (index !== -1) {
        world.level.coins.splice(index, 1);
      }
    }, 1000);
  }
}

