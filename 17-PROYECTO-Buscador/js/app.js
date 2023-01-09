const marca = document.querySelector('#marca');
const precioMin = document.querySelector('#minimo');
const precioMax = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');
const yearCars = document.querySelector('#year');

const resultado = document.querySelector('#resultado');


const maxYear = new Date().getFullYear() - 2;
const minYear = maxYear - 10;



const datosBusqueda = {

	marca: '',
	year: '',
	precioMin : '',
	precioMax : '',
	puerta : '',
	transmision : '',
	color : ''
};

//eventos
document.addEventListener( 'DOMContentLoaded', ()=>{

	mostrarAutosFiltrados(autos);

	llenarSelectConAnios();
});

//select de busqueda
marca.addEventListener('change', e =>{
	datosBusqueda.marca = e.target.value;

	filtrarAutos();
});

precioMax.addEventListener('change', e =>{

	datosBusqueda.precioMax = e.target.value;

	filtrarAutos();
});

precioMin.addEventListener('change', e =>{

	datosBusqueda.precioMin = e.target.value;

	filtrarAutos();
});

puertas.addEventListener('change', e =>{

	datosBusqueda.puerta = e.target.value;

	filtrarAutos();
});

transmision.addEventListener('change', e =>{

	datosBusqueda.transmision = e.target.value;

	filtrarAutos();
});

color.addEventListener('change', e =>{

	datosBusqueda.color = e.target.value;

	filtrarAutos();
});

yearCars.addEventListener('change', e =>{

	datosBusqueda.year = e.target.value;

	filtrarAutos();
	
});





function mostrarAutosFiltrados (autos) {

	limpiarFiltrado();

	autos.forEach(auto =>{
		const {marca, modelo, year, puertas, transmision, precio, color} = auto;
		const autoHTML = document.createElement('p');

		autoHTML.textContent = `
			${marca} - ${year} - ${puertas} Puertas - Transmision ${transmision} - Precio: ${precio} - Color: ${color}  

		`;


		resultado.appendChild(autoHTML);
	});
}

function limpiarFiltrado() {
	while (resultado.firstChild) {
		resultado.removeChild(resultado.firstChild);
	}
}


function llenarSelectConAnios(){

	for (let i = maxYear; i > minYear; i--){
					
		const opcionActual = document.createElement('option');

		opcionActual.value = i;
		opcionActual.textContent = i;

		year.appendChild(opcionActual);
	}
}

function filtrarAutos () {
	const autoFiltrado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinPrecio).filter(filtrarMaxPrecio)
	.filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor);

	// console.log(autoFiltrado);

	if (autoFiltrado.length) {
		mostrarAutosFiltrados(autoFiltrado)
	}

	else {
		noResultado();
	}
}

function noResultado(){

	limpiarFiltrado();
	const noResultado = document.createElement('div');
	noResultado.classList.add('alerta', 'error');
	noResultado.textContent = 'No existe resultado';

	resultado.appendChild(noResultado);

}

function filtrarMarca(auto){
	const {marca} = datosBusqueda;
	if (marca) {
		return auto.marca === marca;
	}
	return auto;
}

function filtrarYear(auto){
	const {year} = datosBusqueda;
	if (year) {
		return auto.year === parseInt(year);
	}
	return auto;
}

function filtrarMinPrecio(auto){
	const {precioMin} = datosBusqueda;
	if (precioMin) {
		return auto.precio >= precioMin;
	}
	return auto;
}

function filtrarMaxPrecio(auto){
	const {precioMax} = datosBusqueda;
	if (precioMax) {
		return auto.precio <= precioMax;
	}
	return auto;
}

function filtrarPuertas(auto){
	const {puerta} = datosBusqueda;
	if (puerta) {
		return auto.puertas >= parseInt(puerta);
	}
	return auto;
}

function filtrarTransmision(auto){
	const {transmision} = datosBusqueda;
	if (transmision) {
		return auto.transmision === transmision;
	}
	return auto;
}

function filtrarColor(auto){
	const {color} = datosBusqueda;
	if (color) {
		return auto.color === color;
	}
	return auto;
}



