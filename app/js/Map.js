
// Map.js

function Map(w, h) {

	this.width = w;
	this.height = h;
	this.land = [];

	this.cells = new Array (h);
	for (var i = 0; i < h; ++i) {
		this.cells[i] = new Array (w);
		for (var j = 0; j < w; ++j) {
			this.cells[i][j] = new Cell(i, j, TYPE.OCEAN);
		}
	}

	this.generateTerrain();
	for (var i = 0; i < 2; ++i) {
		var cell = undefined;
		while (cell == undefined || cell.player != -1 || cell.type != TYPE.PLAIN) {
			cell = this.land[Math.floor(Math.random()*this.land.length)];
		}
		cell.player = i;
		cell.city = true;
	}

}

Map.prototype.getCellAt = function(i, j) {
	if (this.outOfBounds(i,j)) return null;
	return this.cells[i][j];
};

Map.prototype.outOfBounds = function(i, j) {
	return (i < 0 || i >= this.height || j < 0 || j >= this.width);
};

Map.prototype.drop = function(i, j, n) {

	if (this.outOfBounds(i,j)) return;

	//already generated?
	var cell = this.cells[i][j];
	if (cell.type != TYPE.OCEAN) return;

	var nn = n/3;
	var rand = Math.random();
	if (rand < nn/(nn+1)) return;

	var rand = Math.random();

	//cell type
	var type;
	if (rand < 0.85) type = TYPE.PLAIN;
	else if (rand < 0.925) type = TYPE.WHEAT;
	else type = TYPE.FOREST;
	cell.type = type;

	this.land.push(cell);

	//cascade
	this.drop(i-1, j  , n+1);
	this.drop(i+1, j  , n+1);
	this.drop(i  , j-1, n+1);
	this.drop(i  , j+1, n+1);

};

Map.prototype.generateTerrain = function() {
	this.drop(15, 15, 0);
};