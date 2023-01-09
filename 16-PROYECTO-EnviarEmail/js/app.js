document.addEventListener( 'DOMContentLoaded' , function  () {
	
	const email = {
		email : '',
		asunto : '',
		mensaje : '',
		
	}


	const inputEmail = document.querySelector('#email');
	const inputAsunto = document.querySelector("#asunto");
	const inputMensaje = document.querySelector("#mensaje");
	const formulario = document.querySelector("#formulario");
	const btnSubmit = document.querySelector('#formulario button[type="submit"]');
	const btnReset = document.querySelector('#formulario button[type="reset"]');
	// const btnSubmit = document.querySelector('#formulario button[type="submit"]');
	const spinner = document.querySelector('#spinner');
	const inputCC = document.querySelector('#CC');
	console.log(formulario);

	inputEmail.addEventListener('blur',validar);

	inputAsunto.addEventListener('blur', validar);

	inputMensaje.addEventListener('blur', validar);

	btnReset.addEventListener('click', resetFormulario );

	formulario.addEventListener('submit', enviarEmail);

	inputCC.addEventListener('blur', emailOpcional);

	function emailOpcional(e){
		
		email[e.target.name] = e.target.value.trim().toLowerCase();

        if(!validarEmail(e.target.value)){
            mostrarAlerta('El email no es válido', e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
        }else{
            limpiarAlerta(e.target.parentElement);
            comprobarEmail();
        };

        if(e.target.value === ''){
            delete email.cc;
            limpiarAlerta(e.target.parentElement);
            comprobarEmail();
            return;
        };
		

	}
	

	function enviarEmail(e){
		e.preventDefault();

		spinner.classList.add('flex');
		spinner.classList.remove('hidden');

		setTimeout(() =>{
			spinner.classList.remove('flex');
			spinner.classList.add('hidden');

			resetFormulario();

			const emailEnviado = document.createElement('P');
			emailEnviado.classList.add('bg-green-500','text-white', 'p-2', 'text-center', 'rounde-lg', 'mt-10',
				'font-bold', 'text-sm', 'uppercase');
			emailEnviado.textContent = 'Mensaje enviado';
			formulario.appendChild(emailEnviado);

			setTimeout(()=>{
				emailEnviado.remove();
			},1000)

		},3000)
	}

	function validar(e){
		if (e.target.value.trim() === '') {
			
			mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
			email[e.target.name] = '';
			comprobarEmail();
			return;
		}

		if(e.target.id === 'email' &&  !validarEmail(e.target.value)){
			mostrarAlerta(`El campo email no es valido ${e.target.parentElement}`);
			email[e.target.name] = '';
			comprobarEmail();
			return;
		}

		limpiarAlerta(e.target.parentElement);

		email[e.target.name] = e.target.value.trim().toLowerCase();

		comprobarEmail();
	}


	function mostrarAlerta (mensaje, nivel) {

		limpiarAlerta(nivel);

		const error = document.createElement('P');

		error.textContent = mensaje;
		error.classList.add('bg-red-600', 'text-white', 'p-2' )

		nivel.appendChild(error);

	}

	function limpiarAlerta(nivel){
		const existeAlerta = nivel.querySelector('.bg-red-600');

		if (existeAlerta) {
			existeAlerta.remove();
		}

	}

	function validarEmail(email){

		const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 
		const resultado = regex.test(email);
		return resultado;
	}

	function comprobarEmail() {
		// console.log(email);
		if (Object.values(email).includes('')){
			btnSubmit.classList.add('opacity-50');
			btnSubmit.disabled = true;
			return;
		}
	
		btnSubmit.classList.remove('opacity-50');
		btnSubmit.disabled = false;
		
		// console.log(Object.values(email).includes(''));
	}

	function resetFormulario(){
		
		email.email = '';
		email.asunto = '';
		email.mensaje = '';
		email.cc = '';
		comprobarEmail();
		formulario.reset();
	}

});