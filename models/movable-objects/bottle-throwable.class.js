class BottleThrowable extends MovableObject {
  imagesRotation = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];
  imagesSplash = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];
  y = 10;
  x = -100;
  height = 80;
  width = 80;
  speed = 10;
  speedX = this.speed;
  acceleration = 2;
  adjustmentSprite = 0;
  bottleHitsEnemy = false;
  AUDIO_BOTTLE_FLYING = new Audio("audio/bottle-flying.mp3");
  AUDIO_BOTTLE_SPLASH = new Audio("audio/bottle-splash.mp3");

  constructor() {
    super().loadImage("img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png");
    this.loadImages(this.imagesRotation);
    this.loadImages(this.imagesSplash);

    checkWorldExistence().then(() => {});
  }

  /**
   * This function contains all the functions that are needed for the anmiation and collision of a thrown bottle.
   */
  throwBottle() {
    const bottleThrownRight = !world.character.otherDirection;
    this.createRectangleBottleThrowable();
    this.getPositionCharacter();
    this.speedY = 25;
    this.setStoppableInterval(() => {
      this.moveBottle(bottleThrownRight);
      this.applyGravity();
      this.throwBottleAnimation();
      this.checkBottleDestroyed();
    }, 40);
  }

  /**
   * This function moves the bottle to left or right depending on the direction the player has when he throws the bottle.
   *
   * @param {boolean} bottleThrownRight - This is the same as "world.character.otherDirection" but needs to be stored here because the bottle should not change its direction when the player turns around.
   */
  moveBottle(bottleThrownRight) {
    if (bottleThrownRight) {
      this.moveRight();
    } else {
      this.moveLeft();
    }
  }

  /**
   * This funciton creates a new rectangle for the collision.
   */
  createRectangleBottleThrowable() {
    world.collision.rectanglesBottlesThrowable.push(new RectangleBottleThrowable());
  }

  /**
   * This function gets the position of the character so the bottle is created where the character is at this time.
   */
  getPositionCharacter() {
    this.x = world.character.x + 20;
    this.y = world.character.y + 100;
  }

  /**
   * This function calls the actual animation of the bottle rotation.
   */
  throwBottleAnimation() {
    this.playContinuousAnimation(this.imagesRotation, "bottleRotation");
    this.AUDIO_BOTTLE_FLYING.play();
  }

  /**
   * This function checks if the bottle hits the ground or an enemy. In both cases the bottle is destroyed. In this case it stops all the intervals and calls the splash animation.
   */
  checkBottleDestroyed() {
    if (!this.isAboveGround() || this.bottleHitsEnemy) {
      this.stopIntervalsMovableObjects();
      this.playSplashAnimation();
      setTimeout(() => {
        this.stopIntervalsMovableObjects();
        this.destroyBottleThrowable();
      }, 300);
    }
  }

  /**
   * This function calls the splash animation in case the bottle is destroyed.
   */
  playSplashAnimation() {
    this.setStoppableInterval(() => {
      this.playSingleRunAnimation(this.imagesSplash, "bottleSplash");
      this.stopAudioFlyingBottle();
      this.AUDIO_BOTTLE_SPLASH.play();
    }, 100);
  }

  /**
   * This function deletes the bottle from the array "throwableBottles".
   */
  destroyBottleThrowable() {
    const index = world.level.throwableBottles.indexOf(this);
    if (index !== -1) {
      world.level.throwableBottles.splice(index, 1);
    }
  }

  /**
   * This function stops the audio of the flying bottle.
   */
  stopAudioFlyingBottle() {
    this.AUDIO_BOTTLE_FLYING.pause();
    this.AUDIO_BOTTLE_FLYING.currentTime = 0;
  }
}
