let canvas;
let world;
let fullscreenOn = false;
let userVisitedPage = true;
let isMuted = false;

/**
 * This function initializes the world. It is executed when game.html is loaded.
 */
function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas);
}

/**
 * This function checks if the world exists. It is used by many different objects and is therefore in the game.js.
 *
 * @returns - boolean
 */
function checkWorldExistence() {
  return new Promise((resolve) => {
    const checkInterval = setInterval(() => {
      if (typeof world !== "undefined" && world !== null) {
        clearInterval(checkInterval);
        resolve();
      }
    }, 100);
  });
}

/**
 * This function reloads the page if the player wants to restart the game. It is called from a modal in game.html.
 */
function refreshPage() {
  location.reload();
}

/**
 * This function leads the player back to the index page. It is called from a modal in game.html. It transmitts also the values for the volumes.
 */
function goToMenu() {
  const url = new URL("index.html", window.location.href);
  url.searchParams.set("volumeMusic", world.audioControl.volumeMusic);
  url.searchParams.set("volumeEffects", world.audioControl.volumeEffects);
  window.location.href = url.href;
}

/**
 * This function toggles the image of the mute button.
 */
function toggleImageMute() {
  const volumeImage = document.getElementById("volumeImage");

  if (isMuted) {
    volumeImage.src = "img/icons/volume.svg";
  } else {
    volumeImage.src = "img/icons/volume_off.svg";
  }
  isMuted = !isMuted;
}
