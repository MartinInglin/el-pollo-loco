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
    }, 200);
    this.intervalIdsRectanglesCollision.push(id);
  }

  isCollidingEnemy() {
    this.rectanglesEnemies.forEach((enemy) => {
      if (this.isCollidingObject(enemy)) {
        this.characterIsHurt();
      }
    });
  }

  isCollidingCoin() {
    this.rectanglesCoins.forEach((coin) => {
      if (this.isCollidingObject(coin)) {
      }
    });
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
      console.log(world.character.health);
  
      this.hurtTimeout = setTimeout(() => {
        this.collisionDetected = false;
      }, 1000);
    }
  }

  stopIntervalsCollsion() {
    this.intervalIdsRectanglesCollision.forEach(clearInterval);
  }
  
}
