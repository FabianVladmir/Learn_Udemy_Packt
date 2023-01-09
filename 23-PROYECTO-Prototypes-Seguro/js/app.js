

 //constructores
function Seguro(marca, year, tipo){
	this.marca = marca;
	this.year = year;
	this.tipo = tipo;
}


function UI(){}


//select años
UI.prototype.fillOption = () =>{
	const maxYear = new Date().getFullYear(),
		  minYear = maxYear - 20;

	
	const selectYear = document.querySelector('#year');

	for (let i = maxYear; i > minYear; i--) {
		let option = document.createElement('option');
		option.value = i;
		option.textContent = i;
		selectYear.appendChild(option);
	}
}

const ui = new UI();

document.addEventListener('DOMContentLoaded', () =>{

	ui.fillOption();

});


eventListeners();
function eventListeners () {
	const form = document.querySelector('#cotizar-seguro');
	form.addEventListener('submit', quoteInsurance);
}

function quoteInsurance(e){
	e.preventDefault();

	//marca seleccionada
	const marca = document.querySelector('#marca').value;


	//año seleccionado
	const year = document.querySelector('#year').value;


	//tipo de cobertudad seleccionado
	const tipo = document.querySelector('input[name="tipo"]:checked').value;
	console.log(tipo);



}

