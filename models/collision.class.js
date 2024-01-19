class RectanglesCollision {
  rectangleCharacter;
  rectanglesEnemies;
  rectanglesCoins;
  collisonDetected = false;
  hurtTimeout = null;
  intervalIdsRectanglesCollision = [];

  constructor() {
    this.rectangleCharacter = [new RectangleCharacter()];
    this.rectanglesEnemies = level1.enemies.map((enemy) => new RectangleEnemy(enemy));
    this.rectanglesCoins = level1.coins.map((coin) => new RectangleCoin(coin));

    checkWorldExistence().then(() => {
      this.checkCollisions();
    });
  }

  checkCollisions() {
    let id = setInterval(() => {
      this.isCollidingEnemy();
      this.isCollidingCoin();
    }, 40);
    this.intervalIdsRectanglesCollision.push(id);
  }

  isCollidingEnemy() {
    this.rectanglesEnemies.forEach((enemy) => {
      if (world.character.isAboveGround() && this.isCollidingObject(enemy) && world.character.speedY < 0) {
        enemy.enemy.health = 0;
        this.destroyRectangleEnemy(enemy);
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
