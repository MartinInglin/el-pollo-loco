class RectanglesCollision {
  rectangleCharacter = [new RectangleCharacter()];
  rectanglesEnemies = level1.enemies.map((enemy) => new RectangleEnemy(enemy));
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
      this.isCollidingEnemy();
      this.isCollidingCoin();
      this.isCollidingBottle();
      this.enemyIsCollidingBottle();
      this.bottleIsCollidingGround();
    }, 40);
    this.intervalIdsRectanglesCollision.push(id);
  }

  /**
   * This function checks if the character is colliding with an enemy. It also checks if the character is above ground and if the character is moving towards the ground.
   */
  isCollidingEnemy() {
    this.rectanglesEnemies.forEach((enemy) => {
      if (
        world.character.isAboveGround() &&
        this.isCollidingObject("rectangleCharacter", enemy) &&
        world.character.speedY < 0
      ) {
        enemy.enemy.health = 0;
        this.destroyRectangle(enemy, "rectanglesEnemies");
        world.character.miniJump();
      } else if (this.isCollidingObject("rectangleCharacter", enemy)) {
        this.characterIsHurt();
        this.characterIsDead();
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
  isCollidingCoin() {
    this.rectanglesCoins.forEach((coin) => {
      if (this.isCollidingObject("rectangleCharacter", coin)) {
        coin.coin.health = 0;
        if (world.character.coinsCollected < 5) {
          world.character.coinsCollected += 1;
        }
        this.destroyRectangle(coin, "rectanglesCoins");
      }
    });
  }

  isCollidingBottle() {
    this.rectanglesBottles.forEach((bottle) => {
      if (this.isCollidingObject("rectangleCharacter", bottle) && world.level.throwableBottles.length < 5) {
        bottle.bottle.health = 0;
        world.level.throwableBottles.push(new BottleTrowable());
        world.character.bottlesCollected = world.level.throwableBottles.length;
        world.character.previousBottlesCount = world.level.throwableBottles.length;
        this.destroyRectangle(bottle, "rectanglesBottles");
      }
    });
  }

  enemyIsCollidingBottle() {
    if (this.rectanglesBottlesThrowable.length > 0) {
      this.rectanglesEnemies.forEach((enemy) => {
        if (this.rectanglesBottlesThrowable[0] && this.isCollidingObject("rectanglesBottlesThrowable", enemy)) {
          world.level.throwableBottles[0].bottleHitsEnemy = true;
          enemy.enemy.health = 0;
          this.destroyRectangle(enemy, "rectanglesEnemies");
          this.destroyRectangle(this.rectanglesBottlesThrowable[0], "rectanglesBottlesThrowable");
        }
      });
    }
  }

  bottleIsCollidingGround() {
    if (this.rectanglesBottlesThrowable.length > 0) {
      this.rectanglesBottlesThrowable.forEach((bottle) => {
        if (!this.isAboveGround(bottle)) {
          this.destroyRectangle(bottle, "rectanglesBottlesThrowable")
      }
      });
    }
  }

  isAboveGround(object) {
    return object.y + object.height - 30 < 440;
  }

  destroyRectangle(object, path) {
    const index = this[path].indexOf(object);
    if (index !== -1) {
      object.stopIntervals();
      this[path].splice(index, 1);
    }
  }

  isCollidingObject(object1, object2) {
    return (
      this[object1][0].x < object2.x + object2.width &&
      this[object1][0].x + this.rectangleCharacter[0].width > object2.x &&
      this[object1][0].y < object2.y + object2.height &&
      this[object1][0].y + this.rectangleCharacter[0].height > object2.y
    );
  }

  /**
   * This function stops alle the intervals of the rectangles.
   */
  stopIntervalsCollsion() {
    this.intervalIdsRectanglesCollision.forEach(clearInterval);
  }
}
