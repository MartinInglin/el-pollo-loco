class ChickenSmallFlying extends MovableObject {
  height = 40;
  width = 40;
  y = 200;
  x;
  speed = 10;
  imageDead = ["img/3_enemies_chicken/chicken_small/2_dead/dead.png"];
  AUDIO_DYING = new Audio("audio/chicken-hurt.mp3");
  AUDIO_FLYING = new Audio("audio/chicken-flying-2.mp3");

  constructor(xPosition, yPosition) {
    super().loadImage("img/3_enemies_chicken/chicken_small/1_walk/2_w.png");
    this.loadImages(this.imageDead);

    this.x = xPosition;
    this.y = yPosition;

    checkWorldExistence().then(() => {
      this.checkObjectOnCanvas();
      this.startMovingTowardsCharacter();
      this.enemyDies();
      this.AUDIO_FLYING.play();
    });
  }

  /**
   * This function checks if the character is within 200 pixels of the character. It then executes the walking animation and the movement. Because the small chicken runs faster than the character there is no need to retrigger the function.
   */
  startMovingTowardsCharacter() {
    this.setStoppableInterval(() => {
      this.moveLeft();
    }, 30);
  }

  /**
   * This function is called when the health-value of an enemy is 0. It stops its intervals and calls the animation for death.
   */
  enemyDies() {
    this.setStoppableInterval(() => {
      if (this.health === 0 || this.x < -100) {
        this.stopIntervalsMovableObjects();
        this.enemyDiesAnimation();
        this.stopAudioFlying();
        if (this.x > 0) {
          this.playAudioDying();
        }
        setTimeout(() => {
          this.deleteEnemy();
        }, 200);
      }
    }, 40);
  }

  /**
   * This function stops the flying audio.
   */
  stopAudioFlying() {
    this.AUDIO_FLYING.pause();
  }

  /**
   * This function stops the flying audio.
   */
  playAudioDying() {
    this.AUDIO_DYING.play();
  }

  /**
   * This function is just for the sound. It checks, if the chicken is visible on the canvas and if the character is alive, then it plays the sound.
   */
  checkObjectOnCanvas() {
    let id = setInterval(() => {
      if (this.isChickenOnCanvas() && world.character.health > 0) {
        this.AUDIO_FLYING.loop = true;
      } else {
        clearInterval(id);
        this.AUDIO_FLYING.pause();
      }
    }, 1000);
  }

  /**
   * This function checks if a chicken is on the canvas.
   *
   * @returns - boolean
   */
  isChickenOnCanvas() {
    const canvasLeftBoundary = world.camera_x * -1;
    const canvasRightBoundary = canvasLeftBoundary + 720;
    return this.x >= canvasLeftBoundary && this.x <= canvasRightBoundary;
  }
}
