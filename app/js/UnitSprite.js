
// UnitSprite.js

var UnitCircleTextureCache = [];
var UnitNumberTextureCache = [];

function UnitSprite(unit) {

	this.unit = unit;

	this.sprite = new PIXI.DisplayObjectContainer();
	this.numberSprite = new PIXI.Sprite();
	this.circleSprite = new PIXI.Sprite();

	this.sprite.addChild(this.circleSprite);
	this.sprite.addChild(this.numberSprite);

	this.update();

}

UnitSprite.prototype.update = function() {
	
	var unit = this.unit;

	var texture = UnitCircleTextureCache[unit.player];
	if (texture === undefined) {
		var c = document.createElement('canvas');
		var ctx = c.getContext('2d');
		var center = CELL_WIDTH/2;
		var radius = CELL_WIDTH/4;
		c.width = c.height = CELL_WIDTH;
		ctx.beginPath();
		ctx.arc(center, center, radius, 0, 2 * Math.PI, false);
		ctx.fillStyle = COLOR.PLAYER[unit.player];
		ctx.fill();
		texture = PIXI.Texture.fromCanvas(c);
		UnitCircleTextureCache[unit.player] = texture;
	}

	this.circleSprite.setTexture(texture);
	this.circleSprite.visible = (unit.size != 0);

	texture = UnitNumberTextureCache[unit.size];
	if (texture === undefined) {
		var c = document.createElement('canvas');
		var ctx = c.getContext('2d');
		c.width = c.height = CELL_WIDTH;
		ctx.font = CELL_WIDTH/4 + 'px Roboto';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillStyle = 'white';
		ctx.fillText(unit.size, CELL_WIDTH/2, CELL_WIDTH/2);
		texture = PIXI.Texture.fromCanvas(c);
		UnitNumberTextureCache[unit.size] = texture;
	}

	this.numberSprite.setTexture(texture);
	this.numberSprite.visible = (unit.size != 0);

};