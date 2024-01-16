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
    this.loadBackgroundImages();
  }

    /**
   * This function creates the background of the game. The variable backgroundReproductionCountX is an array of numbers defined in level1.js.
   */
  loadBackgroundImages() {
    this.backgroundReproductionCountX.forEach((reproductionCountX) => {
      this.loadBackgroundLayer(reproductionCountX);
    });
  }

  /**
   * This function loads the images of the background. If the name of the image is "air" it is only drawn once.
   *
   * @param {number} reproductionCountX - This number counts how many times the background images are drawn on the X-axis. The higher this number the longer the level. It is defined in level1.js/backgroundReproductionCountX.
   */
  loadBackgroundLayer(reproductionCountX) {
    let layerNumberForImage = (reproductionCountX % 2) + 1;

    this.backgroundImagePaths.forEach((imagePath) => {
      if (imagePath === "air") {
        this.createSky(reproductionCountX);
      } else {
        this.createGround(imagePath, layerNumberForImage, reproductionCountX);
      }
    });
  }

  /**
   * This function creates the image for the sky.
   *
   * @param {number} reproductionCountX - This number counts how many times the background images are drawn on the y-axis. The higher this number the longer the level. It is defined in level1.js/backgroundReproductionCountX.
   */
  createSky(reproductionCountX) {
    const imagePathForLayer = `img/5_background/layers/air.png`;
    this.backgroundObjects.push(new BackgroundObject(imagePathForLayer, (reproductionCountX - 1) * 719));
  }

  /**
   * This function creates the images for the ground.
   *
   * @param {string} imagePath - This string is inserted in the path. It may look like this "3_third_layer/"
   * @param {number} layerNumberForImage - This string is inserted in the path. It is the number which defines in which layer the image is drawn.
   * @param {number} reproductionCountX - This number counts how many times the background images are drawn on the x-axis. The higher this number the longer the level. It is defined in level1.js/backgroundReproductionCountX.
   */
  createGround(imagePath, layerNumberForImage, reproductionCountX) {
    const imagePathForLayer = `img/5_background/layers/${imagePath}/${layerNumberForImage}.png`;
    this.backgroundObjects.push(new BackgroundObject(imagePathForLayer, (reproductionCountX - 1) * 719));
  }
}
