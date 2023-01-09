//variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let arrTweets = [];




//event listener
eventListeners();

function eventListeners(){
	formulario.addEventListener('submit', agregarTweet);

	document.addEventListener('DOMContentLoaded', ()=>{
		arrTweets = JSON.parse(localStorage.getItem('tweets')) || [];

		agregarContenido();
	});
}




//funciones

function agregarTweet (e) {
	e.preventDefault();

	//textarea
	const tweet = document.querySelector('#tweet').value;

	if (tweet === '') {

		mensajeFormularioVacio('El campo no puede ser vacio');
		return
	}

	const tweetObj = {
		id: Date.now(),
		tweet
	}

	arrTweets.push(tweetObj)

	agregarContenido();

	formulario.reset();

}

function mensajeFormularioVacio(error){
	const mensajeError = document.createElement('P');

	mensajeError.textContent = error;
	mensajeError.classList.add('error');

	//inserta en el contenido
	const contenido = document.querySelector('#contenido');
	contenido.appendChild(mensajeError);

	//elimina el error
	setTimeout(() =>{
		mensajeError.remove()
	} , 3000);

}

function agregarContenido(){
	
	limpiarHTML();

	if (arrTweets.length > 0) {

		arrTweets.forEach( tweet =>{

			const btnEliminar = document.createElement('a');
			btnEliminar.classList.add('borrar-tweet');
			btnEliminar.textContent = 'X';

			btnEliminar.onclick = () =>{
				borrarTweet(tweet.id);
			};

			const tweetActual = document.createElement('li');

			tweetActual.innerText = tweet.tweet;

			tweetActual.appendChild(btnEliminar);

			//inserta en el HTML
			listaTweets.appendChild(tweetActual);
		});
	}

	sincronizarStorage();
}

function borrarTweet(id){

	arrTweets = arrTweets.filter(tweet => tweet.id !== id);

	agregarContenido();
}


function sincronizarStorage(){

	localStorage.setItem('arrTweets', JSON.stringify(arrTweets));
}

function limpiarHTML(){
	while (listaTweets.firstChild) {
		
		listaTweets.removeChild(listaTweets.firstChild);
	}
}