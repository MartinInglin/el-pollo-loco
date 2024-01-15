class RectangleCharacter {
    character;
    x;
    y;
    width;
    height;
  
    constructor() {
      this.checkWorldExistence();

    }
  
    checkWorldExistence() {
      const checkInterval = setInterval(() => {
        if (typeof world !== "undefined" && world !== null) {
          this.character = world.character;
          this.getPositionCharacter();
          clearInterval(checkInterval);
          this.height = this.character.height -100;
          this.width = this.character.width - 80;
        }
      }, 100);
    }
  
    getPositionCharacter() {
      setInterval(() => {
        this.x = this.character.x + 30;
        this.y = this.character.y + 90;
      }, 40);
    }
  }
  
