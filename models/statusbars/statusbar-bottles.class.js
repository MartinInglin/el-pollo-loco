class StatusbarBottles extends Statusbars {
  images = [
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png",
  ];
  img;
  x = 48;
  y = 48;

  constructor() {
    super().loadImage("img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png");
    this.loadImages(this.images);

    checkWorldExistence().then(() => {
      this.changeStatusbar();
    });
  }

  /**
   * This function sets the image of the statusbar for the bottles. It checks how many bottles the player has collected and displays the corresponding image.
   */
  changeStatusbar() {
    this.setStoppableInterval(() => {
      this.img = this.imageCache[this.images[world.character.bottlesCollected]];
    }, 100);
  }
}
