class Script {
  /**
   * This function resets the health of the enboss to 100;
   */
  resetHealthEndboss() {
    this.endboss.health = 100;
  }

  /**
   * This function resets the statusbar of the endboss.
   *
   * @param {string} color - This string refers to the statusbars in the "StatusbarHealthEndboss" class. It can be "imagesGreen", "imagesBlue" or "imagesOrange".
   */
  resetStatusbar(color) {
    world.statusbars[3].actualStatusbar = world.statusbars[3][color];
  }

  /**
   * This function moves the endboss to the left.
   */
  endbossMoveLeft() {
    this.endboss.moveLeft();
  }

  /**
   * This function moves the endboss to the right.
   */
  endbossMoveRight() {
    this.endboss.moveRight();
  }

  /**
   * This function executes the walking animation of the endboss.
   */
  endbossWalkingAnimation() {
    this.endboss.walkingAnimation();
  }

  /**
   * This function executes the alert animation of the endboss.
   */
  endbossAlertAnimation() {
    this.endboss.alertAnimation();
  }

  /**
   * This function executes the attacking animation of the endboss.
   */
  endbossAttackAnimation() {
    this.endboss.attackAnimation();
  }

  /**
   * This function executes the hurt animation of the endboss.
   */
  endbossHurtAnimation() {
    this.endboss.hurtAnimation();
  }

  /**
   * This function resets the hurt animation by setting the index to 0.
   */
  resetEndbossHurtAnimation() {
    this.endboss.currentImageIndices.hurt = 0;
  }

  /**
   * This function executes the dying animation of the endboss.
   */
  endbossDieAnimation() {
    this.endboss.dieAnimation();
  }

  /**
   * This funciton creates a new chicken with its corresponding rectangle on x an y position.
   *
   * @param {number} xPosition - x axis
   * @param {number} yPosition - y axis
   */
  createNewChicken(xPosition, yPosition) {
    world.level.enemies.push(new Chicken(xPosition, yPosition));
    world.collision.rectanglesEnemies = world.level.enemies.map((enemy) => new RectangleEnemy(enemy));
  }

  /**
   *  This funciton creates a new small chicken with its corresponding rectangle on x an y position.
   *
   * @param {*} xPosition - x axis
   */
  createNewChickenSmall(xPosition) {
    world.level.enemies.push(new ChickenSmall(xPosition));
    world.collision.rectanglesEnemies = world.level.enemies.map((enemy) => new RectangleEnemy(enemy));
  }

  /**
   * This funciton creates a new small flying chicken with its corresponding rectangle on x an y position.
   *
   * @param {number} xPosition - x axis
   * @param {number} yPosition - y axis
   */
  createNewChickenSmallFlying(xPosition, yPosition) {
    world.level.enemies.push(new ChickenSmallFlying(xPosition, yPosition));
    world.collision.rectanglesEnemies = world.level.enemies.map((enemy) => new RectangleEnemy(enemy));
  }

  /**
   * This fuction creates a new endboss.
   *
   * @param {number} xPosition - x axis
   */
  createEndboss(xPosition) {
    world.level.endboss.push(new Endboss(xPosition));
    world.collision.rectangleEndboss = world.level.endboss.map((enemy) => new RectangleEnemy(enemy));
    this.endboss = world.level.endboss[0];
  }

  /**
   * This function creates the statusbar for the endboss.
   */
  createStatusbarEndboss() {
    world.statusbars.push(new StatusbarHealthEndboss());
  }

  /**
   * This function creates a new bottle which the player can pick up.
   *
   * @param {number} amountOfBottles - The maximum amount of bottles that are created.
   */
  createNewBottles(amountOfBottles) {
    for (let i = 0; i < amountOfBottles; i++) {
      if (world.level.bottles.length + world.character.bottlesCollected <= 3) {
        const xPosition = this.getRandomPositionBottle();
        world.level.bottles.push(new Bottle(xPosition));
        world.collision.rectanglesBottles = world.level.bottles.map((bottle) => new RectangleBottle(bottle));
      }
    }
  }

  /**
   * This fuction finds a random position where a new bottle is spawned.
   *
   * @returns - number between 6500 and 7000.
   */
  getRandomPositionBottle() {
    return Math.floor(Math.random() * (6800 - 6300 + 1)) + 6500;
  }

  /**
   * This function deletes all the chicken which are not on the canvas. Just to save CPU power.
   */
  deleteChickenNotOnCanvas() {
    world.collision.rectanglesEnemies.forEach((enemy) => {
      if (enemy.x < 6000) {
        enemy.enemy.health = 0;
        world.collision.destroyRectangle(enemy, "rectanglesEnemies");
      }
    });
  }

  /**
   * This function executes a function for a certain amount of time. The .bind is needed to transmit "this" to the function that is executed.
   *
   * @param {function} func - The function that needs to be executed.
   * @param {number} interval - Time after which the function is reexecuted.
   * @param {number} duration - Time after which the execution ends.
   */
  executeForTime(func, interval, duration) {
    const boundFunc = func.bind(this);
    const intervalId = setInterval(() => {
      boundFunc();
    }, interval);
    this.setStoppableTimeout(() => clearInterval(intervalId), duration);
  }

  /**
   *This function sets a stoppable timeout. It stores the id so it can be cleared. This is neede in the last endboss fight, because the fight should stop immediately.
   * 
   * @param {function} func - The function that needs to be executed.
   * @param {number} duration - Time after which the execution ends.
   */
  setStoppableTimeout(func, duration) {
    const timeoutId = setTimeout(() => {
      func();
      const index = this.timeoutIds.indexOf(timeoutId);
      if (index !== -1) {
        this.timeoutIds.splice(index, 1);
      }
    }, duration);

    this.timeoutIds.push(timeoutId);
  }

  /**
   * This function clears all timeouts that are set in the function above.
   */
  clearAllTimeouts() {
    this.timeoutIds.forEach((timeoutId) => clearTimeout(timeoutId));
    this.timeoutIds = [];
  }
}
