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
    }, 40);
    this.intervalIdsRectanglesCollision.push(id);
  }

  /**
   * This function checks if the character is colliding with an enemy. It also checks if the character is above ground and if the character is moving towards the ground.
   */
  isCollidingEnemy() {
    this.rectanglesEnemies.forEach((enemy) => {
      if (world.character.isAboveGround() && this.isCollidingObject(enemy) && world.character.speedY < 0) {
        enemy.enemy.health = 0;
        this.destroyRectangleEnemy(enemy);
        world.character.miniJump();
      } else if (this.isCollidingObject(enemy)) {
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
   * This function destroys the rectangle around the enemy by finding its position in the array "world.rectanglesCollision.rectanglesEnemies". It is needed because otherwise the player would still loose health if he hits the invisible rectangle of the enemy.
   * 
   * @param {object} enemy - Object that contains all information about the enemy.
   */
  destroyRectangleEnemy(enemy) {
    const index = world.rectanglesCollision.rectanglesEnemies.indexOf(enemy);
    if (index !== -1) {
      world.rectanglesCollision.rectanglesEnemies.splice(index, 1);
    }
  }

  /**
   * This function checks if the character is colliding with a coin. If so it counts plus 1 on "world.character.coinsCollected" and destroys the rectangle of the coin. The player can only collect 5 coins.
   */
  isCollidingCoin() {
    this.rectanglesCoins.forEach((coin) => {
      if (this.isCollidingObject(coin)) {
        coin.coin.health = 0;
        if (world.character.coinsCollected < 5) {
          world.character.coinsCollected += 1;
        }
        this.destroyRectangleCoin(coin);
      }
    });
  }

  /**
   * This function destroys the rectangle around the coin by finding its position in the array "world.rectanglesCollision.rectanglesCoins". It is needed because otherwise the player could still collect coins if he hits the invisible rectangle of the coin.
   * 
   * @param {object} coin - Object that contains all information about the coin.
   */
  destroyRectangleCoin(coin) {
    const index = world.rectanglesCollision.rectanglesCoins.indexOf(coin);
    if (index !== -1) {
      world.rectanglesCollision.rectanglesCoins.splice(index, 1);
    }
  }

  isCollidingBottle() {
    this.rectanglesBottles.forEach((bottle) => {
      if (this.isCollidingObject(bottle) && world.level.throwableBottles.length < 5) {
        bottle.bottle.health = 0;
        world.level.throwableBottles.push(new BottleTrowable());
        world.character.bottlesCollected = world.level.throwableBottles.length;
        world.character.previousBottlesCount = world.level.throwableBottles.length;
        this.destroyRectangleBottle(bottle);
      }
    });
  }

  /**
   * This function destroys the rectangle around the bottle by finding its position in the array "world.rectanglesCollision.rectanglesBottles". It is needed because otherwise the player could still collect bottles if he hits the invisible rectangle of the bottle.
   * 
   * @param {object} bottle - Object that contains all information about the bottle.
   */
  destroyRectangleBottle(bottle) {
    const index = world.rectanglesCollision.rectanglesBottles.indexOf(bottle);
    if (index !== -1) {
      world.rectanglesCollision.rectanglesBottles.splice(index, 1);
    }
  }

  /**
   * This function checks if any kind of object is colliding with the rectangle of the character.
   * 
   * @param {object} object - Contains all the relevant information about the object.
   * @returns - boolean
   */
  isCollidingObject(object) {
    return (
      this.rectangleCharacter[0].x < object.x + object.width &&
      this.rectangleCharacter[0].x + this.rectangleCharacter[0].width > object.x &&
      this.rectangleCharacter[0].y < object.y + object.height &&
      this.rectangleCharacter[0].y + this.rectangleCharacter[0].height > object.y
    );
  }

  /**
   * This function stops alle the intervals of the rectangles.
   */
  stopIntervalsCollsion() {
    this.intervalIdsRectanglesCollision.forEach(clearInterval);
  }
}
