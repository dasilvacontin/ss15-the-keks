
// MapSprite.js

function MapSprite(map) {

	this.map = map;
	this.sprite = new PIXI.DisplayObjectContainer();
	this.cellSprites = new Array(map.height);
	var cellSprite, position;

	for (var i = 0; i < map.height; ++i) {
		this.cellSprites[i] = new Array(map.width);
		for (var j = 0; j < map.width; ++j) {

			cellSprite = new CellSprite(map.getCellAt(i, j));
			cellSprite.sprite.position = MapSprite.positionForIndex(i, j);
			this.cellSprites[i][j] = cellSprite;

			this.sprite.addChild(cellSprite.sprite);

		}
	}

}

MapSprite.positionForIndex = function (i, j) {
	var x = j * 3 * CELL_WIDTH / 4;
	var y = i * 2 * APOTHEM;
	if (j%2) y += APOTHEM;
	return new PIXI.Point(x, y);
}

MapSprite.prototype.generalUpdate = function() {
	for (var i = 0; i < this.map.height; ++i)
		for (var j = 0; j < this.map.width; ++j)
			this.cellSprites[i][j].update();
}
