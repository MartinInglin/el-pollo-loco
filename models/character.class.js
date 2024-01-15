class Character extends MovableObject {
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
    "img/2_character_pepe/5_dead/D-57.png",
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

  constructor(keyboard) {
    super().loadImage("img/2_character_pepe/1_idle/idle/I-1.png");
    this.intervalAnimation = null;
    this.keyboard = keyboard;
    this.health = 100;
    this.loadImages(this.imagesWalking);
    this.loadImages(this.imagesJumping);
    this.loadImages(this.imagesIdle);
    this.loadImages(this.imagesIdleLong);
    this.loadImages(this.imagesHurt);
    this.loadImages(this.imagesDie);
    this.checkWorldExistence().then(() => {
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
  });
  }

  checkWorldExistence() {
    return new Promise((resolve) => {
      const checkInterval = setInterval(() => {
        if (typeof world !== "undefined" && world !== null) {
          clearInterval(checkInterval);
          resolve();
        }
      }, 100);
    });
  }

  /**
   * This function moves the camera with the character and stops moving at the end of the level. It needs to be in sync with the function moveCharacter and the interval must be the same. Otherwise the character will flicker.
   */
  moveCamera() {
    world.intervals.character.intervalMoveCamera = setInterval(() => {
      if (this.x <= 300) {
        world.camera_x = 0;
      }
      if (this.x > 300 && this.x < world.level.levelEnd - 420) {
        world.camera_x = 300 - this.x;
      }
    }, 40);
  }

  /**
   * This function moves the character. It is checks frequently if the player presses left, right or up on the keyboard by checking the corresponding variables form the keyboard. It must be in sync with the "moveCamera" function.
   */
  moveCharacter() {
    world.intervals.character.intervalCheckLeftRight = setInterval(() => {
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
   * This function checks if the player presses any of the left, right or up buttons. In case it starts the animation and flips the image if the character changes direction.
   */
  characterWalkAnimation() {
    world.intervals.character.intervalCheckLeftRightAnimation = setInterval(() => {
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
    this.AUDIO_WALKING.volume = 0.2;
    this.AUDIO_WALKING.play();
    this.walkingAnimation();
  }

  /**
   * This function resets the walking audio so it always starts from a new if the player presses left or right again.
   */
  stopAudioWalking() {
    this.AUDIO_WALKING.pause();
    this.AUDIO_WALKING.currentTime = 0;
  }

  /**
   * This function starts the idle animation if the player does not press any key. After three cycles of Pepe closing his eyes, pepe falls asleep. "let state" is needed because functions create a copy of the variable if passed on. So I needed to create an object therefore.
   */
  idleAnimation() {
    let state = {
      currentImageIndexIdle: 0,
      currentImageIndexIdleLong: 0,
    };

    world.intervals.character.intervalCheckIdleAnimation = setInterval(() => {
      if (this.playerPressAnyKey()) {
        this.iterationCountIdleAnimation = 0;
        this.characterSleep = false;
      }

      if (this.playerDontPressAnyKeyNoSleeping()) {
        this.characterStartBlinking(state);
        if (this.after3CyclesBlinking()) {
          this.characterSleep = true;
        }
      }

      if (this.characterSleep) {
        this.characterStartSleeping(state);
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
   * This function starts the blinking animation of the character.
   *
   * @param {object} state - Contains several variables defined in the function idleAnimation.
   */
  characterStartBlinking(state) {
    const currentImageIndexIdle = state.currentImageIndexIdle;
    this.img = this.imageCache[this.imagesIdle[currentImageIndexIdle]];
    state.currentImageIndexIdle = (currentImageIndexIdle + 1) % this.imagesIdle.length;
    const imagePath = this.imagesIdle[state.currentImageIndexIdle];
    this.img = this.imageCache[imagePath];
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
   * This function starts the sleeping animation of the character.
   *
   * @param {object} state - Contains several variables defined in the function idleAnimation.
   */
  characterStartSleeping(state) {
    state.currentImageIndexIdleLong = (state.currentImageIndexIdleLong + 1) % this.imagesIdleLong.length;
    const imagePath = this.imagesIdleLong[state.currentImageIndexIdleLong];
    this.img = this.imageCache[imagePath];
  }

  /**
   * This function contains the movement of the character when he jumps. By increasing the amount of speedY the character jumps higher. It then plays the corresponding audio.
   */
  jump() {
    world.intervals.character.intervalCheckJump = setInterval(() => {
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
    let state = {
      currentIndex: 0,
    };

    world.intervals.character.intervalCheckJumpAnimation = setInterval(() => {
      if (this.playerPressUpOrAnimationJumpRunning()) {
        this.jumpAnimationStarted = true;
        if (this.jumpAnimationNotFinished(state.currentIndex)) {
          this.characterJumpAnimation(state);
        } else {
          this.resetJumpAnimation(state);
          this.AUDIO_JUMP.play();
        }
      }
    }, 50);
  }

  /**
   * This function executes the actual animation.
   *
   * @param {object} state - This object contains the current index of the jump animation.
   */
  characterJumpAnimation(state) {
    const imagePath = this.imagesJumping[state.currentIndex];
    this.img = this.imageCache[imagePath];
    state.currentIndex++;
    this.flipImageInJump();
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
   * This function checks if the jump animation has ran through completely.
   *
   * @param {number} currentIndex - Number of the current Index of the image.
   * @returns boolean
   */
  jumpAnimationNotFinished(currentIndex) {
    return currentIndex < this.imagesJumping.length;
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
   * This function resets the jump animation.
   *
   * @param {object} state - This object contains the current index of the jump animation.
   */
  resetJumpAnimation(state) {
    this.jumpAnimationStarted = false;
    state.currentIndex = 0;
  }

  /**
   * This function sets the interval to check if the player is at the end of the level.
   */
  endLevelReached() {
    world.intervals.character.intervalLevelEndReached = setInterval(() => {
      this.checkEndWorldLeft();
      this.checkEndWorldRight();
    }, 40);
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

  animationIsHurt() {
    let previousHealth = this.health;
    let currentIndexHurt = 0;
    world.intervals.character.intervalIsHurt = setInterval(() => {
      if (this.health < previousHealth && this.health > 20) {
        this.isHurt = true;
        if (currentIndexHurt < this.imagesHurt.length) {
          const imagePath = this.imagesHurt[currentIndexHurt];
          this.img = this.imageCache[imagePath];
          currentIndexHurt++;
        } else {
          this.isHurt = false;
          this.resetIdleAnimation();
          currentIndexHurt = 0;
          previousHealth = this.health;
        }
      }
    }, 100);
  }

  resetIdleAnimation() {
    this.characterSleep = false;
    this.iterationCountIdleAnimation = 0;
  }

  animationDie() {
    let currentIndexDie = 0;
    setInterval(() => {
      if (this.health <= 0) {
        world.clearAllIntervals()
        if (currentIndexDie < this.imagesDie.length) {
          const imagePath = this.imagesDie[currentIndexDie];
          this.img = this.imageCache[imagePath];
          currentIndexDie++;
        } else {
          this.img = this.imageCache["img/2_character_pepe/5_dead/D-57.png"];
        }
      }
    }, 100);
  }
}
