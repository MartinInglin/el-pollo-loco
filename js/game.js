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
