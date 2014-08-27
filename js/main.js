'use strict';
var PUZZLE_GAME = (function () {
    function StageArea(stage) {
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
                }
            };
        };

        return {
            moveDown: function () {
                if (pieceInMovement.getY() >= 9
                    || area[pieceInMovement.getY() + 1][pieceInMovement.getX()]) {
                    return false;
                }
                pieceInMovement.moveDown();
                return true;
            },
            createNewPiece: function () {
                pieceInMovement = new Piece();
            }
        }
    };

    var stage;
    var renderer;
    var stageArea;

    function start() {
        stage = new PIXI.Stage(0x66FF99);
        renderer = PIXI.autoDetectRenderer(600, 600);
        document.body.appendChild(renderer.view);
        stageArea = new StageArea(stage);
        requestAnimFrame(animate);
    }

    function animate() {
        if (runGame() === false) {
            return;
        }
        renderer.render(stage);
        requestAnimFrame(animate);
    }

    function runGame() {
        if (stageArea.moveDown() === false) {
            stageArea.createNewPiece();
        }
    }

    start();
}());

