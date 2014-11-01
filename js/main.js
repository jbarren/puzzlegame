var PUZZLE_GAME = (function() {
  'use strict';
  var stage;
  var renderer;
  var stageArea;
  var input = {
    left: false,
    right: false,
    keyPressedAlready: false
  };

  function start() {
    stage = new PIXI.Stage(0x66FF99);
    renderer = PIXI.autoDetectRenderer(600, 600);
    document.body.appendChild(renderer.view);
    stageArea = new StageArea(stage);
    stageArea.createNewPiece();
    initializeKeyboardListeners();
    requestAnimFrame(animate);
  }

  function initializeKeyboardListeners() {
    document.addEventListener('keydown', function(ev) {
      return onkey(ev, ev.keyCode, true);
    }, false);
    document.addEventListener('keyup', function(ev) {
      return onkey(ev, ev.keyCode, false);
    }, false);
  }

  function onkey(ev, key, pressed) {
    if (!pressed) {
      input.keyPressedAlready = false;
    }
    if (input.keyPressedAlready) {
      return false;
    }
    switch (key) {
      case KEY.LEFT:
        input.left = pressed;
        ev.preventDefault();
        break;
      case KEY.RIGHT:
        input.right = pressed;
        ev.preventDefault();
        break;
    }
  }

  function handleInput() {
    //if by any chance both left and right are pressed don't move
    if (input.left && input.right) {
      return false;
    }
    if (input.left) {
      return stageArea.moveLeft(input);
    }
    if (input.right) {
      return stageArea.moveRight(input);
    }
  }

  function checkMatch() {
    if (stageArea.removeMatches()) {
      renderer.render(stage);
      requestAnimFrame(animate);
      checkMatch();
    }
  }

  function animate() {
    if (runGame() === false) {
      return;
    }
    renderer.render(stage);
    requestAnimFrame(animate);
  }

  function runGame() {
    handleInput();
    if (stageArea.moveDown() === false) {
      // checkMatch();
      if (!stageArea.createNewPiece()) {
        return false;
      }
    }
  }

  start();
}());