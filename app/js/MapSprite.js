
// MapSprite.js

function MapSprite(map) {

	this.map = map;
	this.sprite = new PIXI.DisplayObjectContainer();
	this.units = new PIXI.DisplayObjectContainer();
	this.cellSprites = new Array(map.height);
	this.unitSprites = new Array(map.height);
	var cell, unit, cellSprite, unitSprite, position;

	for (var i = 0; i < map.height; ++i) {
		this.cellSprites[i] = new Array(map.width);
		this.unitSprites[i] = new Array(map.width);
		for (var j = 0; j < map.width; ++j) {

			cell = map.getCellAt(i, j);

			cellSprite = new CellSprite(cell);
			cellSprite.sprite.position = MapSprite.positionForIndex(i, j);
			this.cellSprites[i][j] = cellSprite;
			this.sprite.addChild(cellSprite.sprite);

			if (cell.type != 'ocean') {

				unit = new Unit();

				if (cell.player > -1) unit.player = cell.player;
				unit.size = Math.floor(Math.random()*10);

				unitSprite = new UnitSprite(unit);
				unitSprite.sprite.position = MapSprite.positionForIndex(i, j);
				this.unitSprites[i][j] = unitSprite;
				this.units.addChild(unitSprite.sprite);

			}

		}
	}

	this.sprite.addChild(this.units);

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
