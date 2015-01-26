
// CellSprite.js

var CellTextureCache = {};

function CellSprite(cell) {
	this.cell = cell;
	this.sprite = new PIXI.Sprite();
	this.update();
}

// TODO: very ugly function ermaherd yuno OO
CellSprite.prototype.update = function() {

	var cell = this.cell;
	var id = cell.type + cell.city + cell.player;
	var texture = CellTextureCache[id];

	if (!texture) {
		console.log(id);
		var c = document.createElement('canvas');
		var ctx = c.getContext('2d');
		var w = CELL_WIDTH;
		var h = CELL_HEIGHT;
		c.width = w;
		c.height = h;

		if (cell.type != TYPE.OCEAN) {

			var numberOfSides = 6,
		    size = w/2,
		    Xcenter = w/2,
		    Ycenter = w/2;

			ctx.beginPath();
			ctx.moveTo(Xcenter +  size * Math.cos(0), Ycenter +  size *  Math.sin(0));          

			for (var i = 1; i <= numberOfSides; ++i) {
			    ctx.lineTo(
			    	Xcenter + size * Math.cos(i * 2 * Math.PI / numberOfSides),
			    	Ycenter + size * Math.sin(i * 2 * Math.PI / numberOfSides)
			    );
			}

			ctx.fillStyle = COLOR.CELL[cell.type];
			if (cell.player > -1) ctx.strokeStyle = COLOR.PLAYER[cell.player];
			else ctx.strokeStyle = '#9EC972';
			ctx.lineWidth = 5;
			ctx.fill();
			ctx.stroke();

			if (this.cell.city) {

				var numberOfSides = 6,
			    size = w/3,
			    Xcenter = w/2,
			    Ycenter = w/2;

				ctx.beginPath();
				ctx.moveTo(Xcenter +  size * Math.cos(0), Ycenter +  size *  Math.sin(0));          

				for (var i = 1; i <= numberOfSides; ++i) {
				    ctx.lineTo(
				    	Xcenter + size * Math.cos(i * 2 * Math.PI / numberOfSides),
				    	Ycenter + size * Math.sin(i * 2 * Math.PI / numberOfSides)
				    );
				}

				ctx.fillStyle = COLOR.PLAYER[cell.player];
				ctx.fill();

			}

		}

		var texture = PIXI.Texture.fromCanvas(c);
		CellTextureCache[id] = texture;
	}

	this.sprite.setTexture(texture);
	
};