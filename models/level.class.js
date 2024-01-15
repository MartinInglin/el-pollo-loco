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
    this.levelEnd = this.backgroundReproductionCountX.length * 720;
  }
}
