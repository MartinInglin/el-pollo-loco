class Keyboard {
  LEFT = false;
  RIGHT = false;
  UP = false;
  DOWN = false;
  SPACE = false;

  constructor() {

    document.addEventListener("keydown", (event) => {
      this.handleKeyDown(event.key);
    });

    document.addEventListener("keyup", (event) => {
      this.handleKeyUp(event.key);
    });

    this.handleTouchEvents();
  }

  /**
   * This function handles the keydown events. It sets the corresponding variables to true. The objects can listen to these changes.
   * 
   * @param {event} key - Key down
   */
  handleKeyDown(key) {
    switch (key) {
      case "ArrowLeft":
        this.LEFT = true;
        break;
      case "ArrowRight":
        this.RIGHT = true;
        break;
      case "ArrowUp":
        this.UP = true;
        break;
      case "ArrowDown":
        this.DOWN = true;
        break;
      case " ": // Space key
        this.SPACE = true;
        break;
    }
  }

  /**
   * This function handles the keyup events. It sets the corresponding variables to false. The objects can listen to these changes.
   * @param {event} key - Key up
   */
  handleKeyUp(key) {
    switch (key) {
      case "ArrowLeft":
        this.LEFT = false;
        break;
      case "ArrowRight":
        this.RIGHT = false;
        break;
      case "ArrowUp":
        this.UP = false;
        break;
      case "ArrowDown":
        this.DOWN = false;
        break;
      case " ": // Space key
        this.SPACE = false;
        break;
    }
  }

  handleTouchEvents() {
    document.getElementById('touchButtonLeft').addEventListener("touchstart", () => {
      this.LEFT = true;
    });
  
    document.getElementById('touchButtonLeft').addEventListener("touchend", () => {
      this.LEFT = false;
    });
  
    document.getElementById('touchButtonRight').addEventListener("touchstart", () => {
      this.RIGHT = true;
    });
  
    document.getElementById('touchButtonRight').addEventListener("touchend", () => {
      this.RIGHT = false;
    });

    document.getElementById('touchButtonJump').addEventListener("touchstart", () => {
      this.UP = true;
    });
  
    document.getElementById('touchButtonJump').addEventListener("touchend", () => {
      this.UP = false;
    });
  
    document.getElementById('touchButtonThrowBottle').addEventListener("touchstart", () => {
      this.SPACE = true;
    });
  
    document.getElementById('touchButtonThrowBottle').addEventListener("touchend", () => {
      this.SPACE = false;
    });
  }
  

}
