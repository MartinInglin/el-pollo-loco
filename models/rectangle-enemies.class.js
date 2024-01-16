class RectangleEnemy {
  enemy;
  x;
  y;
  width;
  height;
  intervalIdsRectangleEnemy = [];

  constructor(enemy) {
    this.enemy = enemy;
    this.height = this.enemy.height;
    this.width = this.enemy.width;
    checkWorldExistence().then(() => {
      this.getPositionEnemy();
    });
  }

  getPositionEnemy() {
    let id = setInterval(() => {
      this.x = this.enemy.x;
      this.y = this.enemy.y;
    }, 40);
    this.intervalIdsRectangleEnemy.push(id);
  }
}
