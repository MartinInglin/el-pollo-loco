class BottleTrowable extends MovableObject {
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

  constructor() {
    super().loadImage("img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png");
    this.loadImages(this.imagesRotation);
    this.loadImages(this.imagesSplash);

    checkWorldExistence().then(() => {

    });
  }

  throwBottle() {
    this.setPositionCharacter();
    this.speedY = 25;
    let id = setInterval(() => {
      if (!world.character.otherDirection) {
        this.moveRight();
      } else {
        this.moveLeft();
      }
      this.gravityBottle();
      this.throwBottleAnimation();
      this.checkBottleHitsGround();
    }, 40);
    this.intervalIdsMovableObjects.push(id);
  }

  gravityBottle() {
    if (this.isAboveGround() || this.speedY > 0) {
      this.y -= this.speedY;
      this.speedY -= this.acceleration;
    }
  }

  setPositionCharacter() {
    this.x = world.character.x + 20;
    this.y = world.character.y + 100;
  }

  throwBottleAnimation() {
    this.playContinuousAnimation(this.imagesRotation, "bottleRotation");
  }

  // createRectangleBottleThrowable() {
  //   const rectangleBottleThrowable = new RectangleBottleThrowable();
  //   world.rectanglesCollision.rectanglesBottlesThrowable.push(rectangleBottleThrowable);
  // }

  checkBottleHitsGround() {
      if (!this.isAboveGround()) {
        this.stopIntervalsMovableObjects()
        this.destroyBottleThrowable();
      }
  }

  destroyBottleThrowable() {
    const index = world.level.throwableBottles.indexOf(this);
    if (index !== -1) {
      world.level.throwableBottles.splice(index, 1);
    }
  }  
}
