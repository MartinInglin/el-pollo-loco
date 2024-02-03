class Keyboard {
  LEFT = false;
  RIGHT = false;
  UP = false;
  DOWN = false;
  SPACE = false;
  THROW = false;

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
      case "a":
        this.LEFT = true;
        break;
      case "d":
        this.RIGHT = true;
        break;
      case "w":
        this.UP = true;
        break;
      case "ArrowDown":
        this.DOWN = true;
        break;
      case " ": // Space key
        this.UP = true;
        break;
      case "e":
        this.THROW = true;
        break;
    }
  }

  /**
   * This function handles the keyup events. It sets the corresponding variables to false. The objects can listen to these changes.
   * @param {event} key - Key up
   */
  handleKeyUp(key) {
    switch (key) {
      case "a":
        this.LEFT = false;
        break;
      case "d":
        this.RIGHT = false;
        break;
      case "w":
        this.UP = false;
        break;
      case "ArrowDown":
        this.DOWN = false;
        break;
      case " ": // Space key
        this.UP = false;
        break;
      case "e":
        this.THROW = false;
        break;
    }
  }

  // Call handleTouchEvents for each touch event
  handleTouchEvents() {
    this.handleTouchEvent("LEFT", "touchButtonLeft", "touchButtonLeft");
    this.handleTouchEvent("RIGHT", "touchButtonRight", "touchButtonRight");
    this.handleTouchEvent("UP", "touchButtonJump", "touchButtonJump");
    this.handleTouchEvent("SPACE", "touchButtonThrowBottle", "touchButtonThrowBottle");
  }

  /**
   * This function handles the touch events when the player is on a mobile device.
   *
   * @param {string} key - Key corresponding to the touch event
   * @param {string} startElementId - HTML element ID for touchstart
   * @param {string} endElementId - HTML element ID for touchend
   */
  handleTouchEvent(key, startElementId, endElementId) {
    const startElement = document.getElementById(startElementId);
    const endElement = document.getElementById(endElementId);

    startElement.addEventListener("touchstart", () => {
      this[key] = true;
    });

    endElement.addEventListener("touchend", () => {
      this[key] = false;
    });
  }
}
