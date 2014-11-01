describe('Array', function() {
	describe('#indexOf()', function() {
		it('should return -1 when the value is not present', function() {
			chai.assert.equal(-1, [1, 2, 3].indexOf(5));
			chai.assert.equal(-1, [1, 2, 3].indexOf(0));
		});
	});
});
describe('StageArea', function() {
	describe('moveLeft()', function() {
		it('should return false if the piece is on the left edge', function() {
			var stage = new PIXI.Stage(0x66FF99);
			var renderer = PIXI.autoDetectRenderer(600, 600);
			document.body.appendChild(renderer.view);
			var stageArea = new StageArea(stage);
		});
	});
});