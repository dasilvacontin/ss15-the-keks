
// Unit.js

function Unit(player, size) {
	this.player = player || 0;
	this.size = size || 0;
	this.player = Math.floor(Math.random()*2);
	this.size = Math.floor(Math.random()*10);
}