

const fs = require('fs');


// VARIABLE DONDE SE ALMACENARA EL LISTADO DE TAREAS POR HACER
let listadoPorHacer = [];   

// FUNCION PARA GUARDAR LAS TAREAS CREADAS EN EL ARCHIVO JSON DE DB
const guardarDB = () => {

	let data = JSON.stringify(listadoPorHacer);    //ESTA LINEA DE COMANDO CONVIERTE EL ARREGLO EN UN FORMATO JSON PARA ALMACENAR EN BD

	// GUARDAMOS LA TAREA EN EL ARCHIVO JSON
	fs.writeFile('db/data.json', data, (err) => {
			if (err) console.log('No se pudo grabar', err);				
		});

}

// FUNCION PARA LEER TAREAS GUARDADAS EN EL ARCHIVO .JSON
const cargarDB = () => {
	try{
		listadoPorHacer = require('../db/data.json'); //PARA LEER EL ARCHIVO .JSON SOLO LO REQUERIMOS YA QUE NODE, LO COVIERTE NUEVAMENTE EN JAVASCRIPT
	} catch (error){
		listadoPorHacer = [];
	}

}


// CREAMOS Y EJECUTAMOS LA FUNCION DE GUARDAR TAREA
const crear = (descripcion) => {

	cargarDB();

	let porHacer = {
		descripcion,
		completado: false
	};

	listadoPorHacer.push( porHacer );  //ACA INSERTAMOS LA NUEVA TAREA POR HACER AL ARREGLO LISTADO, PARA LUEGO EJECUTAR LA FUNCION GUARDAR

	guardarDB();

	return porHacer;

}
/*******************************************************************************************************************************/


// FUNCION PARA OBTENER EL LISTADO DE BD
const getListado = () => {
	cargarDB();
	return listadoPorHacer;

}

/*******************************************************************************************************************************/

const actualizar = (descripcion, completado = true) => {

	cargarDB();

	//ACA BUSCAMOS LA COINCIDENCIA DE LA TAREA HA ACTUALIZAR CON EL LISTADO DE BD
	let index = listadoPorHacer.findIndex( tarea => tarea.descripcion === descripcion );

	if (index >=0){
		listadoPorHacer[index].completado = completado; //ACTUALIZAMOS EL VALOR COMPLETADO EN LA BD
		guardarDB();
		return true;
	}else{
		return false;
	}

}

const borrar = (descripcion) => {

	cargarDB();

	let nuevoListado = listadoPorHacer.filter( tarea => tarea.descripcion !== descripcion );

	if (listadoPorHacer.length === nuevoListado.length) {
		return false;
	}else{
		listadoPorHacer = nuevoListado;
		guardarDB();
		return true;
	}
	delete nuevoListado;



}

module.exports = {
	crear,
	getListado,
	actualizar,
	borrar
}