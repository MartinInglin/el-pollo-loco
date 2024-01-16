const level1 = {
  enemies: [
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new ChickenSmall(),
    new ChickenSmall(),
    new ChickenSmall(),
    new Endboss(),
  ],
  clouds: [new Cloud(1), new Cloud(2), new Cloud(3)],
  coins: [new Coin(), new Coin(), new Coin(), new Coin(), new Coin(), new Coin()],
  backgroundObjects: [],
  backgroundReproductionCountX: [1, 2, 3],
  backgroundImagePaths: ["air", "3_third_layer/", "2_second_layer/", "1_first_layer/"],
};
