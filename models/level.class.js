class Level {
  enemies;
  endboss;
  clouds;
  coins;
  bottles;
  throwableBottles;
  backgroundObjects;
  backgroundReproductionCountX;
  backgroundImagePaths;
  levelEnd;
  script;

  constructor(actualLevel) {
    this.enemies = actualLevel.enemies;
    this.endboss = actualLevel.endboss;
    this.clouds = actualLevel.clouds;
    this.coins = actualLevel.coins;
    this.bottles = actualLevel.bottles;
    this.throwableBottles = actualLevel.throwableBottles;
    this.backgroundObjects = actualLevel.backgroundObjects;
    this.backgroundReproductionCountX = actualLevel.backgroundReproductionCountX;
    this.backgroundImagePaths = actualLevel.backgroundImagePaths;
    this.levelEnd = this.backgroundReproductionCountX * 720;
    this.loadBackgroundImages();
    this.script = new ScriptLevel1();
  }

  /**
   * This function pushes the images of the background into the array backgroundObjects.
   */
  loadBackgroundImages() {
    for (let i = 0; i < this.backgroundReproductionCountX; i++) {
      let setOfLayers = i % 2;
      this.backgroundImagePaths[setOfLayers].forEach((image) => {
        this.backgroundObjects.push(new BackgroundObject(image, i * 719));
      });
    }
  }
}
