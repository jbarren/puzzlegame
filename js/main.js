//var PUZZLE_GAME = (function(){
//    'use strict'
//
//    var stage;
//    var renderer;
//    var stageArea;
//
//    function StageArea(pixiStage){
//        var pixiStage = pixiStage;
//        var stageArea = new Array(10);
//        for (var i = 0; i < 10; i++) {
//            stageArea[i] = new Array(10);
//        }
//        return {
//
//        };
//    }
//
//    function Position() {
//        var x = 5;
//        var y = 0;
//        return {
//            getX: function () {
//                return x;
//            },
//            getY: function () {
//                return y;
//            },
//            moveDown: function () {
//                if (y < 10) {
//                    y++;
//                    return true;
//                }
//                return false;
//            }
//        };
//    };
//
//    function Piece(stage, stageArea) {
//        var texture = PIXI.Texture.fromImage("../images/square.png");
//        var image = new PIXI.Sprite(texture);
//        var pos = new Position();
//        image.position.x = pos.getX() * 50;
//        image.position.y = pos.getY() * 50;
//        stage.addChild(image);
//        return {
//            getPosition: function () {
//                return pos;
//            },
//            move: function (x, y) {
//                image.position.x = x * 50;
//                image.position.y = y * 50;
//            },
//            moveDown: function () {
//                if (pos.moveDown()) {
//                    this.move(pos.getX(), pos.getY());
//                    return true;
//                }
//                return false;
//            }
//        };
//    };
//
//
//
//    function start(){
//        // create an new instance of a pixi stage
//        stage = new PIXI.Stage(0x66FF99);
//        // create a renderer instance.
//        renderer = PIXI.autoDetectRenderer(600, 600);
//        // add the renderer view element to the DOM
//        document.body.appendChild(renderer.view);
//        stageArea = new StageArea(stage);
//        requestAnimFrame( animate );
//    }
//
//    var counter = 50;
//    function animate() {
//        runGame();
//        renderer.render(stage);
//        requestAnimFrame(animate);
//    }
//
//    var pieceInAction;
//    function runGame(){
//
//        var moving = pieceMovement();
////        if(!moving){
////            checkCombination();
////        };
//
//        function pieceMovement(){
//            if(pieceInAction === undefined){
//                pieceInAction = new Piece(stage);
//            }
//            if(counter === 0){
//                counter = 50;
//                if(pieceInAction.moveDown() === false){
//                    pieceInAction = new Piece(stage);
//                    return false;
//                }
//                return true;
//            }else{
//                counter--;
//                return true;
//            }
//
//
//        }
//
//        function checkCombination(){}
//    };
//    start();
//}());
//
//
//
//
