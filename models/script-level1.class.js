class ScriptLevel1 {
  triggerPoints = [
    {
      xCoordinate: 300,
      triggered: false,
      action: () => {
        this.createNewChicken(this.triggerPoints[0].xCoordinate + 500);
        this.createNewChicken(this.triggerPoints[0].xCoordinate + 1000);
        this.createNewChicken(this.triggerPoints[0].xCoordinate + 1100);
      },
    },
    {
      xCoordinate: 1500,
      triggered: false,
      action: () => {
        this.createNewChickenSmall(this.triggerPoints[1].xCoordinate + 500);
        this.createNewChickenSmall(this.triggerPoints[1].xCoordinate + 1000);
        this.createNewChickenSmall(this.triggerPoints[1].xCoordinate + 1100);
      },
    },
    {
        xCoordinate: 2800,
        triggered: false,
        action: () => {
          this.createNewChicken(this.triggerPoints[2].xCoordinate + 500);
          this.createNewChickenSmallFlying(this.triggerPoints[2].xCoordinate + 500, 150);
          this.createNewChickenSmall(this.triggerPoints[2].xCoordinate + 1000);
        },
      },
      {
        xCoordinate: 3800,
        triggered: false,
        action: () => {
          this.createNewChicken(this.triggerPoints[3].xCoordinate + 500);
          this.createNewChickenSmallFlying(this.triggerPoints[3].xCoordinate + 500, 200);
          this.createNewChicken(this.triggerPoints[3].xCoordinate + 600);
          this.createNewChickenSmallFlying(this.triggerPoints[3].xCoordinate + 600, 250);
          this.createNewChickenSmall(this.triggerPoints[3].xCoordinate + 800);
        },
      },
      {
        xCoordinate: 5000,
        triggered: false,
        action: () => {
          this.createNewChicken(this.triggerPoints[4].xCoordinate + 500);
          this.createNewChickenSmallFlying(this.triggerPoints[4].xCoordinate + 500, 150);
          this.createNewChicken(this.triggerPoints[4].xCoordinate + 600);
          this.createNewChickenSmallFlying(this.triggerPoints[4].xCoordinate + 600, 200);
          this.createNewChickenSmallFlying(this.triggerPoints[4].xCoordinate + 700, 250);
          this.createNewChickenSmall(this.triggerPoints[4].xCoordinate + 750);
          this.createNewChicken(this.triggerPoints[4].xCoordinate + 800);
          this.createNewChicken(this.triggerPoints[4].xCoordinate + 850);
          this.createNewChickenSmall(this.triggerPoints[4].xCoordinate + 900);
        },
      },
      {
        xCoordinate: 6400,
        triggered: false,
        action: () => {
          this.createEndboss(this.triggerPoints[5].xCoordinate + 500);

        },
      },
      
      
  ];

  constructor() {
    checkWorldExistence().then(() => {
      this.startScript();
    });
  }

  startScript() {
    setInterval(() => {
      const characterX = world.character.x;
      console.log(characterX);

      this.triggerPoints.forEach((triggerPoint) => {
        if (characterX > triggerPoint.xCoordinate && !triggerPoint.triggered) {
          triggerPoint.action();
          triggerPoint.triggered = true;
        }
      });
    }, 200);
  }

  createNewChicken(xPosition) {
    world.level.enemies.push(new Chicken(xPosition));
    world.collision.rectanglesEnemies = level1.enemies.map((enemy) => new RectangleEnemy(enemy));
  }

  createNewChickenSmall(xPosition) {
    world.level.enemies.push(new ChickenSmall(xPosition));
    world.collision.rectanglesEnemies = level1.enemies.map((enemy) => new RectangleEnemy(enemy));
  }

  createNewChickenSmallFlying(xPosition, yPosition) {
    world.level.enemies.push(new ChickenSmallFlying(xPosition, yPosition));
    world.collision.rectanglesEnemies = level1.enemies.map((enemy) => new RectangleEnemy(enemy));
  }

  createEndboss(xPosition) {
    world.level.enemies.push(new Endboss(xPosition));
    world.collision.rectanglesEnemies = level1.enemies.map((enemy) => new RectangleEnemy(enemy));
  }
}
