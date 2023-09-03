const GAMEMODE = {
    EASY: {ROWS: 9, COLS: 9, MINES: 10},
    MED: {ROWS: 16, COLS: 16, MINES: 40},
    HARD: {ROWS: 16, COLS: 30, MINES: 99}
}

let ROWS = GAMEMODE.EASY.ROWS;
let COLS = GAMEMODE.EASY.COLS;
let MINES = GAMEMODE.EASY.MINES;

let board, state, running = true;

const STATE_CLOSED = 0,
      STATE_OPENED = 1,
      STATE_FLAGGED = 2,
      BOARD_MINE = -1,
      BOARD_LOST = -2,
      BOARD_EMPTY = 0;

function gameover() {
    revealBombs();
    running = false;
    alert("GAME OVER!");
}

function winCheck() {
    let openCount = 0;
    for (let y = 0; y < ROWS; y++) {
	for (let x = 0; x < COLS; x++) {
	    if (state[y][x] == STATE_OPENED) openCount++;
	}
    }
    if (openCount == (ROWS * COLS) - MINES) {
	revealBombs();
	running = false;
	alert('YOU WIN!');
    }
}

function revealBombs() {
    for (let y = 0; y < ROWS; y++) {
	for (let x = 0; x < COLS; x++) {
	    if (board[y][x] == BOARD_MINE) {
		state[y][x] = STATE_OPENED;
	    }
	}
    }
}

function flagBlock(x, y) {
    if (state[y][x] == STATE_FLAGGED) {
	state[y][x] = STATE_CLOSED;
    } else if (state[y][x] == STATE_CLOSED) {
	state[y][x] = STATE_FLAGGED;
    }
}

function openAround(x, y) {
    if (state[y][x] == STATE_OPENED) {
	let bNum = board[y][x], flagCount = 0;
	//FLAG COUNT;
	for (let yy = -1; yy <= 1; yy++) {
	    for (let xx = -1; xx <= 1; xx++) {
		if (inBounds(x + xx, y + yy)) {
		    if (state[y + yy][x + xx] == STATE_FLAGGED) flagCount++;
		}
	    }
	}
	if (flagCount >= bNum) {
	    for (let yy = -1; yy <= 1; yy++) {
		for (let xx = -1; xx <= 1; xx++) {
		    if (inBounds(x + xx, y + yy)) {
			openBlock(x + xx, y + yy);
		    }
		}
	    }
	}
    }
}

function openBlock(x, y) {
    if (state[y][x] == STATE_CLOSED) {
	state[y][x] = STATE_OPENED;
	if (board[y][x] == BOARD_MINE) {
	    board[y][x] = BOARD_LOST;
	    gameover();
	}
	if (board[y][x] == BOARD_EMPTY) {
	    for (let yy = -1; yy <= 1; yy++) {
		for (let xx = -1; xx <= 1; xx++) {
		    if (inBounds(x + xx, y + yy)) {
			openBlock(x + xx, y + yy);
		    }
		}
	    }
	}
    }
}

function countMines() {
    for (let y = 0; y < ROWS; y++) {
	for (let x = 0; x < COLS; x++) {
	    if (board[y][x] != BOARD_MINE) {
		var count = 0;
		for (var yy = -1; yy <= 1; yy++) {
		    for (var xx = -1; xx <= 1; xx++) {
			var dx = xx + x,
			    dy = yy + y;
			if (inBounds(dx, dy)) {
			    if (board[dy][dx] == BOARD_MINE) count++;
			}
		    }
		}
		board[y][x] = count;
	    }
	}
    }
    //DEBUG board.forEach((arr, i) => console.log(arr, i));
}

function inBounds(x, y) {
    return x >= 0 && x < COLS
	&& y >= 0 && y < ROWS;
}

function init() {
    board = [], state = [], running = true;
    for (let y = 0; y < ROWS; y++) {
	board.push([]);
	state.push([]);
	for (let x = 0; x < COLS; x++) {
	    board[y].push(BOARD_EMPTY);
	    state[y].push(STATE_CLOSED);
	}
    }
    
    for (let i = 0; i < MINES; i++) {
	let x, y;
	do {
	    x = Math.floor(Math.random() * COLS);
	    y = Math.floor(Math.random() * ROWS);
	} while (board[y][x] == BOARD_MINE);
	
	board[y][x] = BOARD_MINE;
    }
    countMines();
}

let bEasy = document.querySelector("#easy");
let bMed = document.querySelector("#med");
let bHard = document.querySelector("#hard");

init();
