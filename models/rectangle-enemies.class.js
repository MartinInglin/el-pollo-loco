class RectangleEnemy extends MovableObject {
  enemy;

  constructor(enemy) {
    super();
    this.enemy = enemy;
    this.height = this.enemy.height;
    this.width = this.enemy.width;
    checkWorldExistence().then(() => {
      this.getPositionEnemy();
    });
  }

  /**
   * This function gets the position of the enemy. It is needed to place the corresponding rectangle right above the enemy.
   */
  getPositionEnemy() {
    this.setStoppableInterval(() => {
      this.x = this.enemy.x;
      this.y = this.enemy.y;
    }, 40);
  }
}
