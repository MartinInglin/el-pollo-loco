class Endboss extends MovableObject {
  height = 300;
  width = 300;
  y = 170;
  speed = 10;
  adjustmentSprite = 0;
  health = 100;
  imagesWalking = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];
  imagesAlert = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];
  imagesAttack = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];
  imagesHurt = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];
  imagesDead = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];
  AUDIO_WALKING = new Audio("audio/quick-run-cartoony.mp3");

  constructor(xPosition) {
    super().loadImage(this.imagesWalking[0]);
    this.loadImages(this.imagesWalking);
    this.loadImages(this.imagesAlert);
    this.loadImages(this.imagesAttack);
    this.loadImages(this.imagesHurt);
    this.loadImages(this.imagesDead);

    this.x = xPosition;

    this.applyGravityEndboss();
  }

  /**
   * This function applies gravity for the endboss. It has a separate ID because it needs to be stopped at a certain time of the fight.
   */
  applyGravityEndboss() {
    this.setStoppableInterval(this.applyGravity, 40, "applyGravityEndboss");
  }

  /**
   * This funcion calls the walking animation.
   */
  walkingAnimation() {
    this.playContinuousAnimation(this.imagesWalking, "walking");
  }

  /**
   * This function calls the alert animation.
   */
  alertAnimation() {
    this.playSingleRunAnimation(this.imagesAlert, "alert");
  }

  /**
   * This function calls the attack animation.
   */
  attackAnimation() {
    this.setStoppableInterval(
      () => {
        this.playContinuousAnimation(this.imagesAttack, "attack");
      },
      200,
      "attackAnimationEndboss"
    );
  }

  /**
   * This function calls the hurt animation.
   */
  hurtAnimation() {
    this.playSingleRunAnimation(this.imagesHurt, "hurt");
  }

  /**
   * This function calls the dying animation.
   */
  dieAnimation() {
    this.playSingleRunAnimation(this.imagesDead, "die");
  }

  /**
   * This function executes a jump.
   */
  jump() {
    this.speedY = 35;
  }
}
