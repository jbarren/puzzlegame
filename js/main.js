'use strict';
var PUZZLE_GAME = (function () {
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

        function Piece() {
            var texture = PIXI.Texture.fromImage("../images/square.png");
            var image = new PIXI.Sprite(texture);
            var x = 5;
            var y = 0;
            area[y][x] = this;
            image.position.x = x * 50;
            image.position.y = y * 50;
            stage.addChild(image);
            return {
                getX: function () {
                    return x;
                },
                getY: function () {
                    return y;
                },
                moveDown: function () {
                    area[y][x] = undefined;
                    y++;
                    area[y][x] = this;
                    image.position.y = y * 50;
                },
                moveLeft: function () {
                    area[y][x] = undefined;
                    x--;
                    area[y][x] = this;
                    image.position.x = x * 50;
                },
                moveRight: function () {
                    area[y][x] = undefined;
                    x++;
                    area[y][x] = this;
                    image.position.x = x * 50;
                }
            };
        };

        return {
            moveDown: function () {
                if (speedCounter < speed) {
                    speedCounter++;
                    return true;
                }
                speedCounter = 0;
                if (pieceInMovement.getY() >= 9
                    || area[pieceInMovement.getY() + 1][pieceInMovement.getX()]) {
                    return false;
                }
                pieceInMovement.moveDown();
                return true;
            },
            moveLeft: function (){
                if(pieceInMovement.getX() <= 0 || area[pieceInMovement.getY()][pieceInMovement.getX() - 1]){
                    return false;
                }
                pieceInMovement.moveLeft();
                input.keyPressedAlready = true;
                input.left = false;
                return true;
            },
            moveRight: function (){
                if(pieceInMovement.getX() >= 9 || area[pieceInMovement.getY()][pieceInMovement.getX() + 1]){
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
                pieceInMovement = new Piece();
                return true;
            }
        }
    };

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
        if(!pressed){
            input.keyPressedAlready = false;
        }
        if(input.keyPressedAlready){
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

    function handleInput(){
        //if by any chance both left and right are pressed don't move
        if(input.left && input.right){
            return false;
        }
        if(input.left){
            return stageArea.moveLeft();
        }
        if(input.right){
            return stageArea.moveRight();
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
            if (!stageArea.createNewPiece()) {
                return false;
            }
        }
    }

    start();
}());

