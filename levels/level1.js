const level1 = {
  enemies: [],
  endboss: [],
  clouds: [new Cloud(0), new Cloud(1), new Cloud(2), new Cloud(3)],
  coins: [new Coin(300), new Coin(400), new Coin(1200), new Coin(1600), new Coin(1700)],
  bottles: [new Bottle(700), new Bottle(1000), new Bottle(1550)],
  throwableBottles: [new BottleThrowable(), new BottleThrowable()],
  backgroundObjects: [],
  backgroundReproductionCountX: 10,
  backgroundImagePaths: [
    [
      "img/5_background/layers/air.png",
      "img/5_background/layers/3_third_layer/1.png",
      "img/5_background/layers/2_second_layer/1.png",
      "img/5_background/layers/1_first_layer/1.png",
    ],
    [
      "img/5_background/layers/air.png",
      "img/5_background/layers/3_third_layer/2.png",
      "img/5_background/layers/2_second_layer/2.png",
      "img/5_background/layers/1_first_layer/2.png",
    ],
  ],
  script: new ScriptLevel1(),
};
