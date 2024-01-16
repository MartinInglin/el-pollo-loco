class RectangleCharacter {
    character;
    x;
    y;
    width;
    height;
    intervalIds = [];
  
    constructor() {
      checkWorldExistence().then(() => {
        this.character = world.character;
        this.getPositionCharacter();
        this.height = this.character.height -100;
        this.width = this.character.width - 80;
    });
    }
  
    getPositionCharacter() {
      let id = setInterval(() => {
        this.x = this.character.x + 30;
        this.y = this.character.y + 90;
      }, 40);
      this.intervalIds.push(id);
    }
  }
  
