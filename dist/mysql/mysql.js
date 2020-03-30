"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
class MySQL {
    constructor() {
        this.conectado = false;
        console.log('Clase inicializada');
        this.cnn = mysql.createConnection({
            host: 'localhost',
            user: 'node_user',
            password: '123456',
            database: 'node_db'
        });
        this.conectarBD();
    }
    //se encarga de generar la conexión a base de datos en caso de no estar abierta sino utiliza la ya activa
    static get instance() {
        return this._instance || (this._instance = new this());
    }
    static ejecutarQuery(query, callback) {
        this.instance.cnn.query(query, (error, results, fields) => {
            if (error) {
                console.log("Error en query");
                console.log(error);
                return callback(error);
            }
            if (results.length === 0) {
                callback('El registro solicitado no existe');
            }
            else {
                callback(null, results);
            }
        });
    }
    conectarBD() {
        this.cnn.connect((err) => {
            if (err) {
                console.log(err.message);
                return;
            }
            console.log("Base de datos online");
        });
    }
}
exports.default = MySQL;
// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });
// connection.end();
