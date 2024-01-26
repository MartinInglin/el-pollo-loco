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
  x = 24;
  y = 24;

  constructor() {
    super().loadImage("img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png");
    this.loadImages(this.images);

    checkWorldExistence().then(() => {
      this.changeStatusbar();
    });
  }

  /**
   * This function sets the image of the statusbar for the coins. It checks how many coins the player has collected and displays the corresponding image. 
   */
  changeStatusbar() {
    this.setStoppableInterval(() => {
      this.img = this.imageCache[this.images[world.character.coinsCollected]];
    }, 100);
  }
}
