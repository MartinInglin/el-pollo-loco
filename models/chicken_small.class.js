class ChickenSmall extends MovableObject {
  height = 40;
  width = 40;
  y = 400;
  x;
  speed = 10;
  imageResting = ["img/3_enemies_chicken/chicken_small/1_walk/2_w.png"];
  imagesWalking = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];
  imageDead = ["img/3_enemies_chicken/chicken_small/2_dead/dead.png"];
  AUDIO_BWACK = new Audio("audio/bwack.mp3");
  AUDIO_DYING = new Audio("audio/chicken-hurt.mp3");

  constructor(xPosition) {
    super().loadImage(this.imageResting[0]);
    this.loadImages(this.imagesWalking);
    this.loadImages(this.imageDead);
    this.x = xPosition;
    this.AUDIO_DYING.volume = 1;

    checkWorldExistence().then(() => {
      this.startMovingTowardsCharacter();
      this.enemyDies();
    });
  }

  /**
   * This function checks if the character is within 200 pixels of the character. It then executes the walking animation and the movement. Because the small chicken runs faster than the character there is no need to retrigger the function.
   */
  startMovingTowardsCharacter() {
    let audioPlayed = false;

    this.setStoppableInterval(() => {
      let distance = this.x - world.character.x;
      if (distance < 200) {
        this.moveLeft();
        this.playContinuousAnimation(this.imagesWalking, "chickenSmallWalking");
        this.muteAudioDying();
        if (!audioPlayed) {
          this.AUDIO_BWACK.play();
          audioPlayed = true;
        }
      }
    }, 30);
  }

  muteAudioDying() {
    setTimeout(() => {
      this.AUDIO_DYING.volume = 0;
    }, 2000);
  }

    /**
   * This function is called when the health-value of an enemy is 0. It stops its intervals and calls the animation for death.
   */
    enemyDies() {
      this.setStoppableInterval(() => {
        if (this.health === 0 || this.x < -100) {
          this.stopIntervalsMovableObjects();
          this.enemyDiesAnimation();
          this.playAudioDying();
          setTimeout(() => {
            this.deleteEnemy();
          }, 200);
        }
      }, 40);
    }

    playAudioDying() {
      this.AUDIO_DYING.play();
    }
}
