class ScriptLevel1 {
  character;
  enemies;
  intervalIdsScript = [];

  triggerPoints = [
    {
      xCoordinate: 300,
      triggered: false,
      action: () => {
        this.createNewChicken(this.triggerPoints[0].xCoordinate + 500);
        this.createNewChicken(this.triggerPoints[0].xCoordinate + 1000);
        this.createNewChicken(this.triggerPoints[0].xCoordinate + 1100);
      },
    },
    {
      xCoordinate: 1500,
      triggered: false,
      action: () => {
        this.createNewChickenSmall(this.triggerPoints[1].xCoordinate + 500);
        this.createNewChickenSmall(this.triggerPoints[1].xCoordinate + 1000);
        this.createNewChickenSmall(this.triggerPoints[1].xCoordinate + 1100);
      },
    },
    {
      xCoordinate: 2800,
      triggered: false,
      action: () => {
        this.createNewChicken(this.triggerPoints[2].xCoordinate + 500);
        this.createNewChickenSmallFlying(this.triggerPoints[2].xCoordinate + 500, 150);
        this.createNewChickenSmall(this.triggerPoints[2].xCoordinate + 1000);
      },
    },
    {
      xCoordinate: 3800,
      triggered: false,
      action: () => {
        this.createNewChicken(this.triggerPoints[3].xCoordinate + 500);
        this.createNewChickenSmallFlying(this.triggerPoints[3].xCoordinate + 500, 200);
        this.createNewChicken(this.triggerPoints[3].xCoordinate + 600);
        this.createNewChickenSmallFlying(this.triggerPoints[3].xCoordinate + 600, 250);
        this.createNewChickenSmall(this.triggerPoints[3].xCoordinate + 800);
      },
    },
    {
      xCoordinate: 5000,
      triggered: false,
      action: () => {
        this.createNewChicken(this.triggerPoints[4].xCoordinate + 500);
        this.createNewChickenSmallFlying(this.triggerPoints[4].xCoordinate + 500, 150);
        this.createNewChicken(this.triggerPoints[4].xCoordinate + 600);
        this.createNewChickenSmallFlying(this.triggerPoints[4].xCoordinate + 600, 200);
        this.createNewChickenSmallFlying(this.triggerPoints[4].xCoordinate + 700, 250);
        this.createNewChickenSmall(this.triggerPoints[4].xCoordinate + 750);
        this.createNewChicken(this.triggerPoints[4].xCoordinate + 800);
        this.createNewChicken(this.triggerPoints[4].xCoordinate + 850);
        this.createNewChickenSmall(this.triggerPoints[4].xCoordinate + 900);
      },
    },
    {
      xCoordinate: 6800,
      triggered: false,
      action: () => {
        this.startSequenceEndboss();
      },
    },
  ];

  constructor() {
    checkWorldExistence().then(() => {
      this.character = world.character;
      this.enemies = world.level.enemies;
      this.startScript();
    });
  }

  startScript() {
    setInterval(() => {
      const characterX = world.character.x;

      this.triggerPoints.forEach((triggerPoint) => {
        if (characterX > triggerPoint.xCoordinate && !triggerPoint.triggered) {
          triggerPoint.action();
          triggerPoint.triggered = true;
        }
      });
    }, 200);
  }

  startSequenceEndboss() {
    this.freezeCamera();
    this.setEndLevelLeft();
    this.deleteAllUnusedObjects();
    this.sequenceEndbossAppears();
    this.createStatusbarEndboss();
  }

  freezeCamera() {
    clearInterval(world.character.individualIntervalIds.cameraMoveInterval);
  }

  setEndLevelLeft() {
    world.character.endLevelReached(6440);
  }

  deleteAllUnusedObjects() {
    world.level.enemies = [];
    world.collision.rectanglesEnemies = [];
    world.level.bottles = [];
    world.collision.rectanglesBottles = [];
    world.level.coins = [];
    world.collision.rectanglesCoins = [];
  }

