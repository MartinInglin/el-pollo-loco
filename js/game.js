let canvas;
let world;
let fullscreenOn = false;
let userVisitedPage = true;
let isMuted = false;
let userCheckedOrientation = false;
let modalLandscape;
let portrait;

/**
 * This function initializes the world. It is executed when game.html is loaded.
 */
function init() {
  canvas = document.getElementById("canvas");
  modalLandscape = new bootstrap.Modal(document.getElementById("staticBackdropLandscape"));
  portrait = window.matchMedia("(orientation: portrait)").matches;
  world = new World(canvas);
  showModalLandscape();
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
    volumeImage.src = "img/icons/volume-off.svg";
  }
  isMuted = !isMuted;
}

/**
 * This eventlistener checks if the user is in landscape or upright orientation. If he is in upright orientation a modal asks him to change orientation.
 */
window.matchMedia("(orientation: portrait)").addEventListener("change", (e) => {
  const portrait = e.matches;

  if (portrait && !userCheckedOrientation) {
    modalLandscape.show();
  } else {
    modalLandscape.hide();
  }
});

/**
 * This function is used if the user is initially in upright orientation. If so a modal asks him to change orientation.
 */
function showModalLandscape() {
  if (portrait) {
    modalLandscape.show();
  }
}

/**
 * This function changes the variable. If the user once confirms he wants to play in upright orientation, then this decision is accepted.
 */
function userCheckedOrientationModal() {
  userCheckedOrientation = true;
}