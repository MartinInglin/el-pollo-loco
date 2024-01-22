const level1 = {
  enemies: [
    new Chicken(800),
    new Chicken(1400),
    new Chicken(1500),
    new ChickenSmall(1000),
    new ChickenSmall(1200),
    new ChickenSmall(1500),
    new Endboss(),
  ],
  clouds: [new Cloud(0), new Cloud(1), new Cloud(2), new Cloud(3)],
  coins: [new Coin(300), new Coin(400), new Coin(1200), new Coin(1600), new Coin(1700)],
  bottles: [new Bottle(700), new Bottle(1000), new Bottle(1550)],
  throwableBottles: [new BottleThrowable(), new BottleThrowable()],
  backgroundObjects: [],
  backgroundReproductionCountX: 4,
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
};
