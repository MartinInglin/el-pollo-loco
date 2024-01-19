class Chicken extends MovableObject {
  imagesWalking = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];
  imageDead = [
    "img/3_enemies_chicken/chicken_normal/2_dead/dead.png",
  ]

  y = 370;
  x;
  height = 80;
  width = 80;
  AUDIO_WALKING = new Audio("audio/chicken-cackling.mp3");

  constructor(xPosition) {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.imagesWalking);
    this.loadImages(this.imageDead);

    this.x = xPosition;
    this.speed = 0.4;

    checkWorldExistence().then(() => {
    this.checkObjectOnCanvas();
    this.chickenMoveLeft();
    this.chickenWalkingAnimation();
    this.enemyDies()
  });
  }

  /**
   * This function sets an interval to move the chicken to the left.
   */
  chickenMoveLeft() {
    let id = setInterval(() => this.moveLeft(), 10);
    this.intervalIdsMovableObjects.push(id);
  }

  /**
   * This function executes the walking animation of the chicken.
   */
  chickenWalkingAnimation() {
    let id = setInterval(() => this.walkingAnimation(), 100);
    this.intervalIdsMovableObjects.push(id);
  }

  /**
   * This function is just for the sound. It checks, if the chicken is visible on the canvas and then plays the sound.
   */
  checkObjectOnCanvas() {
    let id = setInterval(() => {
      const canvasLeftBoundary = world.camera_x * -1;
      const canvasRightBoundary = canvasLeftBoundary + 720;

      if (this.x >= canvasLeftBoundary && this.x <= canvasRightBoundary) {
        this.playAudioWalking();
      } else {
        this.stopAudioWalking();
      }
    }, 1000);
    this.intervalIdsMovableObjects.push(id);
  }

  /**
   * This function plays the sound of the walking chicken.
   */
  playAudioWalking() {
    this.AUDIO_WALKING.loop = true;
    this.AUDIO_WALKING.volume = 0.2;
    this.AUDIO_WALKING.play();
  }

  /**
   * This function stops the audio of the walking chicken.
   */
  stopAudioWalking() {
    this.AUDIO_WALKING.pause();
    this.AUDIO_WALKING.currentTime = 0;
  }
}
