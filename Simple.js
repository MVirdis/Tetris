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
		cadutaGiocatore();

		// Disegno la scena
		disegnaScena();
	}
}

// Creo una funzione per far cadere il giocatore e una per disegnare la scena
// così che si possano chiamare da varie parti del codice
function cadutaGiocatore() {
	// Il contatore va resettato ogni volta che il giocatore cade
	contatore_tempo = 0;
	// Abbasso il giocatore di una quota elementare
	player.pos.y += grandezza_di_un_quadratino_elementare;
	// Se collido con il pavimento
	if(collide()) {
		// Riporto il pezzo dov'era appena prima di collidere
		player.pos.y -= grandezza_di_un_quadratino_elementare;
		// Fisso il pezzo nel contenitore
		fissaPezzoGiocatore();
		//Riporto il giocatore in alto e riassegno un pezzo a caso
		player.pos.y = 0;
		assegnaPezzo();
	}
}

function disegnaScena() {
	// Primo passo resetto lo sfondo a nero con un rettangolo che copre l'intero canvas
	cntx.fillStyle = "#000";
	cntx.fillRect(0,0, canvas.width, canvas.height);
	// Secondo passo disegno il pezzo del giocatore ovunque si trovi in questo istante
	disegnaPezzo(player.pezzo);
}

// Aggiunge al documento un gestore degli eventi di pressione di un tasto
document.addEventListener("keydown", gestisciTasti);

function gestisciTasti(evento) {
	switch(evento.keyCode) {
		case 40://Freccia giù
			cadutaGiocatore();//Fa già il controllo della collisione
			// Forza a disegnare la scena prima che sia passato un secondo
			disegnaScena();
		break;
		case 39:// Freccia dx
			player.pos.x += grandezza_di_un_quadratino_elementare;

			// Se collido lo riporto dove stava e mi risparmio di ridisegnare la scena
			if(collide()) {
				player.pos.x -= grandezza_di_un_quadratino_elementare;
			} else {
				disegnaScena();
			}
		break;
		case 37://Freccia sx
			player.pos.x -= grandezza_di_un_quadratino_elementare;

			// Se collido lo riporto dove stava e mi risparmio di ridisegnare la scena
			if(collide()) {
				player.pos.x += grandezza_di_un_quadratino_elementare;
			} else {
				disegnaScena();
			}
		break;
		default:// Lo uso per vedere quale keyCode corrisponde ai vari tasti
			// Per aprire la console da Google Chrome premere Ctrl+Maiusc+I
			console.log(evento.keyCode);
	}
}

// Logica delle dinamiche dei pezzi
// Devo creare il contenitore che conterrà i pezzi una volta che sono arrivati in fondo
// Ogni pezzo occupa una dimensione elementare dato che il canvas è largo  canvas.width
// e lungo canvas.height posso calcolare facilmente il numero di caselle che deve avere il contenitore
var contenitore = [];//Array vuoto, sarà poi una matrice

function creaContenitore() {
	var larghezza_contenitore = canvas.width/grandezza_di_un_quadratino_elementare;
	var altezzza_contenitore = canvas.height/grandezza_di_un_quadratino_elementare;

	var contenitore_temporaneo = [];

	for(var r=0; r<altezzza_contenitore; ++r) {
		contenitore_temporaneo[r] = [];
		for(var c=0; c<larghezza_contenitore; ++c) {
			contenitore_temporaneo[r][c] = 0;// Inizializzo un contenitore senza pezzi
		}
	}

	return contenitore_temporaneo;
}

// Serve per inserire nel contenitore un pezzo nel punto esatto
// in cui si trova quando viene chiamata questa funzione
function fissaPezzoGiocatore() {
	for(var r=0; r<player.pezzo.length; ++r) {
		for(var c=0; c<player.pezzo[0].length; ++c) {

			if(player.pezzo[r][c]!=0) {
				contenitore[r+player.pos.y/grandezza_di_un_quadratino_elementare][c+player.pos.x/grandezza_di_un_quadratino_elementare] = player.pezzo[r][c];
			}

		}
	}
}

// Logica delle Collisioni
// Bisogna controllare in ogni momento se il giocatore è in collisione o con una parete
// o con un pezzo del contenitore
function collide() {
	for(var r=0; r<player.pezzo.length;++r) {
		for(var c=0; c<player.pezzo[0].length;++c) {
			var player_x = player.pos.x/grandezza_di_un_quadratino_elementare;
			var player_y = player.pos.y/grandezza_di_un_quadratino_elementare;
			if (player.pezzo[r][c]!=0) {
				if (r+player_y>=contenitore.length ||
					c+player_x<0 ||
					c+player_x>=contenitore[0].length ||
					contenitore[r+player_y][c+player_x]!=0) {
					return true;
				}
			}
		}
	}
	return false;
}

// Qui faccio partire il gioco
contenitore = creaContenitore();
assegnaPezzo();
update();
