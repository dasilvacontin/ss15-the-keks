
// Cell.js

function Cell(i, j, type) {

	this.type = type || TYPE.PLAIN;
	this.city = false;
	this.player = -1;

	this.i = i;
	this.j = j;

	this.unit = new Unit();
	
}

Cell.prototype.getProduction = function () {
	if (this.type == TYPE.PLAIN) {
		return []
	}
}