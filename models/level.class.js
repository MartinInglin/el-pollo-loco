class Level {
  enemies;
  clouds;
  coins;
  backgroundObjects;
  backgroundReproductionCountX;
  backgroundImagePaths;
  levelEnd;

  constructor(actualLevel) {
    this.enemies = actualLevel.enemies;
    this.clouds = actualLevel.clouds;
    this.coins = actualLevel.coins;
    this.backgroundObjects = actualLevel.backgroundObjects;
    this.backgroundReproductionCountX = actualLevel.backgroundReproductionCountX;
    this.backgroundImagePaths = actualLevel.backgroundImagePaths;
    this.levelEnd = this.backgroundReproductionCountX * 720;
    this.loadBackgroundImages();
  }

  loadBackgroundImages() {
    for (let i = 0; i < this.backgroundReproductionCountX; i++) {
      let setOfLayers = i % 2;
      this.backgroundImagePaths[setOfLayers].forEach((image) => {
        this.backgroundObjects.push(new BackgroundObject(image, i * 719));
      });
    }
  }
}
