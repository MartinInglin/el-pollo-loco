class StatusbarCoins extends Statusbars {
  images = [
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png",
  ];
  img;

  constructor() {
    super().loadImage("img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png");
    this.loadImages(this.images);
    this.y = 50;

    checkWorldExistence().then(() => {
      this.changeStatusbar();
    });
  }

  changeStatusbar() {
    let currentIndexStatusbar = 0;
    let previousAmountCoins = world.character.coinsCollected;

    let id = setInterval(() => {
      if (this.amountCoinsIncreases(previousAmountCoins) && currentIndexStatusbar < this.images.length - 1) {
        currentIndexStatusbar++;
        previousAmountCoins = world.character.coinsCollected;
        this.img = this.imageCache[this.images[currentIndexStatusbar]];
      }
    }, 100);
    this.intervalsStatusbar.push(id);
  }

  amountCoinsIncreases(previousAmountCoins) {
    return world.character.coinsCollected > previousAmountCoins;
  }
}
