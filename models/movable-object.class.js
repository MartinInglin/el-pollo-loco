class MovableObject {
  x = 100;
  y = 300;
  img;
  height = 150;
  width = 100;
  imageCache = {};
  speed;
  otherDirection = false;
  currentImageIndex = 0;
  speedY = 0;
  speedX = 0;
  acceleration = 2;
  health = 100;
  intervalIdsMovableObjects = [];

  /**
   * This function is there for loading the first image of an object. It fills the variable img.
   *
   * @param {path} path - Path of an image, for example "img/2_character_pepe/1_idle/idle/I-1.png".
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * This function loads the array "imageCache" from where the images can be used to display animations.
   *
   * @param {array} array - An array of images to be stored in imagesCache.
   */
  loadImages(array) {
    array.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * This function moves any object to the left side. For the look there is an acceleration at the beginning of the movement because this feels more natural.
   */
  moveLeft() {
    if (this.speed > this.speedX) {
      this.x -= this.speedX;
      this.speedX += this.acceleration;
    } else {
      this.x -= this.speed;
    }
  }

  /**
   * This function moves any object to the right side. For the look there is an acceleration at the beginning of the movement because this feels more natural.
   */
  moveRight() {
    if (this.speed > this.speedX) {
      this.x += this.speedX;
      this.speedX += this.acceleration;
    } else {
      this.x += this.speed;
    }
  }

  /**
   * This function is the actual walking animation.
   */
  walkingAnimation() {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.imagesWalking.length;
    const imagePath = this.imagesWalking[this.currentImageIndex];
    this.img = this.imageCache[imagePath];
  }

  /**
   * This function simulates the gravity of any object. If the object is above ground it subtracts the acceleration from its speedY until it is back on the ground.
   */
  applyGravity() {
    let id = setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
    this.intervalIdsMovableObjects.push(id);
  }

  /**
   * This function checks if an object is above ground which is in this case 250 pixels.
   *
   * @returns boolean
   */
  isAboveGround() {
    return this.y < 250;
  }

  /**
   * This function is called when the health-value of an enemy is 0. It stops its intervals and calls the animation for death.
   */
  enemyDies() {
    let id = setInterval(() => {
      if (this.health === 0) {
        this.stopIntervalsMovableObjects();
        this.enemyDiesAnimation();
        this.deleteEnemy();
      }
    }, 40);
    this.intervalIdsMovableObjects.push(id);
  }

  /**
   * This function replaces the image of the enemy.
   */
  enemyDiesAnimation() {
    let imgPath = this.imageDead[0];
    this.img = this.imageCache[imgPath];
  }

  /**
   * This function removes the enemy from the array "world.level.enemies". This happens after 1s so the dying animation stays for this time and then the enemy vanishes.
   */
  deleteEnemy() {
    setTimeout(() => {
      const index = world.level.enemies.indexOf(this);
      if (index !== -1) {
        world.level.enemies.splice(index, 1);
      }
    }, 1000);
  }

  /**
   * This function stops all the intervals of this movable object. The id's are stored in the movableObject class.
   */
  stopIntervalsMovableObjects() {
    this.intervalIdsMovableObjects.forEach(clearInterval);
  }
}
