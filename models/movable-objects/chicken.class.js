class Chicken extends MovableObject {
  imagesWalking = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];
  imageDead = ["img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

  y;
  x;
  height = 80;
  width = 80;
  adjustmentSprite = -30;
  AUDIO_WALKING = new Audio("audio/chicken-cackling.mp3");
  AUDIO_IS_HIT = new Audio("audio/character-hit-enemy.mp3");
  AUDIO_CHICKEN_DROPPED = new Audio("audio/chicken-dropped.mp3");

  constructor(xPosition, yPosition) {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.imagesWalking);
    this.loadImages(this.imageDead);

    this.x = xPosition;
    this.y = yPosition;
    this.speed = 0.4;

    checkWorldExistence().then(() => {
      this.checkObjectOnCanvas();
      this.chickenMoveLeft();
      this.chickenWalkingAnimation();
      this.enemyDies();
      this.applyGravityChicken();
      this.playAudioDropped();
    });
  }

  /**
   * This function applies gravity to chicken. It is especially needed in the endgame where the endboss throws the chicken down.
   */
  applyGravityChicken() {
    this.setStoppableInterval(this.applyGravity, 40);
  }

  /**
   * This function sets an interval to move the chicken to the left.
   */
  chickenMoveLeft() {
    this.setStoppableInterval(this.moveLeft, 10);
  }

  /**
   * This function executes the walking animation of the chicken.
   */
  chickenWalkingAnimation() {
    this.setStoppableInterval(() => {
      this.playContinuousAnimation(this.imagesWalking, "chickenWalking");
    }, 100);
  }

  /**
   * This function is just for the sound. It checks, if the chicken is visible on the canvas and if the character is alive, then it plays the sound.
   */
  checkObjectOnCanvas() {
    this.setStoppableInterval(() => {
      if (this.isChickenOnCanvas() && world.character.health > 0) {
        this.playAudioWalking();
        this.AUDIO_IS_HIT.volume = 1;
      } else {
        this.stopAudioWalking();
        this.AUDIO_IS_HIT.volume = 0;
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

  /**
   * This function is called when the health-value of an enemy is 0. It stops its intervals and calls the animation for death.
   */
  enemyDies() {
    this.setStoppableInterval(() => {
      let killedByCharacter = this.checkKilledByCharacter();
      if (this.health === 0 || this.x < world.character.x - 800) {
        this.stopIntervalsMovableObjects();
        this.enemyDiesAnimation();
        this.stopAudioWalking();
        if (killedByCharacter) {
          this.playAudioDying();
        }
        setTimeout(() => {
          this.deleteEnemy();
        }, 200);
      }
    }, 40);
  }

  /**
   * This function plays the sound of the walking chicken.
   */
  playAudioWalking() {
    this.AUDIO_WALKING.loop = true;
    this.AUDIO_WALKING.play();
  }

  /**
   * This function plays the audio when a chicken is dropped by the endboss. In fact it always plays if the chicken is above 110 on the y axis.
   */
  playAudioDropped() {
    if (this.y < 110) {
      this.AUDIO_CHICKEN_DROPPED.play();
    }
  }

  /**
   * This function plays the audio "hit" when a chicken dies.
   */
  playAudioDying() {
    this.AUDIO_IS_HIT.play();
  }

  /**
   * This function stops the audio of the walking chicken.
   */
  stopAudioWalking() {
    this.AUDIO_WALKING.pause();
    this.AUDIO_WALKING.currentTime = 0;
  }
}
