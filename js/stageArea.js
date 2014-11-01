 function StageArea(stage) {
   //the bigger this value, the slower the falling speed
   var speed = 50;
   var speedCounter = 0;
   var stageXSize = 10;
   var stageYSize = 10;
   var area = (function() {
     var areaArray = new Array(stageXSize);
     for (var i = 0; i < stageXSize; i++) {
       areaArray[i] = new Array(stageYSize);
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
     moveLeft: function(input) {
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
     moveRight: function(input) {
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