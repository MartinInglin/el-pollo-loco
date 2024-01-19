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

  constructor() {
    super().loadImage("img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png");
    this.loadImages(this.images);
    this.y = 0;

    checkWorldExistence().then(() => {
      this.changeStatusbar();
    });
  }

  changeStatusbar() {
    let currentIndexStatusbar = 0;
    let previousHealth = world.character.health;
  
    let id = setInterval(() => {
      if (this.healthCharacterDecreases(previousHealth) && currentIndexStatusbar < this.images.length - 1) {
        currentIndexStatusbar++;
        previousHealth = world.character.health;
        this.img = this.imageCache[this.images[currentIndexStatusbar]];
      }
    }, 100);
    this.intervalsStatusbar.push(id);
  }
  
  /**
   * This function checks if health of the character decreases.
   *
   * @param {number} previousHealth - Previous health is stored to compare with actual health of the character.
   * @returns boolean
   */
  healthCharacterDecreases(previousHealth) {
    return world.character.health < previousHealth;
  }
}
