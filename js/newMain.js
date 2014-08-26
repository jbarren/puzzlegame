'use strict'
var PUZZLE_GAME = (function () {
    function StageArea(stage) {

        var pieceInMovement = new Piece();

        var area = (function () {
            var areaArray = new Array(10);
            for (var i = 0; i < 10; i++) {
                areaArray[i] = new Array(10);
            }
            return areaArray;
        }());

        function Piece() {
            var texture = PIXI.Texture.fromImage("../images/square.png");
            var image = new PIXI.Sprite(texture);
            var x = 5;
            var y = 0;
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
                    y++;
                    image.position.y = y * 50;
                }
            };
        };

        return {
            moveDown: function() {
                if (area[pieceInMovement.getY() + 1][pieceInMovement.getX()] === undefined
                    && pieceInMovement.getY() < 10) {
                    pieceInMovement.moveDown();
                    return true;
                }
                return false;
            },
            createNewPiece: function() {
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

