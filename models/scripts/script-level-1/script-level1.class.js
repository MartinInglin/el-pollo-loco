class ScriptLevel1 extends Script {
  character;
  enemies;
  endboss;
  intervalIdsScript = [];
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
        this.createNewChicken(this.triggerPoints[4].xCoordinate + 900, 370);
        this.createNewChickenSmall(this.triggerPoints[4].xCoordinate + 950);
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
    super();
    checkWorldExistence().then(() => {
      this.character = world.character;
      this.enemies = world.level.enemies;
      this.endboss = world.level.endboss;
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
    this.deleteAllUnusedObjects();
    this.createEndboss(this.triggerPoints[5].xCoordinate + 400);
    this.freezeCamera();
    this.setEndLevelLeft();
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
    this.executeForTime(this.endbossMoveLeft, 40, 2000);
    this.executeForTime(this.endbossWalkingAnimation, 100, 2000);
  }

  sequenceEndbossAngry() {
    setInterval(() => {
      this.endbossAlertAnimation();
    }, 200);
  }

  sequenceJumpAttack() {
    this.createNewBottles(1);
    this.endbossAttackAnimation();
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
    return this.endboss.health <= 0;
  }

  continueJumping() {
    if (!this.endboss.otherDirection && this.endboss.x > 6300) {
      this.endbossJumpAttack("left", this.endbossMoveLeft);
    } else {
      this.endboss.otherDirection = true;
      if (this.endboss.otherDirection && this.endboss.x < 7300) {
        this.endbossJumpAttack("right", this.endbossMoveRight);
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
    clearInterval(this.endboss.individualIntervalIds.attackAnimationEndboss[0]);
    this.endboss.individualIntervalIds.attackAnimationEndboss = [];
  }

  sequenceEndbossHurt() {
    this.executeForTime(this.endbossHurtAnimation, 100, 2000);
  }

  sequenceFlyAttack() {
    this.endbossAttackAnimation();
    this.startFlying();
  }

  startFlying() {
    this.stopGravity();
    const id = setInterval(() => {
      if (this.endboss.y >= -50) {
        this.endboss.y -= 10;
      } else {
        this.resetHealthEndboss();
        this.resetStatusbar("imagesBlue");
        this.startFlyingAttack();
        clearInterval(id);
      }
    }, 100);
  }

  stopGravity() {
    clearInterval(this.endboss.individualIntervalIds.applyGravityEndboss[0]);
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
      this.endbossMoveLeft();
      this.handleChickenCreation(elapsedTimeObj);
    } else {
      this.endboss.otherDirection = true;
      if (this.endboss.otherDirection && this.endboss.x < 7300) {
        this.endbossMoveRight();
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
    this.resetEndbossHurtAnimation();
    this.sequenceEndbossHurt();
    setTimeout(() => {
      this.executeForTime(this.endbossMoveOut, 10, 2000);
    }, 2000);
    setTimeout(() => {
      this.shootingSequence();
    }, 4000);
  }

  endbossMoveOut = () => {
    if (!this.endboss.otherDirection) {
      this.endbossMoveLeft();
    } else {
      this.endbossMoveRight();
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
        this.endbossMoveLeft();
      },
      100,
      1500
    );
  }

  moveOutRight() {
    this.executeForTime(
      () => {
        this.endbossMoveRight();
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
        this.endbossMoveRight();
      },
      100,
      2000
    );
  }

  moveOutLeft() {
    this.executeForTime(
      () => {
        this.endbossMoveLeft();
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
    let id = setInterval(() => {
      if (this.endboss.health == 0) {
        this.clearAllTimeouts();
        world.stopAllIntervals();
        this.sequenceGameWon();
        clearInterval(id);
      }
    }, 200);
  }

  sequenceGameWon() {
    this.executeForTime(this.endbossDieAnimation, 200, 2000);
    setTimeout(() => {
      const modalWin = new bootstrap.Modal(document.getElementById("staticBackdropYouWin"));
      modalWin.show();
    }, 2000);
  }
}
