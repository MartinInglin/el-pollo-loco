class Bottle extends MovableObject {
  imagesGround = ["img/6_salsa_bottle/2_salsa_bottle_on_ground.png"];
  imagesRotation = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
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
  y = 370;
  x;
  height = 80;
  width = 80;

  constructor(xPosition) {
    super().loadImage("img/6_salsa_bottle/2_salsa_bottle_on_ground.png");
    this.loadImages(this.imagesRotation);
    this.loadImages(this.imagesSplash);
    this.x = xPosition;

    checkWorldExistence().then(() => {
      this.bottleCollected();
    });
  }

  bottleCollected() {
    let id = setInterval(() => {
      if (this.health === 0) {
        this.deleteCoin();
      }
    }, 40);
    this.intervalIdsMovableObjects.push(id);
  }
  
  deleteCoin() {
      const index = world.level.bottles.indexOf(this);
      if (index !== -1) {
        world.level.bottles.splice(index, 1);
      }
  }
}
