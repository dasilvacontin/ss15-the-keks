
// MapSprite.js

function MapSprite(map) {

	this.map = map;
	this.sprite = new PIXI.DisplayObjectContainer();
	this.cellSprites = new Array(map.height);
	var cellSprite;

	for (var i = 0; i < map.height; ++i) {
		this.cellSprites[i] = new Array(map.width);
		for (var j = 0; j < map.width; ++j) {

			cellSprite = new CellSprite(map.getCellAt(i, j));
			cellSprite.sprite.position.x = j * CELL_WIDTH;
			cellSprite.sprite.position.y = i * CELL_HEIGHT;
			this.cellSprites[i][j] = cellSprite;

			this.sprite.addChild(cellSprite.sprite);

		}
	}

}

MapSprite.prototype.generalUpdate = function() {
	for (var i = 0; i < this.map.height; ++i)
		for (var j = 0; j < this.map.width; ++j)
			this.cellSprites[i][j].update();
}
