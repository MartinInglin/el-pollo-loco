class RectanglesCollision {
  rectangleCharacter = [new RectangleCharacter()];
  rectanglesEnemies = level1.enemies.map((enemy) => new RectangleEnemy(enemy));
  rectanglesCoins = level1.coins.map((coin) => new RectangleCoin(coin));
  rectanglesBottles = level1.bottles.map((bottle) => new RectangleBottle(bottle));
  collisonDetected = false;
  hurtTimeout = null;
  intervalIdsRectanglesCollision = [];

  constructor() {
    checkWorldExistence().then(() => {
      this.checkCollisions();
    });
  }

  checkCollisions() {
    let id = setInterval(() => {
      this.isCollidingEnemy();
      this.isCollidingCoin();
      this.isCollidingBottle();
    }, 40);
    this.intervalIdsRectanglesCollision.push(id);
  }

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

  destroyRectangleEnemy(enemy) {
    const index = world.rectanglesCollision.rectanglesEnemies.indexOf(enemy);
    if (index !== -1) {
        world.rectanglesCollision.rectanglesEnemies.splice(index, 1);
    }
}

  isCollidingCoin() {
    this.rectanglesCoins.forEach((coin) => {
      if (this.isCollidingObject(coin)) {
        coin.coin.health = 0;
          world.character.coinsCollected += 1;
        this.destroyRectangleCoin(coin);
      }
    });
  }

  destroyRectangleCoin(coin) {
    const index = world.rectanglesCollision.rectanglesCoins.indexOf(coin);
    if (index !== -1) {
        world.rectanglesCollision.rectanglesCoins.splice(index, 1);
    }
  }

  isCollidingBottle() {
    this.rectanglesBottles.forEach((bottle) => {
      if (this.isCollidingObject(bottle) && world.character.bottlesCollected < 5) {
        bottle.bottle.health = 0;
          world.character.bottlesCollected += 1;
        this.destroyRectangleBottle(bottle);
      }
    });
  }

  destroyRectangleBottle(bottle) {
    const index = world.rectanglesCollision.rectanglesBottles.indexOf(bottle);
    if (index !== -1) {
        world.rectanglesCollision.rectanglesBottles.splice(index, 1);
    }
  }

  isCollidingObject(object) {
    return (
      this.rectangleCharacter[0].x < object.x + object.width &&
      this.rectangleCharacter[0].x + this.rectangleCharacter[0].width > object.x &&
      this.rectangleCharacter[0].y < object.y + object.height &&
      this.rectangleCharacter[0].y + this.rectangleCharacter[0].height > object.y
    );
  }

  characterIsHurt() {
    if (!this.collisionDetected) {
      this.collisionDetected = true;

      world.character.health -= 20;

      this.hurtTimeout = setTimeout(() => {
        this.collisionDetected = false;
      }, 1000);
    }
  }

  characterIsDead() {
    if (world.character.health < 20) {
      world.stopAllIntervals();
    }
  }

  stopIntervalsCollsion() {
    this.intervalIdsRectanglesCollision.forEach(clearInterval);
  }
}
