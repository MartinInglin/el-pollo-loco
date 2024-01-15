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
  health;

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
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  /**
   * This function checks if an object is above ground which is in this case 250 pixels.
   * 
   * @returns boolean 
   */
  isAboveGround() {
    return this.y < 250;
  }
}
