class RectangleEnboss extends MovableObject {
  enemy;

  constructor(enemy) {
    super();
    this.enemy = enemy;
    this.height = this.enemy.height - 80;
    this.width = this.enemy.width - 80;
    checkWorldExistence().then(() => {
      this.getPositionEnemy();
    });
  }

  /**
   * This function gets the position of the enemy. It is needed to place the corresponding rectangle right above the enemy.
   */
  getPositionEnemy() {
    this.setStoppableInterval(() => {
      this.x = this.enemy.x + 40;
      this.y = this.enemy.y + 40;
    }, 40);
  }
}
