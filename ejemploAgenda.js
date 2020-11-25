let socket = require('socket.io-client')("https://omnicanalapi.tech", {path: "/socketio/socket.io"});

//funcion que se ejecuta al conectarse
socket.on('connect', () => {

	console.log("Enlace conectado");

	socket.emit("sesion", {
		action: "login",
		user: "USER",
		pass: "PASSWORD"
	})

});


//funcion que procesa los mensajes provenientes del topic sesion
socket.on('sesion', (msg) => {
	console.log("sesion");
	console.log(msg);
	//nos fijamos de que verbo se trataba
	switch (msg.action) {
		case "login":
			if (msg.response == "success") {
				/*socket.emit("agenda", {
					action: "getTypes"
				});*/

				socket.emit("agenda", {
					action: 'updateType', payload: {
						activo: true,
						borrado: false,
						id: 23,
						listar: true,
						nombre: 'test',
						obligatorio: false,
						orden: 29,
						placeholder: '',
						primario: false,
						valorConfigAgendaObject: [
							{id: 852, valor: "opcionb"},


						]
					}
				});

			}
			break;
	}
});

//funcion que procesa los mensajes provenientes del topic chats
socket.on('agenda', (msg) => {
    console.log("agenda");

    if(msg.tipos){
        const tipo_select_test = msg.tipos.find(tipo => (tipo.id === 23))

        console.log(tipo_select_test)
    }else{
        console.log(msg)
    }


});


//funcion que se ejecuta al desconectarse
socket.on('disconnect', data => {

	console.log("Enlace desconectado");

});
