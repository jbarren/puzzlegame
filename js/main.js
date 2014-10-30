var PUZZLE_GAME = (function() {
  'use strict';

  function StageArea(stage) {
    //the bigger this value, the slower the falling speed
    var speed = 50;
    var speedCounter = 0;
    var area = (function() {
      var areaArray = new Array(10);
      for (var i = 0; i < 10; i++) {
        areaArray[i] = new Array(10);
      }
      return areaArray;
    }());

    function createPiece(color) {
      pieceInMovement = new Piece(Math.floor(Math.random() * 5));
      stage.addChild(pieceInMovement.getImage());
      area[pieceInMovement.getY()][pieceInMovement.getX()] = pieceInMovement;
    }

    var pieceInMovement = new Piece();

    function collectCoordsToRemove() {
      var coordsToRemove;
      var tempCoord;
      var prevColor;
      var sameCounter;
      var markedToRemove = (function() {
        var areaArray = new Array(10);
        for (var i = 0; i < 10; i++) {
          areaArray[i] = new Array(10);
        }
        return areaArray;
      }());
      for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
          if (!markedToRemove[i][j]) {
            searchForSameColor(i, j);
          }
        }
      }

      function searchForSameColor(a, b) {
        if (!area[a][b]) {
          markedToRemove[a][b] = 1;
          return;
        }
        var color = area[a][b].getColor();
        //up

      }
    }

    return {
      moveDown: function() {
        if (speedCounter < speed) {
          speedCounter++;
          return true;
        }
        speedCounter = 0;
        if (pieceInMovement.getY() >= 9 || area[pieceInMovement.getY() + 1][pieceInMovement.getX()]) {
          return false;
        }
        area[pieceInMovement.getY()][pieceInMovement.getX()] = undefined;
        pieceInMovement.moveDown();
        area[pieceInMovement.getY()][pieceInMovement.getX()] = pieceInMovement;
        return true;
      },
      moveLeft: function() {
        if (pieceInMovement.getX() <= 0 || area[pieceInMovement.getY()][pieceInMovement.getX() - 1]) {
          return false;
        }
        area[pieceInMovement.getY()][pieceInMovement.getX()] = undefined;
        pieceInMovement.moveLeft();
        area[pieceInMovement.getY()][pieceInMovement.getX()] = pieceInMovement;
        input.keyPressedAlready = true;
        input.left = false;
        return true;
      },
      moveRight: function() {
        if (pieceInMovement.getX() >= 9 || area[pieceInMovement.getY()][pieceInMovement.getX() + 1]) {
          return false;
        }
        area[pieceInMovement.getY()][pieceInMovement.getX()] = undefined;
        pieceInMovement.moveRight();
        area[pieceInMovement.getY()][pieceInMovement.getX()] = pieceInMovement;
        input.keyPressedAlready = true;
        input.right = false;
        return true;
      },
      createNewPiece: function() {
        if (area[0][5]) {
          return false;
        }
        createPiece();
        return true;
      },
      removeMatches: function() {
        var twoDimArray = collectCoordsToRemove();
        if (twoDimArray) {
          removeMatchesAndFall(twoDimArray);
          return true;
        }
        return false;
      }
    };
  }

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
      return stageArea.moveLeft();
    }
    if (input.right) {
      return stageArea.moveRight();
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
      checkMatch();
      if (!stageArea.createNewPiece()) {
        return false;
      }
    }
  }

  start();
}());