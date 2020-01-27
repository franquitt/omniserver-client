var socket = require('socket.io-client')('http://omnicanalapi.tech:1335');

//funcion que se ejecuta al conectarse
socket.on('connect', () => {

	console.log("Enlace conectado");

	socket.emit("sesion", {
		action: "login",
		user: "USUARIO",
		pass: "PASSWORD"
	})

});


//funcion que procesa los mensajes provenientes del topic sesion
socket.on('sesion', (msg) => {
	console.log("sesion");
	console.log(msg);
	//nos fijamos de que verbo se trataba
	switch(msg.action){
		case "login":
			if(msg.response == "success"){
				socket.emit("chats", {
					action: "getHome"
				});
			}
		break;
	}
});

//funcion que procesa los mensajes provenientes del topic chats
socket.on('chats', (msg) => {

	console.log("chats");
	switch(msg.action){
		case "getHome":
			console.log("Se muestran los primeros 2 msg del home");
			console.log(msg.payload.slice(0, 2));
			socket.emit("sesion", {
					action: "timeout"
				});
		break;
	}

});


//funcion que se ejecuta al desconectarse
socket.on('disconnect', data => {

	console.log("Enlace desconectado");

});