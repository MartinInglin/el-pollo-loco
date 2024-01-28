class StatusbarHealthEndboss extends Statusbars {
  imagesGreen = [
    "img/7_statusbars/2_statusbar_endboss/green/green100.png",
    "img/7_statusbars/2_statusbar_endboss/green/green80.png",
    "img/7_statusbars/2_statusbar_endboss/green/green60.png",
    "img/7_statusbars/2_statusbar_endboss/green/green40.png",
    "img/7_statusbars/2_statusbar_endboss/green/green20.png",
    "img/7_statusbars/2_statusbar_endboss/green/green0.png",
  ];
  imagesBlue = [
    "img/7_statusbars/2_statusbar_endboss/blue/blue100.png",
    "img/7_statusbars/2_statusbar_endboss/blue/blue80.png",
    "img/7_statusbars/2_statusbar_endboss/blue/blue60.png",
    "img/7_statusbars/2_statusbar_endboss/blue/blue40.png",
    "img/7_statusbars/2_statusbar_endboss/blue/blue20.png",
    "img/7_statusbars/2_statusbar_endboss/blue/blue0.png",
  ];
  imagesOrange = [
    "img/7_statusbars/2_statusbar_endboss/orange/orange100.png",
    "img/7_statusbars/2_statusbar_endboss/orange/orange80.png",
    "img/7_statusbars/2_statusbar_endboss/orange/orange60.png",
    "img/7_statusbars/2_statusbar_endboss/orange/orange40.png",
    "img/7_statusbars/2_statusbar_endboss/orange/orange20.png",
    "img/7_statusbars/2_statusbar_endboss/orange/orange0.png",
  ];
  img;
  x = 440;
  y = 0;
  actualStatusbar;

  constructor() {
    super().loadImage("img/7_statusbars/2_statusbar_endboss/green/green100.png");
    this.loadImages(this.imagesGreen);
    this.loadImages(this.imagesBlue);
    this.loadImages(this.imagesOrange);

    this.actualStatusbar = this.imagesGreen;

    checkWorldExistence().then(() => {
      this.changeStatusbar();
    });
  }

  changeStatusbar() {
    const healthValues = [100, 80, 60, 40, 20, 0];
  
    this.setStoppableInterval(() => {
      const enemyHealth = world.level.enemies[0].health;
      for (let i = 0; i < healthValues.length; i++) {
        if (enemyHealth >= healthValues[i]) {
          const index = i;
          this.img = this.imageCache[this.actualStatusbar[index]];
          break;
        }
      }
    }, 100);
  }
  
}
