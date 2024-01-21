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
  
    /**
     * This function gets the position of the character. It is needed to place the corresponding rectangle right above the character.
     */
    getPositionCharacter() {
      let id = setInterval(() => {
        this.x = this.character.x + 30;
        this.y = this.character.y + 90;
      }, 40);
      this.intervalIds.push(id);
    }
  }
  
