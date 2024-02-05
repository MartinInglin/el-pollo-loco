class Character extends MovableObject {

  imagesWalking = imagesCharacter.imagesWalking;
  imagesJumping = imagesCharacter.imagesJumping;
  imagesIdle = imagesCharacter.imagesIdle;
  imagesIdleLong = imagesCharacter.imagesIdleLong
  imagesHurt = imagesCharacter.imagesHurt;
  imagesDie = imagesCharacter.imagesDie;
  imagesMiniJump = imagesCharacter.imagesMiniJump;

  AUDIO_WALKING = new Audio("audio/quick-run-cartoony.mp3");
  AUDIO_JUMP = new Audio("audio/jumps-on-the-floor.mp3");
  AUDIO_THROW = new Audio("audio/throw-bottle.mp3");
  AUDIO_HURT = new Audio("audio/hurt.mp3");
  AUDIO_DIE = new Audio("audio/character-dies.mp3");
  AUDIO_SNORE = new Audio("audio/snore.mp3");

  x = 100;
  y = 220;
  height = 200;
  width = 140;
  speed = 10;
  keyboard;
  jumpAnimationStarted = false;
  characterMovedLeft = false;
  characterMovedRight = false;
  endLevelLeftReached = false;
  endLevelRightReached = false;
  characterSleep = false;
  audioDiePlayed = false;
  iterationCountIdleAnimation = 0;
  isHurt = false;
  idWalkAnimation;
  coinsCollected = 0;
  bottlesCollected = 0;
  previousHealth = 100;
  adjustmentSprite = -30;
  previousBottlesCount = 0;

  constructor(keyboard) {
    super().loadImage("img/2_character_pepe/1_idle/idle/I-1.png");
    this.intervalAnimation = null;
    this.keyboard = keyboard;
    this.loadImages(this.imagesWalking);
    this.loadImages(this.imagesJumping);
    this.loadImages(this.imagesIdle);
    this.loadImages(this.imagesIdleLong);
    this.loadImages(this.imagesHurt);
    this.loadImages(this.imagesDie);

    checkWorldExistence().then(() => {
      this.applyGravityCharacter();
      this.moveCamera();
      this.moveCharacter();
      this.characterWalkAnimation();
      this.jump();
      this.jumpAnimation();
      this.idleAnimation();
      this.animationIsHurt();
      this.animationDie();
      this.endLevelReached(20);
      this.checkThrowBottle();
      this.showModalGameOver();
      this.previousBottlesCount = world.level.throwableBottles.length;
    });
  }

  /**
   * This function applies gravity to the character. It is needed separatedly because other objects like bottles need different values so it looks natural.
   */
  applyGravityCharacter() {
    this.setStoppableInterval(this.applyGravity, 40);
  }

  /**
   * This function moves the camera with the character and stops moving at the end of the level. It needs to be in sync with the function moveCharacter and the interval must be the same. Otherwise the character will flicker. The string in the end is used to store the interval individually so it can be stopped sparatedly.
   */
  moveCamera() {
    this.setStoppableInterval(
      () => {
        if (this.x <= 300) {
          world.camera_x = 0;
        }
        if (this.x > 300 && this.x < world.level.levelEnd - 420) {
          world.camera_x = 300 - this.x;
        }
      },
      40,
      "cameraMoveInterval"
    );
  }

  /**
   * This function moves the character. It is checks frequently if the player presses left, right or up on the keyboard by checking the corresponding variables form the keyboard. It must be in sync with the "moveCamera" function.
   */
  moveCharacter() {
    this.setStoppableInterval(() => {
      if (this.keyboard.LEFT && !this.endLevelLeftReached) {
        this.moveLeft();
        this.characterMovedLeft = true;
        this.characterMovedRight = false;
      }
      if (this.keyboard.RIGHT && !this.endLevelRightReached) {
        this.moveRight();
        this.characterMovedLeft = false;
        this.characterMovedRight = true;
      }
      if (!this.keyboard.LEFT && !this.keyboard.RIGHT && this.speedX >= 0) {
        this.stopCharacter();
      }
    }, 40);
  }

  /**
   * This function is called after the player releases the left or right button. The character slides for a little longer. Therefore the two variables characterMovedLeft and -Right are used to see if the character hase moved before. If the charater is at the level end the function is not called.
   */
  stopCharacter() {
    if (this.endLevelLeftReached || this.endLevelRightReached) {
      this.speedX = 0;
    } else {
      if (this.speedX >= 0) {
        if (this.characterMovedLeft) {
          this.x -= this.speedX;
          this.speedX -= this.acceleration;
        }
        if (this.characterMovedRight) {
          this.x += this.speedX;
          this.speedX -= this.acceleration;
        }
      }
    }
  }

  /**
   * This function checks if the player presses any of the left, right or up buttons. In case it starts the animation and flips the image if the character changes direction.
   */
  characterWalkAnimation() {
    this.setStoppableInterval(() => {
      if (this.keyboard.LEFT && !this.jumpAnimationStarted && !this.isHurt) {
        this.otherDirection = true;
        this.startAnimationWalking();
      }
      if (this.keyboard.RIGHT && !this.jumpAnimationStarted && !this.isHurt) {
        this.otherDirection = false;
        this.startAnimationWalking();
      }
      if ((!this.keyboard.LEFT && !this.keyboard.RIGHT) || this.keyboard.UP || this.isHurt) {
        this.stopAudioWalking();
      }
    }, 70);
  }

  /**
   * This function executes the walking animation and the audio.
   */
  startAnimationWalking() {
    this.AUDIO_WALKING.loop = true;
    this.AUDIO_WALKING.play();
    this.playContinuousAnimation(this.imagesWalking, "walking");
  }

  /**
   * This function resets the walking audio so it always starts from a new if the player presses left or right again.
   */
  stopAudioWalking() {
    this.AUDIO_WALKING.pause();
    this.AUDIO_WALKING.currentTime = 0;
  }

  /**
   * This function sets the state of the character. If the player presses a key, the idle animation is reset. If he doesn't press any key the idle animation starts. After 3 cycles of the idle animation the character starts sleeping.
   */
  idleAnimation() {
    this.setStoppableInterval(() => {
      if (this.playerPressAnyKey()) {
        this.resetIdleAnimation();
      } else if (this.playerDontPressAnyKeyNoSleeping()) {
        this.characterStartBlinking();
        if (this.after3CyclesBlinking()) {
          this.characterSleep = true;
        }
      } else if (this.characterSleep) {
        this.characterStartSleeping();
      }
    }, 500);
  }

  /**
   * This function checks if the player presses one of the three keys left, right or up.
   *
   * @returns - boolean
   */
  playerPressAnyKey() {
    return this.keyboard.LEFT || this.keyboard.RIGHT || this.keyboard.UP;
  }

  /**
   * This function checks if the plyer has released the keys left or right and if the character is currently not jumping or sleeping.
   *
   * @returns - boolean
   */
  playerDontPressAnyKeyNoSleeping() {
    return !this.keyboard.LEFT && !this.keyboard.RIGHT && !this.jumpAnimationStarted && !this.characterSleep;
  }

  /**
   * This function starts the blinking animation of the character if the player doesn't press any key.
   */
  characterStartBlinking() {
    this.playContinuousAnimation(this.imagesIdle, "idle");
    this.iterationCountIdleAnimation++;
  }

  /**
   * This function checks if the iteration has passed 3 times. If this happens, it returns true.
   *
   * @returns - boolean
   */
  after3CyclesBlinking() {
    return this.iterationCountIdleAnimation >= this.imagesIdle.length * 3;
  }

  /**
   * This function starts the sleeping animation of the character if the character has cycled three times the idle animation.
   */
  characterStartSleeping() {
    this.playContinuousAnimation(this.imagesIdleLong, "idleLong");
    if (this.x !== 100) {
      this.AUDIO_SNORE.loop = true;
      this.AUDIO_SNORE.play();
    }
  }

  /**
   * This function contains the movement of the character when he jumps. By increasing the amount of speedY the character jumps higher. It then plays the corresponding audio.
   */
  jump() {
    this.setStoppableInterval(() => {
      if (this.keyboard.UP && !this.isAboveGround()) {
        this.speedY = 25;
        this.playAudioJump();
      }
    }, 60);
  }

  /**
   * This function plays the audio for the jump. It is always reset before execution so it can play quickly when the player jumps several times.
   */
  playAudioJump() {
    this.AUDIO_JUMP.currentTime = 0;
    this.AUDIO_JUMP.play();
  }

  /**
   *This function executes the jump animation. It checks if the player pressed the up button or the animation is already running because it should not stop if the player releases the key. When the animation ran through completely it is reset and the jump audio plays again for the landing.
   */
  jumpAnimation() {
    this.setStoppableInterval(() => {
      if (this.playerPressUpOrAnimationJumpRunning()) {
        this.jumpAnimationStarted = true;
        if (this.jumpAnimationNotFinished()) {
          this.characterJumpAnimation();
        } else {
          this.resetJumpAnimation();
          this.resetCharacterY();
          this.AUDIO_JUMP.play();
        }
      }
    }, 50);
  }

  /**
   * This function calls the jump animation of the character. It also flips the image if the player changes direction within the jump.
   */
  characterJumpAnimation() {
    this.playSingleRunAnimation(this.imagesJumping, "jump");
    this.flipImageInJump();
  }

  /**
   * This function resets the jump animation so it is ready for the next jump.
   */
  resetJumpAnimation() {
    this.jumpAnimationStarted = false;
    this.currentImageIndices.jump = 0;
  }

  resetCharacterY() {
    this.y = 220;
  }

  /**
   * This function checks if the player presses up or the animation has already started.
   *
   * @returns - boolean
   */
  playerPressUpOrAnimationJumpRunning() {
    return this.keyboard.UP || this.jumpAnimationStarted;
  }

  /**
   * This function checks if the jumping animation is still running.
   *
   * @returns - boolean
   */
  jumpAnimationNotFinished() {
    return this.currentImageIndices.jump < this.imagesJumping.length;
  }

  /**
   * This function is executed after the character hits an enemy from top.
   */
  miniJump() {
    this.speedY = 10;
    this.currentImageIndices.jump = 10;
  }

  /**
   * This function flips the images if the player changes direction in the jump animation. The flip animation happens in the class world.
   */
  flipImageInJump() {
    if (this.keyboard.LEFT) {
      this.otherDirection = true;
    }
    if (this.keyboard.RIGHT) {
      this.otherDirection = false;
    }
  }

  /**
   * This function sets the interval to check if the player is at the end of the level.
   *
   * @param {number} endLevelLeft - Point set from the level or from the level script.
   */
  endLevelReached(endLevelLeft) {
    this.setStoppableInterval(() => {
      this.checkEndWorldLeft(endLevelLeft);
      this.checkEndWorldRight();
    }, 40);
  }

  /**
   * This function checks if the player is at the left end of the world.
   *
   * @param {number} endLevelLeft - Point set from the level or from the level script.
   */
  checkEndWorldLeft(endLevelLeft) {
    if (this.x <= endLevelLeft + 50) {
      this.endLevelLeftReached = true;
    } else {
      this.endLevelLeftReached = false;
    }
  }

  /**
   * This function checks if the player is at the rigth end of the world.
   */
  checkEndWorldRight() {
    if (this.x >= world.level.levelEnd - 150) {
      this.endLevelRightReached = true;
    } else {
      this.endLevelRightReached = false;
    }
  }

  /**
   * This function calls the hurt animation if the character hits an enemy.
   */
  animationIsHurt() {
    this.setStoppableInterval(() => {
      if (this.healthCharacterDecreases()) {
        this.isHurt = true;
        this.AUDIO_HURT.play();
        this.startHurtAnimation();
      }
    }, 100);
  }

  /**
   * This function returns true if the characters health has decreased.
   *
   * @returns - boolean
   */
  healthCharacterDecreases() {
    return this.health < this.previousHealth && this.health > 0;
  }

  /**
   * This function plays the hurt animation. It ensures that it is only played once.
   */
  startHurtAnimation() {
    if (this.currentImageIndices.hurt < this.imagesHurt.length) {
      this.playSingleRunAnimation(this.imagesHurt, "hurt");
    } else {
      this.resetHurtAnimation();
    }
  }

  /**
   * This function resets the hurt animation.
   */
  resetHurtAnimation() {
    this.isHurt = false;
    this.resetIdleAnimation();
    this.currentImageIndices.hurt = 0;
    this.previousHealth = this.health;
  }

  /**
   * This function resets the idle animation. The character starts blinking again after beeing hurt or wakes up if he was sleeping.
   */
  resetIdleAnimation() {
    this.characterSleep = false;
    this.iterationCountIdleAnimation = 0;
    this.AUDIO_SNORE.pause();
  }

  /**
   * This function plays the animation if the character dies.
   */
  animationDie() {
    let id = setInterval(() => {
      if (this.health <= 0) {
        this.playAudioDie();
        this.playSingleRunAnimation(this.imagesDie, "die");
      }
    }, 100);
  }

  /**
   * This function plays the audio when the character dies.
   */
  playAudioDie() {
    if (!this.audioDiePlayed) {
      this.stopMusic();
      this.AUDIO_DIE.play();
      this.audioDiePlayed = true;
      this.playSadMusic();
    }
  }

  /**
   * This function stops the game music if the character dies.
   */
  stopMusic() {
    world.level.script.AUDIO_MUSIC_GAME.pause();
    world.level.script.AUDIO_MUSIC_ENDBOSS.pause();
  }

  /**
   * This function plays some sad music 2 seconds after the character has died.
   */
  playSadMusic() {
    setTimeout(() => {
      world.level.script.AUDIO_MUSIC_LOOSE.loop = true;
      world.level.script.AUDIO_MUSIC_LOOSE.play();
    }, 2000);
  }

  /**
   * This function shows the "game over" screen 2 seconds after the character has died. The modal is located in game.html.
   */
  showModalGameOver() {
    let id = setInterval(() => {
      if (this.health <= 0) {
        clearInterval(id);
        setTimeout(() => {
          const modalGameOver = new bootstrap.Modal(document.getElementById("staticBackdropGameOver"));
          modalGameOver.show();
        }, 2000);
      }
    }, 500);
  }

  /**
   * This function checks if the player can throw a bottle. If so it calls the function to throw a bottle.
   */
  checkThrowBottle() {
    let bottleThrown = false;

    this.setStoppableInterval(() => {
      this.bottlesCollected = world.level.throwableBottles.length;

      if (this.playerCanThrowBottle(bottleThrown)) {
        bottleThrown = true;
        world.level.throwableBottles[0].throwBottle();
        this.AUDIO_THROW.play();
        this.previousBottlesCount -= 1;
      }
      if (this.bottleIsThrown()) {
        bottleThrown = false;
        this.previousBottlesCount = this.bottlesCollected;
      }
    }, 40);
  }

  /**
   * This function checks if the player can throw a bottle. Therefore he needs to press the space button, have a bottle and there must be no bottle already thrown.
   *
   * @param {boolean} bottleThrown - Contains if a bottle has been thrown.
   * @returns - boolean
   */
  playerCanThrowBottle(bottleThrown) {
    return this.keyboard.THROW && this.bottlesCollected > 0 && !bottleThrown;
  }

  /**
   * This function checks if the collected bottles and previous bottles are the same. This happens if the thrown bottle is destroyed. Then it resets the previous bottles count.
   *
   * @returns - boolean
   */
  bottleIsThrown() {
    return this.bottlesCollected === this.previousBottlesCount;
  }
}
