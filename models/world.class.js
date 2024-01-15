class World {
  keyboard = new Keyboard();
  character = new Character(this.keyboard);
  canvas;
  ctx;
  camera_x = 0;
  level = new Level(level1);
  rectanglesCollision = new RectanglesCollision();
  intervals = {
    character: {
    },
  };

  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.loadBackgroundImages();
    this.draw();
  }

  /**
   * This function creates the background of the game. The variable backgroundReproductionCountX is an array of numbers defined in level1.js.
   */
  loadBackgroundImages() {
    this.level.backgroundReproductionCountX.forEach((reproductionCountX) => {
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

    this.level.backgroundImagePaths.forEach((imagePath) => {
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
    this.level.backgroundObjects.push(new BackgroundObject(imagePathForLayer, (reproductionCountX - 1) * 719));
  }

  /**
   * This function creates the images for the ground.
   *
   * @param {string} imagePath - This string is inserted in the path. It may look like this "3_third_layer/"
   * @param {number} layerNumberForImage - This string is inserted in the path. It is the number which defines in which layer the image is drawn.
   * @param {number} reproductionCountX - This number counts how many times the background images are drawn on the y-axis. The higher this number the longer the level. It is defined in level1.js/backgroundReproductionCountX.
   */
  createGround(imagePath, layerNumberForImage, reproductionCountX) {
    const imagePathForLayer = `img/5_background/layers/${imagePath}/${layerNumberForImage}.png`;
    this.level.backgroundObjects.push(new BackgroundObject(imagePathForLayer, (reproductionCountX - 1) * 719));
  }

  /**
   * This function starts all the drawing on the canvas. The translate function is used to simulate the camera movement. The part around requestAnimationFrame executes the function as often as the graphics chip allows it.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.coins);
    this.addRectanglesToMap(this.rectanglesCollision.rectangleCharacter);
    this.addRectanglesToMap(this.rectanglesCollision.rectanglesEnemies);
    this.addRectanglesToMap(this.rectanglesCollision.rectanglesCoins);


    this.ctx.translate(-this.camera_x, 0);

    let self = this;
    requestAnimationFrame(() => {
      self.draw();
    });
  }

  /**
   * This function adds different objects to the canvas.
   * @param {object} objects - All kind of objects such as the character, enemies or background objects.
   */
  addObjectsToMap(objects) {
    objects.forEach((object) => {
      this.addToMap(object);
    });
  }

  /**
   * This function actually draws on the canvas. It also flips the image if the character or any other object moves in the opposite direction.
   *
   * @param {object} movableObject - All kind of objects such as the character, enemies or background objects.
   */
  addToMap(movableObject) {
    if (movableObject.otherDirection) {
      this.flipImage(movableObject);
    }
    this.ctx.drawImage(movableObject.img, movableObject.x, movableObject.y, movableObject.width, movableObject.height);

    if (movableObject.otherDirection) {
      this.flipImageBack(movableObject);
    }
  }

  addRectanglesToMap(rectangles) {
    rectangles.forEach(rectangle => {
      this.addRectangleToMap(rectangle);
    });
  }
  
  addRectangleToMap(rectanglesCollision) {
    this.ctx.beginPath();
    this.ctx.rect(rectanglesCollision.x, rectanglesCollision.y, rectanglesCollision.width, rectanglesCollision.height);
    this.ctx.lineWidth = 5;  // Set the width of the stroke
    this.ctx.strokeStyle = 'blue';  // Set the color of the stroke
    this.ctx.stroke();  // Draw the rectangle outline
    this.ctx.closePath();
  }
  

  /**
   * This function flips the image in case the player moves its character to the left side of the screen.
   *
   * @param {object} movableObject - All kind of objects such as the character, enemies or background objects.
   */
  flipImage(movableObject) {
    this.ctx.save(); //All properties of ctx(context) are saved.
    this.ctx.translate(movableObject.width, 0); //movableObject is inserted flipsided.
    this.ctx.scale(-1, 1); //Element is moved for its own width on the y-axis.
    movableObject.x = movableObject.x * -1; //x-coordinate is mirrored.
  }

  /**
   * This function flips the image back in case the player moves its character to the right side of the screen
   *
   * @param {object} movableObject - All kind of objects such as the character, enemies or background objects.
   */
  flipImageBack(movableObject) {
    movableObject.x = movableObject.x * -1;
    this.ctx.restore();
  }

  clearAllIntervals() {
    for (const category in this.intervals) {
      const categoryIntervals = this.intervals[category];

      for (const intervalName in categoryIntervals) {
        const intervalId = categoryIntervals[intervalName];

        if (intervalId !== null) {
          clearInterval(intervalId);
          categoryIntervals[intervalName] = null;
        }
      }
    }
  }
}
