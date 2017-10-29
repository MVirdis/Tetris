<!--
// Controlli del canvas
var canvas = document.getElementById("header_canvas");
var cntx = canvas.getContext("2d");

canvas.width = window.innerWidth;

window.addEventListener("resize", event => {
	canvas.width = window.innerWidth;
});

// Colori dei pezzi
var colori = ["#02dba1", "#b134e2", "#6bc615", "#c68815", "#c61515", "#4286f4", "#dbdbdb"];

var pieces = ['T', 'z', 's', 'O', 'l', 'L', 'J'];

var number_of_falling_pieces = 30;

var base_distance = 12;

var falling_pieces = [];

function randint(num) {
	return Math.floor(Math.random()*num);
}

function randomPopulate() {
	for(var i=0; i<number_of_falling_pieces; ++i) {
		falling_pieces.push({piece: pieces[randint(pieces.length)],
					 		 pos: {x:randint(86)*base_distance, y:randint(500/base_distance)*base_distance - 250}});
	}
}

function createPiece(pezzo) {
	//Per ora non sono implementati altri pezzi oltre alla T
	switch(pezzo) {
		case 'T':
		var matrice_nuova =  [[0,0,0],
							  [1,1,1],
							  [0,1,0]];
		return matrice_nuova;
		break;
		case 'z':
		var matrice_nuova =  [[0,0,0],
							  [2,2,0],
							  [0,2,2]];
		return matrice_nuova;
		break;
		case 's':
		var matrice_nuova =  [[0,0,0],
							  [0,3,3],
							  [3,3,0]];
		return matrice_nuova;
		break;
		case 'O':
		var matrice_nuova =  [[4,4],
							  [4,4]];
		return matrice_nuova;
		break;
		case 'l':
		var matrice_nuova =  [[0,5,0,0],
							  [0,5,0,0],
							  [0,5,0,0],
							  [0,5,0,0]];
		return matrice_nuova;
		break;
		case 'L':
		var matrice_nuova =  [[6,0,0],
							  [6,0,0],
							  [6,6,0]];
		return matrice_nuova;
		break;
		case 'J':
		var matrice_nuova =  [[0,0,7],
							  [0,0,7],
							  [0,7,7]];
		return matrice_nuova;
		break;
		default:
			console.log("Errore! Il pezzo specificato non esiste.");
			return null;
	}
}

function drawPiece(matricePezzo, pos) {
	var righe = matricePezzo.length;
	var colonne = matricePezzo[0].length;
	for(var r=0; r<righe; ++r) {
		for(var c=0; c<colonne; ++c) {
			// Se nella matrice del pezzo incontro un numero diverso da 0
			// disegno un quadratino in quella posizione
			if (matricePezzo[r][c]!==0) {
				// Ogni pezzo ha un numero che identifica il suo colore
				// i numeri dei pezzi va da 1 a 7 mentre quello dei colori va da 0 a 6
				cntx.fillStyle = colori[matricePezzo[r][c]-1];
				cntx.fillRect(c*base_distance+pos.x,
							  r*base_distance+pos.y,
							  base_distance,
							  base_distance);
			}
		}
	}
}

function draw() {
	cntx.fillStyle = "#2d2b26";
	cntx.fillRect(0,0, canvas.width, canvas.height);
	for(var i=0; i<number_of_falling_pieces; ++i) {
		drawPiece(createPiece(falling_pieces[i].piece), falling_pieces[i].pos);
	}
}

function move() {
	for(var i=0; i<number_of_falling_pieces; ++i) {
		falling_pieces[i].pos.y+=base_distance;
		if (falling_pieces[i].pos.y>=500) {
			falling_pieces[i].pos.y = randint(500/base_distance)*base_distance - 250;
		}
	}
}

var prec = 0;
var counter = 0;
var cum_counter = 0;
function update(time=0) {
	if (cum_counter>=2*60*1000) {
		console.log("Stopper");
		return;
	}
	requestAnimationFrame(update);
	var delta = time-prec;
	counter += delta;
	cum_counter += delta;
	prec = time;
	if (counter>300) {
		counter = 0;
		draw();
		move();
	}
}

randomPopulate();
update();
-->