  sequenceEndbossAppears() {
    this.createEndboss(this.triggerPoints[5].xCoordinate + 400);
    this.executeForTime(this.moveLeft, 40, 2000);
    this.executeForTime(this.walkingAnimation, 100, 2000);
    setTimeout(() => {
      this.sequenceEndbossAngry();
    }, 2000);
  }

  sequenceEndbossAngry() {
    setInterval(() => {
      this.alertAnimation();
    }, 200);
    setTimeout(() => {
      this.sequenceJumpAttack();
    }, 2000);
  }

  sequenceJumpAttack() {
    this.createNewBottles(1);
    this.attackAnimation();
    this.startJumpAttack();
  }

  startJumpAttack() {
    if (world.character.health <= 0) {
      return;
    }
    if (world.level.enemies[0].health <= 0) {
      this.stopAnimationAttack()
      this.sequenceEndbossHurt();
      return;
    }

    if (!world.level.enemies[0].otherDirection && world.level.enemies[0].x > 6300) {
      world.level.enemies[0].jump();
      this.executeForTime(this.moveLeft, 40, 1500);
      setTimeout(() => {
        this.startJumpAttack();
      }, 2000);
    } else {
      world.level.enemies[0].otherDirection = true;
      if (world.level.enemies[0].otherDirection && world.level.enemies[0].x < 7300) {
        world.level.enemies[0].jump();
        this.executeForTime(this.moveRight, 40, 1500);
        setTimeout(() => {
          this.startJumpAttack();
        }, 2000);
      } else {
        world.level.enemies[0].otherDirection = false;
        this.createNewBottles(3);
        this.startJumpAttack();
      }
    }
  }

  stopAnimationAttack() {
    clearInterval(world.level.enemies[0].individualIntervalIds.attackAnimationEndboss[0]);
  }

  sequenceEndbossHurt() {
    this.executeForTime(this.hurtAnimation, 100, 2000);
  }

  moveLeft() {
    world.level.enemies[0].moveLeft();
  }

  moveRight() {
    world.level.enemies[0].moveRight();
  }

  walkingAnimation() {
    world.level.enemies[0].walkingAnimation();
  }

  alertAnimation() {
    world.level.enemies[0].alertAnimation();
  }

  attackAnimation() {
    world.level.enemies[0].attackAnimation();
  }

  hurtAnimation() {
    world.level.enemies[0].hurtAnimation();
  }

  createNewChicken(xPosition) {
    world.level.enemies.push(new Chicken(xPosition));
    world.collision.rectanglesEnemies = world.level.enemies.map((enemy) => new RectangleEnemy(enemy));
  }

  createNewChickenSmall(xPosition) {
    world.level.enemies.push(new ChickenSmall(xPosition));
    world.collision.rectanglesEnemies = world.level.enemies.map((enemy) => new RectangleEnemy(enemy));
  }

  createNewChickenSmallFlying(xPosition, yPosition) {
    world.level.enemies.push(new ChickenSmallFlying(xPosition, yPosition));
    world.collision.rectanglesEnemies = world.level.enemies.map((enemy) => new RectangleEnemy(enemy));
  }

  createEndboss(xPosition) {
    world.level.enemies.push(new Endboss(xPosition));
    world.collision.rectanglesEnemies = world.level.enemies.map((enemy) => new RectangleEnemy(enemy));
  }

  createStatusbarEndboss() {
    world.statusbars.push(new StatusbarHealthEndboss());
  }

  createNewBottles(amountOfBottles) {
    for (let i = 0; i < amountOfBottles; i++) {
      if (world.level.bottles.length + world.character.bottlesCollected <= 3) {
        const xPosition = this.getRandomPositionBottle();
        world.level.bottles.push(new Bottle(xPosition));
        world.collision.rectanglesBottles = world.level.bottles.map((bottle) => new RectangleBottle(bottle));
      }
    }
  }

  getRandomPositionBottle() {
    return Math.floor(Math.random() * (6800 - 6300 + 1)) + 6500;
  }

  executeForTime(func, interval, duration) {
    const intervalId = setInterval(() => {
      func();
    }, interval);
    setTimeout(() => clearInterval(intervalId), duration);
  }
}
