class Coin extends MovableObject {
  y = 100;
  x = 100;
  height = 150;
  width = 150;

  constructor() {
    super().loadImage("img/8_coin/coin_1.png");
    this.x = Math.random() * (2000 - 100) + 100; // Random number between 100 and 1000
  }
}
