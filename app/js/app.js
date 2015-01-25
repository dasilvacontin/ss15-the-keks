
var renderer = new PIXI.WebGLRenderer(800, 600, {resolution:DPXRATIO});
document.body.appendChild(renderer.view);

window.onresize = function () {
	var w = window.innerWidth;
	var h = window.innerHeight;
	renderer.resize(w, h);
}
window.onresize();

var stage = new PIXI.Stage(0xFFFFFF);

var keyboard = new KeyboardJS(false);

var SCROLL_SPEED = 20;

requestAnimationFrame(animate);
function animate() {
	requestAnimationFrame(animate);
	mapSprite.generalUpdate();
	if (keyboard.char('W')) mapSprite.sprite.position.y += SCROLL_SPEED;
	if (keyboard.char('S')) mapSprite.sprite.position.y -= SCROLL_SPEED;
	if (keyboard.char('D')) mapSprite.sprite.position.x -= SCROLL_SPEED;
	if (keyboard.char('A')) mapSprite.sprite.position.x += SCROLL_SPEED;
    renderer.render(stage);
}

var game = new Game();
var mapSprite =  new MapSprite(game.map);
stage.addChild(mapSprite.sprite);

var scale = 0.5;

mapSprite.sprite.position.x = -CELL_WIDTH*15*scale + window.innerWidth/2;
mapSprite.sprite.position.y = -CELL_WIDTH*15*scale + window.innerHeight/2;

mapSprite.sprite.scale.x = mapSprite.sprite.scale.y = scale;
