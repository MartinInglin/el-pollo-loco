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

  /**
   * This function starts the script events. It checks if the player passes a triggerpoint and calls the corresponding action. Then its sets the triggerpoint to true so it cannot be executed several times.
   */
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

  /**
   * This function prepares for the fight with the endboss.
   */
  startSequenceEndboss() {
    this.deleteAllUnusedObjects();
    this.createEndboss(this.triggerPoints[5].xCoordinate + 400);
    this.freezeCamera();
    this.setEndLevelLeft();
    this.sequenceEndbossAppears();
  }

  /**
   * This function freezes the camera.
   */
  freezeCamera() {
    clearInterval(world.character.individualIntervalIds.cameraMoveInterval);
  }

  /**
   * This fuction sets the end of the level on the left side to 6440 so the player cannot run back anymore.
   */
  setEndLevelLeft() {
    world.character.endLevelReached(6420);
  }

  /**
   * This function deletes all objects that aren't needed anymore for example uncollected bottles. Just to save CPU power.
   */
  deleteAllUnusedObjects() {
    world.level.enemies = [];
    world.collision.rectanglesEnemies = [];
    world.level.bottles = [];
    world.collision.rectanglesBottles = [];
    world.level.coins = [];
    world.collision.rectanglesCoins = [];
  }

  /**
   * This function brings in the endboss from the right and calls the angry animation. Then it starts the jump attack.
   */
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

  /**
   * This function lets the endboss walking in from the right to the middle of the screen.
   */
  endbossWalkInRight() {
    this.executeForTime(this.endbossMoveLeft, 40, 2000);
    this.executeForTime(this.endbossWalkingAnimation, 100, 2000);
  }

  /**
   * This function executes the angry animation.
   */
  sequenceEndbossAngry() {
    setInterval(() => {
      this.endbossAlertAnimation();
    }, 200);
  }

  /**
   * This function starts the jump attack.
   */
  sequenceJumpAttack() {
    this.createNewBottles(1);
    this.endbossAttackAnimation();
    this.startJumpAttack();
  }

  /**
   * This function checks if the player is dead or the endboss is defeated. If so it stops and calls the flying sequence, otherwise the endboss continues jumping.
   * 
   * @returns - Ends the code if the return is true.
   */
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

  /**
   * This function checks if the character is dead.
   * 
   * @returns - boolean
   */
  characterDead() {
    return world.character.health <= 0;
  }

  /**
   * This function checks if the endboss' health is 0.
   * 
   * @returns - boolean 
   */
  endbossDefeated() {
    return this.endboss.health <= 0;
  }

  /**
   * This function executes the jumping animation. It turns the endboss around if he is outside the canvas and creates new bottles after every run through.
   */
  continueJumping() {
    if (!this.endboss.otherDirection && this.endboss.x > 6300) {
      this.endbossJumpAttack(this.endbossMoveLeft);
    } else {
      this.endboss.otherDirection = true;
      if (this.endboss.otherDirection && this.endboss.x < 7300) {
        this.endbossJumpAttack(this.endbossMoveRight);
      } else {
        this.endboss.otherDirection = false;
        this.createNewBottles(3);
        this.startJumpAttack();
      }
    }
  }

  /**
   * This function executes the jump. jump() is the movement up and down, the function in the parameter is either left or right.
   * 
   * @param {function} movementFunction - Function to move left or right.
   */
  endbossJumpAttack(movementFunction) {
    this.endboss.jump();
    this.executeForTime(movementFunction, 40, 1500);
    setTimeout(() => {
      this.startJumpAttack();
    }, 2000);
  }

  /**
   * This function prepares for the flying sequence.
   */
  launchFlyingSequence() {
    this.stopAnimationAttack();
    this.sequenceEndbossHurt();
    setTimeout(() => {
      this.sequenceFlyAttack();
    }, 2000);
  }

  /**
   * This function clears the running intervals from the previous functions.
   */
  stopAnimationAttack() {
    clearInterval(this.endboss.individualIntervalIds.attackAnimationEndboss[0]);
    this.endboss.individualIntervalIds.attackAnimationEndboss = [];
  }

  /**
   * This function executes the hurt animation for a ceratain time.
   */
  sequenceEndbossHurt() {
    this.executeForTime(this.endbossHurtAnimation, 100, 2000);
  }

  /**
   * This function lets the endboss fly up in the sky.
   */
  sequenceFlyAttack() {
    this.endbossAttackAnimation();
    this.startFlying();
  }

  /**
   * This function stops the gravity and moves the endboss up. It also resets the health of the endboss so the next round can start.
   */
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

  /**
   * This function stops the gravity of the enboss so he can fly.
   */
  stopGravity() {
    clearInterval(this.endboss.individualIntervalIds.applyGravityEndboss[0]);
  }

  /**
   * This function checks if the player is dead or the endboss is defeated. If so it stops and calls the shooting sequence, otherwise the endboss continues flying.
   */
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

  /**
   * This function contains the flying sequence of the endboss. He creates a new chicken every 2500 ms. Therefore the "elapsedTimeObj.value" is counted +40 on every cycle.
   * 
   * @param {object} elapsedTimeObj - The passed time is an Object because in "handleChickenCreation" it needs to be reset. This is only possible with an object, not with a number.
   */
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

  /**
   * This function creates a new chicken after every 2.5 s and only if the endboss is within a certain widht. This is needed because otherwise the endboss would drop the chicken outside the visible canvas.
   * 
   * @param {object} elapsedTimeObj - The passed time is an Object because in this function it needs to be reset. This is only possible with an object, not with a number.
   */
  handleChickenCreation(elapsedTimeObj) {
    if (elapsedTimeObj.value >= 2500 && this.endboss.x > 6600 && this.endboss.x < 7000) {
      this.createNewChicken(this.endboss.x, 100);
      elapsedTimeObj.value = 0;
    }
  }

  /**
   * This function calls the hurt animation. Then it moves the endboss out.
   */
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

  /**
   * The endboss moves out quickly after beeing hit 10 times.
   */
  endbossMoveOut = () => {
    if (!this.endboss.otherDirection) {
      this.endbossMoveLeft();
    } else {
      this.endbossMoveRight();
    }
  };

  /**
   * This function prepares for the shooting sequence.
   */
  shootingSequence() {
    this.resetHealthEndboss();
    this.resetStatusbar("imagesOrange");
    this.checkEndbossDefeated();
    this.startShootingAttackRight();
  }

  /**
   * This function executes the shooting attack from the right side.
   */
  startShootingAttackRight() {
    this.setEnbossPositionRight();
    this.moveInRight();
    this.shootBirds();
    this.setStoppableTimeout(() => this.moveOutRight(), 7000);
    this.setStoppableTimeout(() => this.switchToLeftSide(), 9000);
  }

  /**
   * This function sets the position of the endboss on the right side.
   */
  setEnbossPositionRight() {
    this.endboss.x = 7200;
    this.endboss.y = 170;
    this.endboss.otherDirection = false;
  }

  /**
   * This function lets the endboss move in from the right side.
   */
  moveInRight() {
    this.executeForTime(
      () => {
        this.endbossMoveLeft();
      },
      100,
      1500
    );
  }

  /**
   * This function lets the endboss move out on the right side.
   */
  moveOutRight() {
    this.executeForTime(
      () => {
        this.endbossMoveRight();
      },
      100,
      1500
    );
  }

  /**
   * This function switches to left attack an creates a bottle for the player.
   */
  switchToLeftSide() {
    this.startShootingAttackLeft();
    this.createNewBottles(1);
  }

  /**
   * This function executes the shooting attack from the left side.
   */
  startShootingAttackLeft() {
    this.setEndbossPositionLeft();
    this.moveInLeft();
    this.shootBirds();
    this.setStoppableTimeout(() => this.moveOutLeft(), 7000);
    this.setStoppableTimeout(() => this.switchToRightSide(), 9000);
  }

  /**
   * This function sets the position of the endboss on the left side.
   */
  setEndbossPositionLeft() {
    this.endboss.x = 6100;
    this.endboss.y = 170;
    this.endboss.otherDirection = true;
  }

  /**
   * This function lets the endboss move in from the left side.
   */
  moveInLeft() {
    this.executeForTime(
      () => {
        this.endbossMoveRight();
      },
      100,
      2000
    );
  }

  /**
   * This function lets the endboss move out on the left side.
   */
  moveOutLeft() {
    this.executeForTime(
      () => {
        this.endbossMoveLeft();
      },
      100,
      2000
    );
  }

  /**
   * This function switches to left attack an creates a bottle for the player.
   */
  switchToRightSide() {
    this.startShootingAttackRight();
    this.createNewBottles(1);
  }

  /**
   * This function creates 3 fast flying birds on the right side.
   */
  shootBirds() {
    this.setStoppableTimeout(() => this.createNewChickenSmallFlying(7200, 200), 2000);
    this.setStoppableTimeout(() => this.createNewChickenSmallFlying(7200, 320), 3000);
    this.setStoppableTimeout(() => this.createNewChickenSmallFlying(7200, 400), 4000);
  }

  /**
   * This function checks if the endboss is finally defeated. It will end the game.
   */
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

  /**
   * This function shows the modal that congrats the player to his victory.
   */
  sequenceGameWon() {
    this.executeForTime(this.endbossDieAnimation, 200, 2000);
    setTimeout(() => {
      const modalWin = new bootstrap.Modal(document.getElementById("staticBackdropYouWin"));
      modalWin.show();
    }, 2000);
  }
}
