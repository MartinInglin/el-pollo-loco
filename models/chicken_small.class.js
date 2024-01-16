class ChickenSmall extends MovableObject {
  height = 40;
  width = 40;
  y = 400;
  speed = 10;
  imageResting = ["img/3_enemies_chicken/chicken_small/1_walk/2_w.png"];
  imagesWalking = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];
  AUDIO_BWACK = new Audio("audio/bwack.mp3");

  constructor() {
    super().loadImage(this.imageResting[0]);
    this.loadImages(this.imagesWalking);
    this.x = Math.random() * (1500 - 700) + 700;

    checkWorldExistence().then(() => {
    this.startMovingTowardsCharacter();
    });
  }

  /**
   * This function checks if the character is within 400 pixels of the character. It then executes the walking animation and the movement. Because the small chicken runs faster than the character there is no need to retrigger the function.
   */
  startMovingTowardsCharacter() {
    let audioPlayed = false;

    let id = setInterval(() => {
      if (world) {
        let distance = this.x - world.character.x;
        if (distance < 400) {
          this.moveLeft();
          this.walkingAnimation();
          if (!audioPlayed) {
            this.AUDIO_BWACK.play();
            audioPlayed = true;
          }
        }
      }
    }, 30);
  }
}
