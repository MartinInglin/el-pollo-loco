let canvas;
let world;

/**
 * This function initializes the world. It is executed when game.html is loaded.
 */
function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas);
  //redirectOnRefreseh();
}

/**
 * This function leads the player to the index.html in case he refreshes the page.
 */
function redirectOnRefreseh() {
  const navigationEntries = performance.getEntriesByType("navigation");
  if (navigationEntries.length > 0 && navigationEntries[0].type === "reload") {
    window.location.href = "index.html";
  }
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
 * This function leads the player back to the index page. It is called from a modal in game.html.
 */
function goToMenu() {
  window.location.href = 'index.html';
}