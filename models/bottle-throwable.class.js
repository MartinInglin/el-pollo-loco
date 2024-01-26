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
  adjustmentSprite = 30;
  bottleHitsEnemy = false;

  constructor() {
    super().loadImage("img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png");
    this.loadImages(this.imagesRotation);
    this.loadImages(this.imagesSplash);

    checkWorldExistence().then(() => {});
  }

  throwBottle() {
    const bottleThrownRight = !world.character.otherDirection;
    this.createRectangleBottleThrowable();
    this.getPositionCharacter();
    this.speedY = 25;
    this.setStoppableInterval(() => {
      if (bottleThrownRight) {
        this.moveRight();
      } else {
        this.moveLeft();
      }
      this.applyGravity();
      this.throwBottleAnimation();
      this.checkBottleDestroyed();
    }, 40);
  }

  createRectangleBottleThrowable() {
    world.collision.rectanglesBottlesThrowable.push(new RectangleBottleThrowable());
  }

  getPositionCharacter() {
    this.x = world.character.x + 20;
    this.y = world.character.y + 100;
  }

  throwBottleAnimation() {
    this.playContinuousAnimation(this.imagesRotation, "bottleRotation");
  }

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

  playSplashAnimation() {
    let id = setInterval(() => {
      this.playSingleRunAnimation(this.imagesSplash, "bottleSplash");
    }, 100);
    this.intervalIdsMovableObjects.push(id);
  }

  destroyBottleThrowable() {
    const index = world.level.throwableBottles.indexOf(this);
    if (index !== -1) {
      world.level.throwableBottles.splice(index, 1);
    }
  }
}
