class Coin extends MovableObject {
  y = 100;
  x = 100;
  height = 150;
  width = 150;

  constructor() {
    super().loadImage("img/8_coin/coin_1.png");
    this.x = Math.random() * (2000 - 100) + 100;
    this.coinCollected();
  }

  coinCollected() {
    let id = setInterval(() => {
      if (this.health === 0) {
        //this.stopIntervalsMovableObjects();
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

