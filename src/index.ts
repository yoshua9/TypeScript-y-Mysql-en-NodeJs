import Server from './server/server';
import router from './router/router';
import MySQL from './mysql/mysql';


const server= Server.init(3000);
server.app.use(router);

//arrancamos la conexión a base datos pero no es obligatorio
//MySQL.instance;



server.start(() => {
    console.log('Servidor corriendo en el puerto 3000');
})


