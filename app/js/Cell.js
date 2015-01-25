
// Cell.js

function Cell(type) {
	this.type = type || TYPE.PLAIN;
	this.city = false;
	this.player = -1;
}
Cell.prototype.getProduction = function () {
	if (this.type == TYPE.PLAIN) {
		return []
	}
}