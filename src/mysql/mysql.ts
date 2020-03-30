import mysql = require('mysql');

export default class MySQL {

    private static _instance:MySQL;
    
    cnn: mysql.Connection;
    conectado: boolean = false;
    
    constructor(){
        console.log('Clase inicializada');

        this.cnn = mysql.createConnection({
            host     : 'localhost',
            user     : 'node_user',
            password : '123456',
            database : 'node_db'
          });

          this.conectarBD();
    }

    //se encarga de generar la conexión a base de datos en caso de no estar abierta sino utiliza la ya activa
    public static get instance(){
        return this._instance || (this._instance = new this());
    }

    static ejecutarQuery(query:string,callback:Function){

        this.instance.cnn.query(query, (error, results: Object[], fields: Object[]) => {
        if (error){
            console.log("Error en query");
            console.log(error);
            return callback(error);
        } 
        if (results.length === 0){
            callback('El registro solicitado no existe');
        }else{
            callback(null,results);
        }
        });

    }

    private conectarBD(){
        this.cnn.connect((err:mysql.MysqlError) => {

            if(err){
                console.log(err.message);
                return;
            }

            console.log("Base de datos online");

        });
    }

}



// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });

// connection.end();