
var stats = new Stats();
stats.setMode(0); // 0: fps, 1: ms

// align top-left
stats.domElement.style.position = 'absolute';
stats.domElement.style.right = '0px';
stats.domElement.style.bottom = '0px';

document.body.appendChild( stats.domElement );

var renderer = new PIXI.WebGLRenderer(800, 600, {resolution:DPXRATIO});
document.body.appendChild(renderer.view);

window.onresize = function () {
	var w = window.innerWidth;
	var h = window.innerHeight;
	renderer.resize(w, h);
}
window.onresize();

var stage = new PIXI.Stage(0x9DC9FF);

var keyboard = new KeyboardJS(false);

var SCROLL_ACC = 2;
var SCROLL_MAX_SPEED = 20;
var vx = 0;
var vy = 0;
var mapx = 0;
var mapy = 0;

var game = new Game();
var mapSprite =  new MapSprite(game.map);
stage.addChild(mapSprite.sprite);

var scale = 0.5;

var mapPosition = mapSprite.sprite.position;

mapx = -CELL_WIDTH*15*scale + window.innerWidth/2;
mapy = -CELL_WIDTH*15*scale + window.innerHeight/2;

mapSprite.sprite.scale.x = mapSprite.sprite.scale.y = scale;

requestAnimationFrame(animate);
function animate() {

	stats.begin();

	if (keyboard.char('W')) vy += SCROLL_ACC;
	if (keyboard.char('S')) vy -= SCROLL_ACC;
	if (keyboard.char('D')) vx -= SCROLL_ACC;
	if (keyboard.char('A')) vx += SCROLL_ACC;

	vx *= 0.9;
	vy *= 0.9;

	if (vx > SCROLL_MAX_SPEED) vx = SCROLL_MAX_SPEED;
	else if (vx < -SCROLL_MAX_SPEED) vx = -SCROLL_MAX_SPEED;
	if (vy > SCROLL_MAX_SPEED) vy = SCROLL_MAX_SPEED;
	else if (vy < -SCROLL_MAX_SPEED) vy = -SCROLL_MAX_SPEED;
	
	mapx += vx;
	mapy += vy;

	mapPosition.x = Math.floor(mapx);
	mapPosition.y = Math.floor(mapy);

    renderer.render(stage);

    stats.end();

    requestAnimationFrame(animate);
}
