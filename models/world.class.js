class World {
  keyboard = new Keyboard();
  character = new Character(this.keyboard);
  canvas;
  ctx;
  camera_x = 0;
  level = new Level(level1);
  collision = new Collision();
  statusbars = [new StatusbarHealthCharacter(), new StatusbarCoins(), new StatusbarBottles()];

  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.draw();
  }

  /**
   * This function starts all the drawing on the canvas. The translate function is used to simulate the camera movement. The part around requestAnimationFrame executes the function as often as the graphics chip allows it.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.level.backgroundObjects);

    this.addToMap(this.character);

    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.endboss);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.throwableBottles);

    this.addRectanglesCollisionToMap(this.collision.rectangleCharacter);
    this.addRectanglesCollisionToMap(this.collision.rectanglesEnemies);
    this.addRectanglesCollisionToMap(this.collision.rectangleEndboss);
    this.addRectanglesCollisionToMap(this.collision.rectanglesCoins);
    this.addRectanglesCollisionToMap(this.collision.rectanglesBottles);
    this.addRectanglesCollisionToMap(this.collision.rectanglesBottlesThrowable);

    this.ctx.translate(-this.camera_x, 0);

    this.addStatusbarsToMap(this.statusbars);

    //this.addObjectsToMap(this.endScreens)

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

  /**
   * This function initializes the drawing of the statusbars. It receives an array of of all the statusbars und passes each object of the array to the function "addStatusbarToMap()".
   *
   * @param {array} statusbars - This array contains all the objects of the statusbars.
   */
  addStatusbarsToMap(statusbars) {
    statusbars.forEach((statusbar) => {
      this.addStatusbarToMap(statusbar);
    });
  }

  /**
   * This function adds a statusbar to the canvas.
   *
   * @param {object} statusbar - This object contains all relevant parameters like x and y for drawing the statusbar.
   */
  addStatusbarToMap(statusbar) {
    this.ctx.drawImage(statusbar.img, statusbar.x, statusbar.y, statusbar.width, statusbar.height);
  }

  /**
   * This function add the rectangles to the map that are used for the collision.
   *
   * @param {array} rectangles - Contains the objects for the rectangles.
   */
  addRectanglesCollisionToMap(rectangles) {
    rectangles.forEach((rectangle) => {
      this.addRectangleCollisionToMap(rectangle);
    });
  }

  /**
   * This function draws the rectangle on the canvas.
   *
   * @param {object} rectangleCollision - The object of the rectangle that is drawn.
   */
  addRectangleCollisionToMap(rectangleCollision) {
    this.ctx.beginPath();
    this.ctx.rect(rectangleCollision.x, rectangleCollision.y, rectangleCollision.width, rectangleCollision.height);
    this.ctx.lineWidth = 0;
    this.ctx.strokeStyle = "transparent";
    this.ctx.stroke();
    this.ctx.closePath();
  }

  /**
   * This function stops all relevant Intervals of the game. Relevant means the player would notice if it keeps running. The function calls functions in the corresponding objects.
   */
  stopAllIntervals() {
    this.collision.stopIntervalsCollsion();

    const stopIntervalsMovableObjects = (movableObjects) => {
      movableObjects.forEach((object) => {
        if (object instanceof MovableObject) {
          object.stopIntervalsMovableObjects();
        }
      });
    };

    stopIntervalsMovableObjects([this.character, ...this.level.enemies, ...this.level.clouds]);
  }
}
