var PUZZLE_GAME = (function () {
    'use strict';
    function StageArea(stage) {
        //the bigger this value, the slower the falling speed
        var speed = 50;
        var speedCounter = 0;
        var area = (function () {
            var areaArray = new Array(10);
            for (var i = 0; i < 10; i++) {
                areaArray[i] = new Array(10);
            }
            return areaArray;
        }());

        var pieceInMovement = new Piece();

        function Piece(colorNumber) {
            var _color;
            var _texture;
            switch (colorNumber) {
                case 0:
                    _color = 'blue';
                    _texture = PIXI.Texture.fromImage("../images/square_blue.png");
                    break;

                case 1:
                    _color = 'green';
                    _texture = PIXI.Texture.fromImage("../images/square_green.png");
                    break;

                case 2:
                    _color = 'red';
                    _texture = PIXI.Texture.fromImage("../images/square_red.png");
                    break;

                case 3:
                    _color = 'white';
                    _texture = PIXI.Texture.fromImage("../images/square_white.png");
                    break;

                case 4:
                    _color = 'yellow';
                    _texture = PIXI.Texture.fromImage("../images/square_yellow.png");
                    break;
                default :
                    _color = 'white';
                    _texture = PIXI.Texture.fromImage("../images/square_white.png");
                    break;
            }

            var _image = new PIXI.Sprite(_texture);
            var x = 5;
            var y = 0;
            area[y][x] = this;
            _image.position.x = x * 50;
            _image.position.y = y * 50;
            stage.addChild(_image);
            return {
                getX: function () {
                    return x;
                },
                getY: function () {
                    return y;
                },
                getColor: function () {
                    return _color;
                },
                moveDown: function () {
                    area[y][x] = undefined;
                    y++;
                    area[y][x] = this;
                    _image.position.y = y * 50;
                },
                moveLeft: function () {
                    area[y][x] = undefined;
                    x--;
                    area[y][x] = this;
                    _image.position.x = x * 50;
                },
                moveRight: function () {
                    area[y][x] = undefined;
                    x++;
                    area[y][x] = this;
                    _image.position.x = x * 50;
                }
            };
        }

        function collectCoordsToRemove(){
            var coordsToRemove;
            var tempCoord;
            var prevColor;
            var sameCounter;
            var markedToRemove = (function () {
                var areaArray = new Array(10);
                for (var i = 0; i < 10; i++) {
                    areaArray[i] = new Array(10);
                }
                return areaArray;
            }());
            for(var i=0;i<10;i++){
                for(var j= 0;j<10;j++){
                  if(!markedToRemove[i][j]){
                    searchForSameColor(i, j);
                  }
                }
            }

            function searchForSameColor(a, b){
              if(!area[a][b]){
                markedToRemove[a][b] = 1;
                return;
              }
              var color = area[a][b].getColor();
              //up

            }
        }



        return {
            moveDown: function () {
                if (speedCounter < speed) {
                    speedCounter++;
                    return true;
                }
                speedCounter = 0;
                if (pieceInMovement.getY() >= 9 || area[pieceInMovement.getY() + 1][pieceInMovement.getX()]) {
                    return false;
                }
                pieceInMovement.moveDown();
                return true;
            },
            moveLeft: function () {
                if (pieceInMovement.getX() <= 0 || area[pieceInMovement.getY()][pieceInMovement.getX() - 1]) {
                    return false;
                }
                pieceInMovement.moveLeft();
                input.keyPressedAlready = true;
                input.left = false;
                return true;
            },
            moveRight: function () {
                if (pieceInMovement.getX() >= 9 || area[pieceInMovement.getY()][pieceInMovement.getX() + 1]) {
                    return false;
                }
                pieceInMovement.moveRight();
                input.keyPressedAlready = true;
                input.right = false;
                return true;
            },
            createNewPiece: function () {
                if (area[0][5]) {
                    return false;
                }
                pieceInMovement = new Piece(Math.floor(Math.random() * 5));
                return true;
            },
            removeMatches: function () {
                var twoDimArray = collectCoordsToRemove();
                if(twoDimArray){
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
        document.addEventListener('keydown', function (ev) {
            return onkey(ev, ev.keyCode, true);
        }, false);
        document.addEventListener('keyup', function (ev) {
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
        if(stageArea.removeMatches()){
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
