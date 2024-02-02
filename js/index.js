const url = new URL(window.location.href);
let volumeMusic = url.searchParams.get("volumeMusic") || 1;
let volumeEffects = url.searchParams.get("volumeEffects") || 1;
let AUDIO_MENU_MUSIC = new Audio("audio/music/menu.mp3");

function init() {
  hidePopOver();
  AUDIO_MENU_MUSIC.loop = true;
  AUDIO_MENU_MUSIC.volume = 1;
  AUDIO_MENU_MUSIC.play();
  checkRadiobuttonsVolumes("Music");
  checkRadiobuttonsVolumes("Effects");
  setCheckedVolumes();
}

function startGame() {
  const url = new URL("game.html", window.location.href);
  url.searchParams.set("volumeMusic", volumeMusic);
  url.searchParams.set("volumeEffects", volumeEffects);
  window.location.href = url.href;
}

function hidePopOver() {
  document.getElementById("popOver").classList.add("d-none");
  userVisitedPage = true;
}

/**
 * This function creates the eventlisteners. They listen if the user changes the volume settings in the settings screen.
 *
 * @param {string} volumeType - Either "Music" or "Effects"
 */
function checkRadiobuttonsVolumes(volumeType) {
  for (let i = 0; i <= 4; i++) {
    const inputElement = document.getElementById(`volume${volumeType}${i}`);

    inputElement.addEventListener("change", () => {
      updateVolume(volumeType);
    });
  }
}

/**
 * This function changes the variables volumeMusic and volumeEffects.
 *
 * @param {string} volumeType - Either "Music" or "Effects"
 */
function updateVolume(volumeType) {
  for (let i = 0; i <= 4; i++) {
    const inputElement = document.getElementById(`volume${volumeType}${i}`);

    if (inputElement.checked) {
      if (volumeType === "Music") {
        volumeMusic = i / 4;
        changeVolumeMusic();
      } else if (volumeType === "Effects") {
        volumeEffects = i / 4;
      }
    }
  }
}

/**
 * This function changes the volume of the music in the menu.
 */
function changeVolumeMusic() {
  AUDIO_MENU_MUSIC.volume = 1 * volumeMusic;
}

/**
 * This function sets the radio buttons according to the values the player has set them. It is especially needed when the player goes back and forth between the index.html and the game.html. The line in the for loop is a short form of an if statement.
 */
function setCheckedVolumes() {
  const volumeMusicValue = volumeMusic * 4;
  const volumeEffectsValue = volumeEffects * 4;

  for (let i = 0; i <= 4; i++) {
    const inputElement = document.getElementById(`volumeMusic${i}`);
    inputElement.checked = i === volumeMusicValue;
  }

  for (let i = 0; i <= 4; i++) {
    const inputElement = document.getElementById(`volumeEffects${i}`);
    inputElement.checked = i === volumeEffectsValue;
  }
}
