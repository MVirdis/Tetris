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
	player.pezzo = creaPezzo(pezzo_a_caso);
}

function creaPezzo(pezzo) {
	//Per ora non sono implementati altri pezzi oltre alla T
	switch(pezzo) {
		default:
		var matrice_nuova =  [[0,0,0],
							  [1,1,1],
							  [0,1,0]];
		return matrice_nuova;
		break;
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
				cntx.fillStyle = "#ff0000";// colore rosso
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
