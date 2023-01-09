const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");

let articulosCarros = [];

cargarEventListener();

function cargarEventListener(){

	listaCursos.addEventListener( 'click' , agregarCurso);

	carrito.addEventListener( 'click', eliminarCurso);

	vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
}


function agregarCurso(e) {

	e.preventDefault();
	if (e.target.classList.contains('agregar-carrito')) {
		let cursoActual = e.target.parentElement.parentElement
		extraerDatosBtn(cursoActual);
	}
}

function extraerDatosBtn(cursoActual){
	// console.log(cursoActual);

	const camposCurso = {
		imagen: cursoActual.querySelector('img').src,
		titulo: cursoActual.querySelector('h4').textContent,
		precio: cursoActual.querySelector(".precio span").textContent,
		id: cursoActual.querySelector('a').getAttribute('data-id'),
		cantidad: 1
	}
	// console.log(camposCurso);
	// console.log(camposCurso.precio);

	const cursoExiste = articulosCarros.some(cursoActual => cursoActual.id === camposCurso.id );

	if (cursoExiste) {
		const curso = articulosCarros.map(cursoActual => {
			if(cursoActual.id === camposCurso.id){
				cursoActual.cantidad++;
				return cursoActual;
			}
			// else {
			// 	return cursoActual;
			// }
			return cursoActual;
		})
	}
	else{
		articulosCarros.push(camposCurso);
	}	

	console.log(articulosCarros);

	agregarArticulosHTML();
}



function agregarArticulosHTML(){

	limpiarCarritoHTML();

	articulosCarros.forEach(cursoActual => {
		console.log(cursoActual)
		const {imagen, titulo, precio, cantidad, id} = cursoActual;
		const row = document.createElement('tr');

		row.innerHTML = `
			<td>
				<img src="${imagen}" width = '100'>				
			</td>

			<td>
				${titulo}
			</td>

			<td>${precio} </td>
			<td>${cantidad} </td>
			<td>
				<a href="#" class="borrar-curso" data-id="${id}" > X </a>
			</td>	
		`

		//add to body
		contenedorCarrito.appendChild(row);

	})
}

function limpiarCarritoHTML(){

	// contenedorCarrito.innerHTML = '';


	while (contenedorCarrito.firstChild) {
		contenedorCarrito.removeChild(contenedorCarrito.firstChild);
	}
}

function eliminarCurso(e){

	if (e.target.classList.contains('borrar-curso')) {
		const cursoID = e.target.getAttribute('data-id');

		articulosCarros = articulosCarros.filter(cursoActual => cursoActual.id !== cursoID);

		agregarArticulosHTML();
	}

}

function vaciarCarrito () {
	articulosCarros = [];
	limpiarCarritoHTML();
}