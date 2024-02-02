class AudioControl {
  constructor() {
    this.url = new URL(window.location.href);
    this.volumeMusic = this.url.searchParams.get("volumeMusic");
    this.volumeEffects = this.url.searchParams.get("volumeEffects");
    this.isMuted = false;

    checkWorldExistence().then(() => {
      setInterval(() => {
        this.setVolumeEffectsCharacter();
        this.setVolumeEffectsChicken();
        this.setVolumeEffectsChickenSmall();
        this.setVolumeEffectsChickenFlying();
        this.setVolumeEffectsEndboss();
        this.setVolumeEffectsCoins();
        this.setVolumeEffectsBottles();
        this.setVolumeEffectsBottlesThrowable();

        this.setVolumeMusicLevel1();
      }, 100);
    });
  }

  /**
   * This function contains all the volumes of the character sound effects.
   */
  setVolumeEffectsCharacter() {
    if (world.character) {
      const character = world.character;

      character.AUDIO_WALKING.volume = 0.2 * this.volumeEffects;
      character.AUDIO_JUMP.volume = 0.5 * this.volumeEffects;
      character.AUDIO_THROW.volume = 0.6 * this.volumeEffects;
      character.AUDIO_HURT.volume = 1 * this.volumeEffects;
      character.AUDIO_DIE.volume = 1 * this.volumeEffects;
      character.AUDIO_SNORE.volume = 0.3 * this.volumeEffects;
    }
  }

  /**
   * This function contains all the volumes of the chicken sound effects.
   */
  setVolumeEffectsChicken() {
    if (world.level.enemies) {
      world.level.enemies.forEach((enemy) => {
        if (enemy instanceof Chicken) {
          enemy.AUDIO_WALKING.volume = 0.5 * this.volumeEffects;
          enemy.AUDIO_IS_HIT.volume = 1 * this.volumeEffects;
          enemy.AUDIO_CHICKEN_DROPPED.volume = 1 * this.volumeEffects;
        }
      });
    }
  }

  /**
   * This function contains all the volumes of the small chicken sound effects.
   */
  setVolumeEffectsChickenSmall() {
    if (world.level.enemies) {
      world.level.enemies.forEach((enemy) => {
        if (enemy instanceof ChickenSmall) {
          enemy.AUDIO_BWACK.volume = 0.5 * this.volumeEffects;
          enemy.AUDIO_DYING.volume = 1 * this.volumeEffects;
        }
      });
    }
  }

  /**
   * This function contains all the volumes of the flying chicken sound effects.
   */
  setVolumeEffectsChickenFlying() {
    if (world.level.enemies) {
      world.level.enemies.forEach((enemy) => {
        if (enemy instanceof ChickenSmallFlying) {
          enemy.AUDIO_DYING.volume = 1 * this.volumeEffects;
          enemy.AUDIO_FLYING.volume = 0.3 * this.volumeEffects;
        }
      });
    }
  }

  /**
   * This function contains all the volumes of the endboss sound effects.
   */
  setVolumeEffectsEndboss() {
    if (world.level.endboss[0]) {
      const endboss = world.level.endboss[0];

      endboss.AUDIO_FLYING.volume = 0.2 * this.volumeEffects;
      endboss.AUDIO_ANGRY.volume = 1 * this.volumeEffects;
      endboss.AUDIO_HURT.volume = 1 * this.volumeEffects;
      endboss.AUDIO_GRILL.volume = 0.5 * this.volumeEffects;
    }
  }

  /**
   * This function contains all the volumes of the coins sound effects.
   */
  setVolumeEffectsCoins() {
    if (world.level.coins) {
      world.level.coins.forEach((coin) => {
        coin.AUDIO_COIN_COLLECTED.volume = 0.6 * this.volumeEffects;
      });
    }
  }

  /**
   * This function contains all the volumes of the bottles sound effects.
   */
  setVolumeEffectsBottles() {
    if (world.level.bottles) {
      world.level.bottles.forEach((bottle) => {
        bottle.AUDIO_PICK_UP_BOTTLE.volume = 0.3 * this.volumeEffects;
      });
    }
  }

  /**
   * This function contains all the volumes of the thrown bottles sound effects.
   */
  setVolumeEffectsBottlesThrowable() {
    if (world.level.throwableBottles) {
      world.level.throwableBottles.forEach((throwableBottle) => {
        throwableBottle.AUDIO_BOTTLE_FLYING.volume = 0.5 * this.volumeEffects;
        throwableBottle.AUDIO_BOTTLE_SPLASH.volume = 0.8 * this.volumeEffects;
      });
    }
  }

  /**
   * This function contains all the volumes of the music played in level 1.
   */
  setVolumeMusicLevel1() {
    if (world.level.script) {
      const script = world.level.script;

      script.AUDIO_MUSIC_GAME.volume = 1 * this.volumeMusic;
      script.AUDIO_MUSIC_INTRO_ENDBOSS.volume = 0.4 * this.volumeMusic;
      script.AUDIO_MUSIC_ENDBOSS.volume = 1 * this.volumeMusic;
      script.AUDIO_MUSIC_WIN.volume = 1 * this.volumeMusic;
      script.AUDIO_MUSIC_LOOSE.volume = 1 * this.volumeMusic;
    }
  }

  /**
   * This function toggles the music and the effects volumes from mute to "as was before". These values are read from the URL where they are stored.
   */
  toggleMute() {
    if (!this.isMuted) {
      this.volumeMusic = 0;
      this.volumeEffects = 0;
      this.isMuted = true;
    } else {
      this.volumeMusic = this.url.searchParams.get("volumeMusic");
      this.volumeEffects = this.url.searchParams.get("volumeEffects");
      this.isMuted = false;
    }
  }
}
