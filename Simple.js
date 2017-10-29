// Prelevo i controlli del canvas
var canvas_element = document.getElementById("canvas");
var cntx = canvas_element.getContext("2d");

// Alcune costanti del gioco
var grandezza_di_un_quadratino_elementare = 20;
var pezzi = ['T', 'z', 's', 'O', 'l', 'L', 'J'];
var colori = ["#02dba1", "#b134e2", "#6bc615", "#c68815", "#c61515", "#4286f4", "#dbdbdb"];

// Creo un oggetto giocatore
var player = {
	pos: {x: 0, y: 0},
	pezzo: null
};

function assegnaPezzo() {
	var pezzo_a_caso = pezzi[Math.floor(Math.random()*pezzi.length)];
	player.pezzo = creaPezzo('T');
}

function creaPezzo(pezzo) {
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

function disegnaPezzo(matricePezzo) {
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
				cntx.fillRect(c*grandezza_di_un_quadratino_elementare+player.pos.x,
							  r*grandezza_di_un_quadratino_elementare+player.pos.y,
							  grandezza_di_un_quadratino_elementare,
							  grandezza_di_un_quadratino_elementare);
			}
		}
	}
}

// Logica dell'animazione
var istante_precedente = 0;
var contatore_tempo = 0;
function update(istante_attuale=0) {
	// questa è una built-in function predefinita dei browser
	requestAnimationFrame(update);

	var delta = istante_attuale-istante_precedente;
	istante_precedente = istante_attuale;
	contatore_tempo += delta;
	// Il pezzo deve cadere ogni secondo di un passo elementare
	if (contatore_tempo>1000) {
		contatore_tempo = 0;
		// Abbasso il giocatore di una quota elementare
		player.pos.y += grandezza_di_un_quadratino_elementare;

		// Disegno le cose
		// Primo passo resetto lo sfondo a nero con un rettangolo che copre l'intero canvas
		cntx.fillStyle = "#000";
		cntx.fillRect(0,0, canvas.width, canvas.height);
		// Secondo passo disegno il pezzo del giocatore ovunque si trovi in questo istante
		disegnaPezzo(player.pezzo);
	}
}

// Qui faccio partire il gioco
assegnaPezzo();
update();
