
// CellSprite.js

var CellSpriteCache = {};

function CellSprite(cell) {
	this.cell = cell;
	this.sprite = new PIXI.Sprite();
	this.update();
}

CellSprite.prototype.update = function() {

	var cell = this.cell;
	var id = cell.type + cell.city + cell.player;
	var texture = CellSpriteCache[id];

	if (!texture) {
		console.log(id);
		var c = document.createElement('canvas');
		var ctx = c.getContext('2d');
		var w = CELL_WIDTH;
		var h = CELL_HEIGHT;
		c.width = w;
		c.height = h;
		ctx.fillStyle = COLOR.CELL[cell.type];
		ctx.strokeStyle = COLOR.PLAYER[cell.player];
		ctx.lineWidth = 2;
		ctx.rect(0,0,w,h);
		ctx.fill();
		if (cell.type != TYPE.OCEAN) ctx.stroke();
		var texture = PIXI.Texture.fromCanvas(c);
		CellSpriteCache[id] = texture;
	}

	this.sprite.setTexture(texture);
	
};