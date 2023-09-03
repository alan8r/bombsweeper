canvas.addEventListener('mousedown', function(e) {
    if (running) {
	let clickX = Math.floor(e.offsetX / BLOCK_W),
	    clickY = Math.floor(e.offsetY / BLOCK_H);
	if (e.which == 1) {
	    openBlock(clickX, clickY);
	    winCheck();
	    render();
	} else if (e.which == 3) {
	    flagBlock(clickX, clickY);
	    render();
	}
    }
});

canvas.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    return false;
});

canvas.addEventListener('dblclick', function(e) {
    if (running) {
	let clickX = Math.floor(e.offsetX / BLOCK_W),
	    clickY = Math.floor(e.offsetY / BLOCK_H);
	openAround(clickX, clickY);
	winCheck();
	render();
    }
});

let newMsg = "Game currently in progress. Start a new game?";

bEasy.addEventListener('mousedown', function() {
    if (!running || confirm(newMsg)) {
	ROWS = GAMEMODE.EASY.ROWS;
	COLS = GAMEMODE.EASY.COLS;
	MINES = GAMEMODE.EASY.MINES;
	init();
	canvasInit();
	render();
    } else return;
});    

bMed.addEventListener('mousedown', function() {
    if (!running || confirm(newMsg)) {
	ROWS = GAMEMODE.MED.ROWS;
	COLS = GAMEMODE.MED.COLS;
	MINES = GAMEMODE.MED.MINES;
	init();
	canvasInit();
	render();
    } else return;
});

bHard.addEventListener('mousedown', function() {
    if (!running || confirm(newMsg)) {
	ROWS = GAMEMODE.HARD.ROWS;
	COLS = GAMEMODE.HARD.COLS;
	MINES = GAMEMODE.HARD.MINES;
	init();
	canvasInit();
	render();
    } else return;
});
