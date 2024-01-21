class StatusbarHealthCharacter extends Statusbars {
  images = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png",
  ];
  img;
  x = 0;
  y = 0;

  constructor() {
    super().loadImage("img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png");
    this.loadImages(this.images);

    checkWorldExistence().then(() => {
      this.changeStatusbar();
    });
  }

  /**
   * This function sets the image of the statusbar for the characters health. It compares the health of the character with the array healthValues and shows the image corresponding to this index.
   */
  changeStatusbar() {
    const healthValues = [100, 80, 60, 40, 20, 0];
    let id = setInterval(() => {
      const index = healthValues.indexOf(world.character.health);
      if (index !== -1) {
        this.img = this.imageCache[this.images[index]];
      }
    }, 100);
    this.intervalsStatusbar.push(id);
  }
}
