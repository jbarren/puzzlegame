function Piece(colorNumber, xStart, yStart) {
  'use strict';
  var _color;
  var _texture;
  var _x = typeof xStart === 'undefined' ? 5 : xStart;
  var _y = typeof yStart === 'undefined' ? 0 : yStart;
  var _blockSize = 50;
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
    default:
      _color = 'white';
      _texture = PIXI.Texture.fromImage("../images/square_white.png");
      break;
  }

  var _image = initializeImage();

  function initializeImage() {
    var img = new PIXI.Sprite(_texture);
    img.position.x = _x * _blockSize;
    img.position.y = _y * _blockSize;
    return img;
  }

  return {
    getX: function() {
      return _x;
    },
    getY: function() {
      return _y;
    },
    getColor: function() {
      return _color;
    },
    getImage: function() {
      return _image;
    },
    moveDown: function() {
      // area[y][x] = undefined;
      // y++;
      // area[y][x] = this;
      //   _image.position.y = y * 50;
      _y++;
      _image.position.y = _y * _blockSize;
    },
    moveLeft: function() {
      // area[y][x] = undefined;
      // x--;
      // area[y][x] = this;
      //   _image.position.x = x * 50;
      _x--;
      _image.position.x = _x * _blockSize;
    },
    moveRight: function() {
      // area[y][x] = undefined;
      // x++;
      // area[y][x] = this;
      //   _image.position.x = x * 50;
      _x++;
      _image.position.x = _x * _blockSize;
    }
  };
}