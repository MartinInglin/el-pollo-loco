class RectangleEnemy {
    enemy;
    x;
    y;
    width;
    height;

    constructor(enemy) {
        this.getPositionEnemy();
        this.enemy = enemy;
        this.height = this.enemy.height;
        this.width = this.enemy.width;
      }

    
      getPositionEnemy() {
        setInterval(() => {
          this.x = this.enemy.x;
          this.y = this.enemy.y;
        }, 40);
      }
  }