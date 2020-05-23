const descripcion = {
		demand: true,
		alias: 'd',
		desc: 'Descripción de la tarea por hacer'
	};

const completado = {
		alias: 'c',
		default: true,
		desc: 'Marca como completado o pendiente la tarea'
};


const argv = require('yargs')
				.command('crear','Crear una tarea por hacer',{	descripcion	})
				.command('actualizar', 'Actualiza el estado completado de una tarea', {
					descripcion,
					completado
				})
				.command('borrar','Borrar una Tarea',{ descripcion })
				.help()
				.argv;

module.exports = {
    argv
}