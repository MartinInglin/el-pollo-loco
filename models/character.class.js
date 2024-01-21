class Character extends MovableObject {
  x = 100;
  y = 250;
  height = 200;
  width = 140;
  imagesWalking = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];
  imagesJumping = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];
  imagesIdle = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];
  imagesIdleLong = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];
  imagesHurt = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];
  imagesDie = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
  ];
  imagesMiniJump = [
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];
  AUDIO_WALKING = new Audio("audio/quick-run-cartoony.mp3");
  AUDIO_JUMP = new Audio("audio/jumps-on-the-floor.mp3");
  speed = 10;
  keyboard;
  jumpAnimationStarted = false;
  characterMovedLeft = false;
  characterMovedRight = false;
  endLevelLeftReached = false;
  endLevelRightReached = false;
  characterSleep = false;
  iterationCountIdleAnimation = 0;
  isHurt = false;
  idWalkAnimation;
  coinsCollected = 0;
  bottlesCollected = 0;
  previousHealth = 100;
  adjustmentSprite = 0;
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
      this.applyGravity();
      this.moveCamera();
      this.moveCharacter();
      this.characterWalkAnimation();
      this.jump();
      this.jumpAnimation();
      this.idleAnimation();
      this.animationIsHurt();
      this.animationDie();
      this.endLevelReached();
      this.checkThrowBottle();
      this.previousBottlesCount =  world.level.throwableBottles.length;
    });
  }

  /**
   * This function moves the camera with the character and stops moving at the end of the level. It needs to be in sync with the function moveCharacter and the interval must be the same. Otherwise the character will flicker.
   */
  moveCamera() {
    let id = setInterval(() => {
      if (this.x <= 300) {
        world.camera_x = 0;
      }
      if (this.x > 300 && this.x < world.level.levelEnd - 420) {
        world.camera_x = 300 - this.x;
      }
    }, 40);
    this.intervalIdsMovableObjects.push(id);
  }

  /**
   * This function moves the character. It is checks frequently if the player presses left, right or up on the keyboard by checking the corresponding variables form the keyboard. It must be in sync with the "moveCamera" function.
   */
  moveCharacter() {
    let id = setInterval(() => {
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
    this.intervalIdsMovableObjects.push(id);
  }

  /**
   * This function is called after the player releases the left or right button. The character slides for a little longer. Therefore the two variables characterMovedLeft and -Right are used to see if the character hase moved before.
   */
  stopCharacter() {
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

  /**
   * This function checks if the player presses any of the left, right or up buttons. In case it starts the animation and flips the image if the character changes direction.
   */
  characterWalkAnimation() {
    this.idWalkAnimation = setInterval(() => {
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
    this.intervalIdsMovableObjects.push(this.idWalkAnimation);
  }

  /**
   * This function executes the walking animation and the audio.
   */
  startAnimationWalking() {
    this.AUDIO_WALKING.loop = true;
    this.AUDIO_WALKING.volume = 0.2;
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
    let id = setInterval(() => {
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
    this.intervalIdsMovableObjects.push(id);
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
  }

  /**
   * This function contains the movement of the character when he jumps. By increasing the amount of speedY the character jumps higher. It then plays the corresponding audio.
   */
  jump() {
    let id = setInterval(() => {
      if (this.keyboard.UP && !this.isAboveGround()) {
        this.speedY = 25;
        this.playAudioJump();
      }
    }, 60);
    this.intervalIdsMovableObjects.push(id);
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
    let id = setInterval(() => {
      if (this.playerPressUpOrAnimationJumpRunning()) {
        this.jumpAnimationStarted = true;
        if (this.jumpAnimationNotFinished()) {
          this.characterJumpAnimation();
        } else {
          this.resetJumpAnimation();
          this.AUDIO_JUMP.play();
        }
      }
    }, 50);
    this.intervalIdsMovableObjects.push(id);
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
   */
  endLevelReached() {
    let id = setInterval(() => {
      this.checkEndWorldLeft();
      this.checkEndWorldRight();
    }, 40);
    this.intervalIdsMovableObjects.push(id);
  }

  /**
   * This function checks if the player is at the left end of the world.
   */
  checkEndWorldLeft() {
    if (this.x <= 20) {
      this.endLevelLeftReached = true;
    } else {
      this.endLevelLeftReached = false;
    }
  }

  /**
   * This function checks if the player is at the rigth end of the world.
   */
  checkEndWorldRight() {
    if (this.x >= world.level.levelEnd - 200) {
      this.endLevelRightReached = true;
    } else {
      this.endLevelRightReached = false;
    }
  }

  /**
   * This function calls the hurt animation if the character hits an enemy.
   */
  animationIsHurt() {
    let id = setInterval(() => {
      if (this.healthCharacterDecreases()) {
        this.isHurt = true;
        this.startHurtAnimation();
      }
    }, 100);
    this.intervalIdsMovableObjects.push(id);
  }

  /**
   * This function returns true if the characters health has decreased.
   *
   * @returns - boolean
   */
  healthCharacterDecreases() {
    return this.health < this.previousHealth && this.health > 20;
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
  }

  /**
   *This function contains the dying animation of the character. After showing the whole array of the images it displays the last image of the character forever.
   */
  animationDie() {
    setInterval(() => {
      if (this.health <= 0) {
        this.playSingleRunAnimation(this.imagesDie, "die");
      }
    }, 100);
  }

  checkThrowBottle() {
    let bottleThrown = false;

    let id = setInterval(() => {
      //console.log(bottleTakenOut);
      console.log(this.previousBottlesCount);
      this.bottlesCollected = world.level.throwableBottles.length;

      if (this.keyboard.SPACE && this.bottlesCollected > 0 && !bottleThrown) {
        bottleThrown = true;
        world.level.throwableBottles[0].throwBottle();
        this.previousBottlesCount -= 1;
      }
      if (this.bottlesCollected === this.previousBottlesCount) {
        bottleThrown = false;
        this.previousBottlesCount = this.bottlesCollected;
      }
    }, 40);

    this.intervalIdsMovableObjects.push(id);
  }
}
