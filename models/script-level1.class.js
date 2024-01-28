class ScriptLevel1 {
  character;
  enemies;
  intervalIdsScript = [];
  endboss;
  timeoutIds = [];

  triggerPoints = [
    {
      xCoordinate: 300,
      triggered: false,
      action: () => {
        this.createNewChicken(this.triggerPoints[0].xCoordinate + 500, 370);
        this.createNewChicken(this.triggerPoints[0].xCoordinate + 1000, 370);
        this.createNewChicken(this.triggerPoints[0].xCoordinate + 1100, 370);
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
        this.createNewChicken(this.triggerPoints[2].xCoordinate + 500, 370);
        this.createNewChickenSmallFlying(this.triggerPoints[2].xCoordinate + 500, 150);
        this.createNewChickenSmall(this.triggerPoints[2].xCoordinate + 1000);
      },
    },
    {
      xCoordinate: 3800,
      triggered: false,
      action: () => {
        this.createNewChicken(this.triggerPoints[3].xCoordinate + 500, 370);
        this.createNewChickenSmallFlying(this.triggerPoints[3].xCoordinate + 500, 200);
        this.createNewChicken(this.triggerPoints[3].xCoordinate + 600, 370);
        this.createNewChickenSmallFlying(this.triggerPoints[3].xCoordinate + 600, 250);
        this.createNewChickenSmall(this.triggerPoints[3].xCoordinate + 800);
      },
    },
    {
      xCoordinate: 5000,
      triggered: false,
      action: () => {
        this.createNewChicken(this.triggerPoints[4].xCoordinate + 500, 370);
        this.createNewChickenSmallFlying(this.triggerPoints[4].xCoordinate + 500, 150);
        this.createNewChicken(this.triggerPoints[4].xCoordinate + 600, 370);
        this.createNewChickenSmallFlying(this.triggerPoints[4].xCoordinate + 600, 200);
        this.createNewChickenSmallFlying(this.triggerPoints[4].xCoordinate + 700, 250);
        this.createNewChickenSmall(this.triggerPoints[4].xCoordinate + 750);
        this.createNewChicken(this.triggerPoints[4].xCoordinate + 800, 370);
        this.createNewChicken(this.triggerPoints[4].xCoordinate + 850, 370);
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
    this.createStatusbarEndboss();
    this.endbossWalkInRight();
    setTimeout(() => {
      this.sequenceEndbossAngry();
    }, 2000);
    setTimeout(() => {
      this.sequenceJumpAttack();
    }, 4000);
  }

  endbossWalkInRight() {
    this.executeForTime(this.moveLeft, 40, 2000);
    this.executeForTime(this.walkingAnimation, 100, 2000);
  }

  sequenceEndbossAngry() {
    setInterval(() => {
      this.alertAnimation();
    }, 200);
  }

  sequenceJumpAttack() {
    this.createNewBottles(1);
    this.attackAnimation();
    this.startJumpAttack();
  }

  startJumpAttack() {
    if (this.characterDead()) {
      return;
    }

    if (this.endbossDefeated()) {
      this.launchFlyingSequence();
      return;
    }

    this.continueJumping();
  }

  characterDead() {
    return world.character.health <= 0;
  }

  endbossDefeated() {
    return world.level.enemies[0].health <= 0;
  }

  continueJumping() {
    if (!this.endboss.otherDirection && this.endboss.x > 6300) {
      this.endbossJumpAttack("left", this.moveLeft);
    } else {
      this.endboss.otherDirection = true;
      if (this.endboss.otherDirection && this.endboss.x < 7300) {
        this.endbossJumpAttack("right", this.moveRight);
      } else {
        this.endboss.otherDirection = false;
        this.createNewBottles(3);
        this.startJumpAttack();
      }
    }
  }

  endbossJumpAttack(direction, movementFunction) {
    this.endboss.jump();
    this.executeForTime(movementFunction, 40, 1500);
    setTimeout(() => {
      this.startJumpAttack();
    }, 2000);
  }

  launchFlyingSequence() {
    this.stopAnimationAttack();
    this.sequenceEndbossHurt();
    setTimeout(() => {
      this.sequenceFlyAttack();
    }, 2000);
  }

  stopAnimationAttack() {
    clearInterval(world.level.enemies[0].individualIntervalIds.attackAnimationEndboss[0]);
    world.level.enemies[0].individualIntervalIds.attackAnimationEndboss = [];
  }

  sequenceEndbossHurt() {
    this.executeForTime(this.hurtAnimation, 100, 2000);
  }

  sequenceFlyAttack() {
    this.attackAnimation();
    this.startFlying();
  }

  startFlying() {
    this.stopGravity();
    const id = setInterval(() => {
      if (world.level.enemies[0].y >= -50) {
        world.level.enemies[0].y -= 10;
      } else {
        this.resetHealthEndboss();
        this.resetStatusbar("imagesBlue");
        this.startFlyingAttack();
        clearInterval(id);
      }
    }, 100);
  }

  stopGravity() {
    clearInterval(world.level.enemies[0].individualIntervalIds.applyGravityEndboss[0]);
  }

  startFlyingAttack() {
    const elapsedTimeObj = { value: 0 };

    const intervalId = setInterval(() => {
      this.deleteChickenNotOnCanvas();

      if (this.characterDead()) {
        clearInterval(intervalId);
      }

      if (this.endbossDefeated()) {
        clearInterval(intervalId);
        this.launchShootingSequence();
      }

      this.continueFlying(elapsedTimeObj);
    }, 40);
  }

  continueFlying(elapsedTimeObj) {
    elapsedTimeObj.value += 40;

    if (!this.endboss.otherDirection && this.endboss.x > 6100) {
      this.moveLeft();
      this.handleChickenCreation(elapsedTimeObj);
    } else {
      this.endboss.otherDirection = true;
      if (this.endboss.otherDirection && this.endboss.x < 7300) {
        this.moveRight();
        this.handleChickenCreation(elapsedTimeObj);
      } else {
        this.endboss.otherDirection = false;
        this.createNewBottles(2);
      }
    }
  }

  handleChickenCreation(elapsedTimeObj) {
    if (elapsedTimeObj.value >= 2500 && this.endboss.x > 6600 && this.endboss.x < 7000) {
      this.createNewChicken(this.endboss.x, 100);
      elapsedTimeObj.value = 0;
    }
  }

  launchShootingSequence() {
    this.stopAnimationAttack();
    this.resetHurtAnimation();
    this.sequenceEndbossHurt();
    setTimeout(() => {
      this.executeForTime(this.endbossMoveOut, 10, 2000);
    }, 2000);
    setTimeout(() => {
      this.shootingSequence();
    }, 4000);
  }

  endbossMoveOut = () => {
    if (!world.level.enemies[0].otherDirection) {
      this.moveLeft();
    } else {
      this.moveRight();
    }
  };

  shootingSequence() {
    this.resetHealthEndboss();
    this.resetStatusbar("imagesOrange");
    this.checkEndbossDefeated();
    this.startShootingAttackRight();
  }

  startShootingAttackRight() {
    this.setEnbossPositionRight();
    this.moveInRight();
    this.shootBirds();
    this.setStoppableTimeout(() => this.moveOutRight(), 7000);
    this.setStoppableTimeout(() => this.switchToLeftSide(), 9000);
  }

  setEnbossPositionRight() {
    this.endboss.x = 7200;
    this.endboss.y = 170;
    this.endboss.otherDirection = false;
  }

  moveInRight() {
    this.executeForTime(
      () => {
        this.moveLeft();
      },
      100,
      1500
    );
  }

  moveOutRight() {
    this.executeForTime(
      () => {
        this.moveRight();
      },
      100,
      1500
    );
  }

  switchToLeftSide() {
    this.startShootingAttackLeft();
    this.createNewBottles(1);
  }

  startShootingAttackLeft() {
    this.setEndbossPositionLeft();
    this.moveInLeft();
    this.shootBirds();
    this.setStoppableTimeout(() => this.moveOutLeft(), 7000);
    this.setStoppableTimeout(() => this.switchToRightSide(), 9000);
  }

  setEndbossPositionLeft() {
    this.endboss.x = 6100;
    this.endboss.y = 170;
    this.endboss.otherDirection = true;
  }

  moveInLeft() {
    this.executeForTime(
      () => {
        this.moveRight();
      },
      100,
      2000
    );
  }

  moveOutLeft() {
    this.executeForTime(
      () => {
        this.moveLeft();
      },
      100,
      2000
    );
  }

  switchToRightSide() {
    this.startShootingAttackRight();
    this.createNewBottles(1);
  }

  shootBirds() {
    this.setStoppableTimeout(() => this.createNewChickenSmallFlying(7200, 200), 2000);
    this.setStoppableTimeout(() => this.createNewChickenSmallFlying(7200, 320), 3000);
    this.setStoppableTimeout(() => this.createNewChickenSmallFlying(7200, 400), 4000);
  }

  checkEndbossDefeated() {
    setInterval(() => {
      if (this.endboss.health == 0) {
        this.clearAllTimeouts();
        world.stopAllIntervals();
        this.sequenceGameWon();
      }
    }, 200);
  }

  sequenceGameWon() {
    this.dieAnimation();
  }

  resetHealthEndboss() {
    world.level.enemies[0].health = 20;
  }

  resetStatusbar(color) {
    world.statusbars[3].actualStatusbar = world.statusbars[3][color];
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

  resetHurtAnimation() {
    world.level.enemies[0].currentImageIndices.hurt = 0;
  }

  dieAnimation() {
    world.level.enemies[0].dieAnimation();
  }

  createNewChicken(xPosition, yPosition) {
    world.level.enemies.push(new Chicken(xPosition, yPosition));
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
    this.endboss = world.level.enemies[0];
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

  deleteChickenNotOnCanvas() {
    world.collision.rectanglesEnemies.forEach((enemy) => {
      if (enemy.x < 6000) {
        enemy.enemy.health = 0;
        world.collision.destroyRectangle(enemy, "rectanglesEnemies");
      }
    });
  }

  executeForTime(func, interval, duration) {
    const intervalId = setInterval(() => {
      func();
    }, interval);
    this.setStoppableTimeout(() => clearInterval(intervalId), duration);
  }

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

  clearAllTimeouts() {
    this.timeoutIds.forEach((timeoutId) => clearTimeout(timeoutId));
    this.timeoutIds = [];
  }
}
