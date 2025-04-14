let debugging = false;
let game;

// sounds
let soundGameOver;
let soundPing;
let soundCrash;
let soundCollect;

function preload() {
  soundGameOver = loadSound('./sounds/synth.wav');
  soundCollect = loadSound('./sounds/powerUp.wav');
  soundCrash = loadSound('./sounds/explosion.wav');
  soundPing = loadSound('./sounds/blipSelect.wav');
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  // sounds
  let sounds = [soundGameOver, soundPing, soundCrash, soundCollect];
  for (let i = 0; i < sounds.length; i++) {
    sounds[i].setVolume(0.2);
    sounds[i].playMode('restart');
  }

  game = new Game();
  game.build();
}

function draw() {
  background(game.config.backgroundColor);

  game.config.default();
  game.update();
  game.draw();

  // DEBUG CODE =======================================================
  if (debugging) {
    stroke(100);
    fill(game.config.debugColor);

    // // lines
    for (let i = 0; i < game.entities.length; i++) {
      let entity = game.entities[i];
      line(width/2, height/2, entity.xActual, entity.yActual);
    }

    // // stats
    textAlign(LEFT);
    text(`fuel: ${parseInt(game.ship.fuel)}`, game.ship.x, game.ship.y + 20);
    text(`air:  ${parseInt(game.ship.air)}`, game.ship.x, game.ship.y + 34);
  }
}

// for pings only
function keyReleased() {
  if (key === ' ' && !game.ship.isPinging) {
    game.ship.ping();
  }
}

function mousePressed() {
  game.hud.sound = true;
}
