let canvas;
let world;
let keyboard = new Keyboard();
let divCanvas = document.getElementById('divCanvas');
let fullscreenState = false;


//pre-game & in game audios
let gameAudio = new Audio();
gameAudio.src = './audio/game1.wav';
gameAudio.loop = true;
gameAudio.volume = 0.1;

let soundOn = false;


function init() {
  detectMobileDevice();
}

/**
 * Starts the game by performing necessary setup tasks.
 */
function startGame() {
  detectMobileDevice();
  document.getElementById('startButton').classList.add('d-none');
  document.getElementById('startImage').classList.add('d-none');
  document.getElementById('icons').classList.remove('d-none');
  initLevel();
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard);
  mobileButtonsPressEvents();
}

/**
 * Plays or pauses the game sound.
 */
function playGameSound() {
  let icon = document.getElementById('playGameSound');
  if (soundOn) {
    icon.classList.remove("bi-volume-up-fill");
    icon.classList.add("bi-volume-mute");
    gameAudio.pause();
    soundOn = false;
  } else {
    icon.classList.remove("bi-volume-mute");
    icon.classList.add("bi-volume-up-fill");
    gameAudio.play();
    soundOn = true;
  }
}




/**
 * Add event listeners to the keyboard keys
 */

window.addEventListener("keydown", (e) => {
  if (e.keyCode == 39) {
    keyboard.RIGHT = true;
  }

  if (e.keyCode == 37) {
    keyboard.LEFT = true;
  }

  if (e.keyCode == 38) {
    keyboard.UP = true;
  }

  if (e.keyCode == 40) {
    keyboard.DOWN = true;
  }

  if (e.keyCode == 32) {
    keyboard.SPACE = true;
  }

  if (e.keyCode == 68) {
    keyboard.D = true;
  }
});


/**
 * Add event listeners to the keyboard keys
 */

window.addEventListener("keyup", (e) => {
  if (e.keyCode == 39) {
    keyboard.RIGHT = false;
  }

  if (e.keyCode == 37) {
    keyboard.LEFT = false;
  }

  if (e.keyCode == 38) {
    keyboard.UP = false;
  }

  if (e.keyCode == 40) {
    keyboard.DOWN = false;
  }

  if (e.keyCode == 32) {
    keyboard.SPACE = false;
  }

  if (e.keyCode == 68) {
    keyboard.D = false;
  }
});

/**
 * Add event listeners to the buttons on the screen for mobile devices
 */
function mobileButtonsPressEvents() {
  document.getElementById('mobileLeft').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.LEFT = true;
  });

  document.getElementById('mobileLeft').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.LEFT = false;
  });

  document.getElementById('mobileRight').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.RIGHT = true;
  });

  document.getElementById('mobileRight').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.RIGHT = false;
  });

  document.getElementById('mobileUp').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.SPACE = true;
  });

  document.getElementById('mobileUp').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.SPACE = false;
  });

  document.getElementById('mobileThrow').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.D = true;
  });

  document.getElementById('mobileThrow').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.D = false;
  });
}


/**
 * Renders the game over state.
 */
function renderGameOver() {
  document.getElementById('gameOver').style.display = "flex";
  delete world;
  canvas.style.display = "none";
  clearAllIntervals();
  
}


/**
 * Navigates back to the menu or restarts the game.
 */
function backToMenuButton() {
  window.location.reload();

  setTimeout(() => {
    document.getElementById('gameOver').classList.add('d-none');
  }, 2000);
}

/**
 * toggles between fullscreen and exit fullscreen with a single button
 */
function fullscreen() {
  if (canvas.requestFullscreen) {
    canvas.requestFullscreen();
  } else if (canvas.mozRequestFullScreen) { /* Firefox */
    canvas.mozRequestFullScreen();
  } else if (canvas.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    canvas.webkitRequestFullscreen();
  } else if (canvas.msRequestFullscreen) { /* IE/Edge */
    canvas.msRequestFullscreen();
  }
}

/**
 * Detects if the user is accessing the game on a mobile device.
 */
function detectMobileDevice() {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    document.getElementById('controls').classList.add('d-none');
    // document.getElementById('canvas').classList.add('fullscreenDisplay');
    // document.getElementById('canvas').classList.remove('canvas');
    // document.getElementById('mobileBtns').classList.remove('d-none');
    showMobileButtons();
  } else {
    hideMobileButtons();
  }
}

/**
 * Shows the mobile buttons or controls.
 */
function showMobileButtons() {
  document.getElementById('mobileBtns').classList.remove('d-none');
}

/**
 * Hides the mobile buttons or controls.
 */
function hideMobileButtons() {
  document.getElementById('mobileBtns').classList.add('d-none');
}

function initDetect() {
  window.addEventListener("resize", detectDevice);
}

function clearAllIntervals() {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
}



