let isMuted = false;

function toggleImage() {
    const volumeImage = document.getElementById('volumeImage');

    if (isMuted) {
        volumeImage.src = 'img/icons/volume.svg';
    } else {
        volumeImage.src = 'img/icons/volume_off.svg';
    }

    isMuted = !isMuted;
}

/**
 * This function leads the player back to the index page. It is called from a modal in game.html.
 */
function startGame() {
    window.location.href = "game.html";
  }