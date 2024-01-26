class Endboss extends MovableObject {
  height = 300;
  width= 300;
  y = 170;
  speed = 10;
  adjustmentSprite = 0;
  health = 20;
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
  ]
  imagesAttack = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ]
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
  ]
  imagesDead = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ]
  AUDIO_WALKING = new Audio('audio/quick-run-cartoony.mp3')

  constructor(xPosition) {
    super().loadImage(this.imagesWalking[0]);
    this.loadImages(this.imagesWalking);
    this.loadImages(this.imagesAlert);
    this.loadImages(this.imagesAttack);
    this.loadImages(this.imagesHurt);
    this.loadImages(this.imagesDead);
    this.loadImages(this.imagesFly);

    this.x = xPosition;

    this.applyGravityEndboss();
    this.intervalForChecks();
  }

  applyGravityEndboss() {
    this.setStoppableInterval(this.applyGravity, 40)
  }

  walkingAnimation() {
      this.playContinuousAnimation(this.imagesWalking, "walking");
  }

  alertAnimation() {
    this.playSingleRunAnimation(this.imagesAlert, "alert");
  }

  attackAnimation() {
    this.setStoppableInterval(() => {
      this.playContinuousAnimation(this.imagesAttack, "attack");
    }, 200, "attackAnimationEndboss");
  }

  deadAnimation() {
    this.playSingleRunAnimation(this.imagesAlert, "die");
  }

  hurtAnimation() {
    this.playSingleRunAnimation(this.imagesHurt, "hurt");
  }

  jump() {
        this.speedY = 35;
  }

  //delete after Tests
  intervalForChecks() {
    setInterval(() => {
    }, 1000);
  }
}
