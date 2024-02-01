class Collision {
  rectangleCharacter = [new RectangleCharacter()];
  rectanglesEnemies = [];
  rectangleEndboss = [];
  rectanglesCoins = level1.coins.map((coin) => new RectangleCoin(coin));
  rectanglesBottles = level1.bottles.map((bottle) => new RectangleBottle(bottle));
  rectanglesBottlesThrowable = [];
  collisonDetected = false;
  hurtTimeout = null;
  intervalIdsRectanglesCollision = [];

  constructor() {
    checkWorldExistence().then(() => {
      this.checkCollisions();
    });
  }

  /**
   * This function sets the interval for all collisions between objects.
   */
  checkCollisions() {
    let id = setInterval(() => {
      this.characterIsCollidingEnemy();
      this.characterIsCollidingCoin();
      this.characterIsCollidingBottle();
      this.characterIsCollidingEndboss();
      this.enemyIsCollidingBottle();
      this.enbossIsCollidingBottle();
      this.bottleIsCollidingGround();
      this.enemyLeavesCanvas(-100);
    }, 40);
    this.intervalIdsRectanglesCollision.push(id);
  }

  /**
   * This function checks if the character is colliding with an enemy. It also checks if the character is above ground and if the character is moving towards the ground.
   */
  characterIsCollidingEnemy() {
    const characterRect = this.rectangleCharacter[0];

    this.rectanglesEnemies.forEach((enemy) => {
      if (
        world.character.isAboveGround() &&
        this.isCollidingObject(characterRect, enemy) &&
        world.character.speedY < 0 &&
        !enemy.enemy.isFlying
      ) {
        this.destroyRectangle(enemy, "rectanglesEnemies");
        enemy.enemy.health = 0;
        world.character.miniJump();
      } else if (this.isCollidingObject(characterRect, enemy)) {
        this.characterIsHurt();

      }
    });
  }

  characterIsCollidingEndboss() {
    const characterRect = this.rectangleCharacter[0];

    this.rectangleEndboss.forEach((enemy) => {
      if (this.isCollidingObject(characterRect, enemy)) {
        this.characterIsHurt();
        return;
      }
    });
  }

  /**
   * This function subtracts -20 from the characters health and sets a timeout so the player can move away from the enemy.
   */
  characterIsHurt() {
    if (!this.collisionDetected) {
      this.collisionDetected = true;

      world.character.health -= 20;

      this.hurtTimeout = setTimeout(() => {
        this.collisionDetected = false;
        this.characterIsDead();
      }, 1000);
    }
  }

  /**
   * This function stops all intervals if the characters health is 0 or below. In fact this results in stopping the game.
   */
  characterIsDead() {
    if (world.character.health < 20) {
      world.stopAllIntervals();
    }
  }

  /**
   * This function checks if the character is colliding with a coin. If so it counts plus 1 on "world.character.coinsCollected" and destroys the rectangle of the coin. The player can only collect 5 coins.
   */
  characterIsCollidingCoin() {
    const characterRect = this.rectangleCharacter[0];

    this.rectanglesCoins.forEach((coin) => {
      if (this.isCollidingObject(characterRect, coin)) {
        coin.coin.health = 0;
        if (world.character.coinsCollected < 5) {
          world.character.coinsCollected += 1;
        }
        this.destroyRectangle(coin, "rectanglesCoins");
      }
    });
  }

  /**
   * This function checks if the character is colliding with a bottle. If so it destroys the bottle and creates a new object BottleThrowable and resets the variables bottlesCollected and previousBottlesCount in the character.
   */
  characterIsCollidingBottle() {
    const characterRect = this.rectangleCharacter[0];

    this.rectanglesBottles.forEach((bottle) => {
      if (this.isCollidingObject(characterRect, bottle) && world.level.throwableBottles.length < 5) {
        bottle.bottle.health = 0;
        world.level.throwableBottles.push(new BottleThrowable());
        world.character.bottlesCollected = world.level.throwableBottles.length;
        world.character.previousBottlesCount = world.level.throwableBottles.length;
        this.destroyRectangle(bottle, "rectanglesBottles");
      }
    });
  }

  /**
   * This functoin checks if an enemy is colliding with a thrown bottle. If so it destroys the enemy and the bottle and their corresponding rectangles.
   */
  enemyIsCollidingBottle() {
    if (this.rectanglesBottlesThrowable.length > 0) {
      const bottleRect = this.rectanglesBottlesThrowable[0];
      this.rectanglesEnemies.forEach((enemy) => {
        if (this.isCollidingObject(bottleRect, enemy)) {
          world.level.throwableBottles[0].bottleHitsEnemy = true;
          this.destroyRectangle(bottleRect, "rectanglesBottlesThrowable");
          if (enemy.enemy instanceof Endboss) {
            enemy.enemy.health -= 20;
          } else {
            enemy.enemy.health = 0;
            this.destroyRectangle(enemy, "rectanglesEnemies");
          }
        }
      });
    }
  }

  enbossIsCollidingBottle() {
    if (this.rectanglesBottlesThrowable.length > 0) {
      const bottleRect = this.rectanglesBottlesThrowable[0];
      this.rectangleEndboss.forEach((enemy) => {
        if (this.isCollidingObject(bottleRect, enemy)) {
          world.level.throwableBottles[0].bottleHitsEnemy = true;
          this.destroyRectangle(bottleRect, "rectanglesBottlesThrowable");
          enemy.enemy.health -= 20;
          this.destroyRectangle(enemy, "rectanglesEnemies");
        }
      });
    }
  }

  /**
   * This function checks if the trown bottle is colliding with the ground. If so it destroys the rectangle of the bottle.
   */
  bottleIsCollidingGround() {
    if (this.rectanglesBottlesThrowable.length > 0) {
      this.rectanglesBottlesThrowable.forEach((bottle) => {
        if (!this.isAboveGround(bottle)) {
          this.destroyRectangle(bottle, "rectanglesBottlesThrowable");
        }
      });
    }
  }

  /**
   * This function checks if an object is above the ground.
   *
   *
   * @param {object} object - Contains the object which is checked.
   * @returns - boolean
   */
  isAboveGround(object) {
    return object.y + object.height < 440;
  }

  /**
   * This function checks if an enemy has left the canvas on the left side. If so it calls for stopping the intervals and deleting the object.
   */
  enemyLeavesCanvas(endCanvasLeft) {
    this.rectanglesEnemies.forEach((enemy) => {
      if (enemy.x < endCanvasLeft) {
        this.destroyRectangle(enemy, "rectanglesEnemies");
      }
    });
  }

  /**
   * This function stops all the intervals of an object and then destroys its rectangle.
   *
   * @param {object} object - The object is any rectangle.
   * @param {string} path - String of the path where the rectanlge is located (for example "rectanglesEnemies").
   */
  destroyRectangle(object, path) {
    const index = this[path].indexOf(object);
    if (index !== -1) {
      object.stopIntervalsMovableObjects();
      this[path].splice(index, 1);
    }
  }

  /**
   * This function checks if two objects are colliding.
   *
   * @param {object} object1 - The first object of the collision.
   * @param {object} object2 - The second object of the collision.
   * @returns - boolean
   */
  isCollidingObject(object1, object2) {
    return (
      object1.x < object2.x + object2.width &&
      object1.x + object1.width > object2.x &&
      object1.y < object2.y + object2.height &&
      object1.y + object1.height > object2.y
    );
  }

  /**
   * This function stops alle the intervals of the rectangles.
   */
  stopIntervalsCollsion() {
    this.intervalIdsRectanglesCollision.forEach(clearInterval);
  }
}
