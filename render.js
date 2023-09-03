const BLOCK_W = 30,
      BLOCK_H = 30;

const COLOR = [
    'blue', 
    'darkgreen', 
    'red', 
    'navy',
    'darkred',
    'teal',
    'black',
    'grey'
];

let bombIcon = new Image, flagIcon = new Image;
bombIcon.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAADZ0lEQVRoQ+2ZzcoaMRSGT/yXSlVc1I2iCIIi6rrQO+gVdNWr6XV01SvoHRS6FgQFQRx1Y0FRK63/piR2pvP5zThJTGb66WRrknOe8543ySCCBxvowXjBB753xX2F70FhvP+MUfijpZgvXmH86w0mIqFXPygL/h3AcAoBSuzuFBi/PQOj72fg7TuMot9shXzxCvNa0AfmrZjAfNqCDINJDPwTjP3Qa0D49AnD7iug2LnFLwfTpgzJsUxhBWXKEQNg+AIA7/9N/5+ARWF1mkthMN3QAtip8m4pbAf8DMQhYTKf7mUA/12APrA9k70Cdorr2BHmCQjYYOn15dQCEn6/TJ4npiM4LwNPcFH2W4CN7rUJzp0/9wIB6luBBULaL3Eb2I14VwukMgFL/6VSKVgsFirjegIs/bCR1deqKv0YwIVCAWuaxixGoVAATdNUFd0yD1nBWBR1KoSsXJR72ICNx+MQi8UgGo3CdruFzWYD6/XaCdT8u3Jo4QCpVAovFguaLAFNJpOQy+UgkUhAIBCAw+EAs9kM+v0+F7TqU1wYWH+/p9NpKBaLQBINhUKA0HlLjDG5fqDdbnMB698CPG3BM1cUmLYxUbZSqUAmk6Gq6oPA7nY7mE6n3AqbkhfNTbqHDc9ms1moVqsQDocNVUkrr1YrGI/HsFwuRdRV6mmuKpp9S1q5XC5T75I2JqoS0MFgIAOUQqvwMxew7lurVt7v99DpdGAymfBYimUub45yWvpS3WazCZFIhG5+Op3oidztdm9t4WfJylaZp3qGd/P5PG3nYDBIW5l4tdfrwXw+Z1FMZA5PnnIUNrdzrVYD4mHi3ePxSGFHo5EICOsa74AJaKPRoK8pMsj102q1VKpLwrgObLQzAa7X6/QJqdK7FtJLgWbd5Ml7uVQq0SckeSsPh0PV6ursrLlK8fCTryFyLemD8+OA1bNW87wDviXrG9a6B2y+g29IWHipzLuYp2oyPvJFoXnylOJhsokPLCqXwDr3FfbKxzL9K/KC8aKtpanrAzN6y02VpaororBeEzegpcMKA6s+wGQfVObOFa4i798qjHYB1X+/CAObAGS2t4x8pL20rm0kA1o5rLCH7ch5va3Sq3Y5qqzqNdVVxnWlpVnPJM/neVZpr8h9YK8q71ZcX2G3Ku1VnD87zTNM/Q2WYAAAAABJRU5ErkJggg==';

flagIcon.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAB20lEQVRoQ+2avUoDURCFz4LW+gb6CBGs/CdRxELQN7BJk3ewyzNooYU2NoLbWChqQBStRH0EqxVsTGGlEFllhSjIZn7uzrKT+t7DfGfO3NwbEqFin6hivHBgwY7PA7gU1BOR0upwDGBtaHik8/HebYhUKiSiBdzL6uu1gOnni/Gbo8aTUM0smSDAWYWTL2ejd4dLXVbFzM1BgdNaj9+Wd1f3T5vMusnbgwNnlc4lnYWruB78UCsMOAMPPd+FA4eebzPAoebbFHCI+TYJrDnfpoE15rsUwJLzXRrgrNvbr83N1sFOm3rzKB1wCjqVnK/cxosnFOhSAqeg0RbtLV9KYCrsl1GUWOTY0/c8zLE+1xKJ15Z5YOnXlVng2aRTu47rj7laP8Aic8ASsf2P3wSwdGzNAmvF1hywdmxNAIeMbaHAM+s6p+0AB3PfUvVDS/FyQ2J2YJJtfzf9XC29w0KOUmU80lTnfu3zSAsZyZbxSLMt/BbwSAsZyZbxSLMt9Eir/VBI6o1HmmSb36X9a0koOHwZn2G+h37T0koRqTdaxfhdmtQOhU3eYSFTPdJCRrJltCJ9D6AG4AHABLtKQQEt4DEAGwD2AJj4J3zmmRawYE9kpRxY1k97apXr8Cf3GME9VBxDsAAAAABJRU5ErkJggg==';

let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");

function canvasInit() {
    canvas.width = BLOCK_W * COLS;
    canvas.height = BLOCK_H * ROWS;
}

function toBlockCoords(x, y) {
    return {
	x: x * BLOCK_W,
	y: y * BLOCK_H
    }
}

function toViewCoords(x, y) {
    return {
	x: x / BLOCK_W,
	y: y / BLOCK_H
    }
}

function drawBlock(x, y) {
    let viewCoord = toViewCoords(x, y);
    let xx = viewCoord.x, yy = viewCoord.y;
    ctx.fillStyle = '#333';
    ctx.font = '28px Courier New';
    ctx.fillRect(x, y, BLOCK_W, BLOCK_H);
    if (state[yy][xx] == STATE_CLOSED) ctx.fillStyle = '#777';
    else ctx.fillStyle = '#BBB';
    ctx.fillRect(x + 2, y + 2, BLOCK_W - 2, BLOCK_H - 2);
    if (state[yy][xx] == STATE_OPENED) { 
	if (board[yy][xx] == BOARD_EMPTY) return;
	let bNum = board[yy][xx];
	let tW = ctx.measureText(bNum).width - 1,
	    tX = x + (BLOCK_W / 2) - (tW / 2),
	    tY = y + (BLOCK_H / 2) + 11;
	if (bNum == BOARD_MINE) ctx.fillStyle = 'black';
	else ctx.fillStyle = COLOR[bNum-1];
	if (bNum <= -1) {
	    if (bNum == BOARD_LOST) ctx.fillStyle = '#F33';
	    else ctx.fillStyle = '#777';
	    ctx.fillRect(x + 2, y + 2, BLOCK_W - 2, BLOCK_H - 2);
	    ctx.drawImage(bombIcon, x + 1, y + 1, BLOCK_W, BLOCK_H);
	} else ctx.fillText(bNum, tX, tY);
    } else if (state[yy][xx] == STATE_FLAGGED) {
	ctx.fillStyle = '#777';
	ctx.fillRect(x + 2, y + 2, BLOCK_W - 2, BLOCK_H - 2);
	ctx.drawImage(flagIcon, x + 1, y + 1, BLOCK_W, BLOCK_H);
    }
}

function render() {
    for (let y = 0; y < ROWS; y++) {
	for (let x = 0; x < COLS; x++) {
	    let blockCoord = toBlockCoords(x, y);
	    drawBlock(blockCoord.x, blockCoord.y);
	}
    }
}

canvasInit();
render();
