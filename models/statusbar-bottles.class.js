class StatusbarBottles extends Statusbars{
  images = [
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png",
  ];
  img;

  constructor() {
    super().loadImage("img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png");
    this.loadImages(this.images);
    this.y = 100;

    checkWorldExistence().then(() => {
      this.changeStatusbar();
    });
  }

  changeStatusbar() {
    let currentIndexStatusbar = 0;
    let previousAmountBottles = world.character.bottlesCollected;

    let id = setInterval(() => {
      if (this.amountCoinsIncreases(previousAmountBottles) && currentIndexStatusbar < this.images.length - 1) {
        currentIndexStatusbar++;
        previousAmountBottles = world.character.bottlesCollected;
        this.img = this.imageCache[this.images[currentIndexStatusbar]];
      }
    }, 100);
    this.intervalsStatusbar.push(id);
  }

  amountCoinsIncreases(previousAmountBottles) {
    return world.character.bottlesCollected > previousAmountBottles;
  }
}
