//const pg = require ('pg')
//const Client = pg.Client;
const { Client } = require('pg')

const conexao = {
    user: 'postgres',
    host: '127.0.0.1',
    database: 'crud_produtos',
    password: 'postgres',
    port: 5432,
  }

exports.listar = (callback) => {
    const client = new Client(conexao);
    client.connect();
    const sql = "SELECT * FROM PRODUTOS";

    client.query(sql, (err, res) => {
        if(err) {
            console.log("ERRO", err)
            callback(err, undefined);
        }
        else {
            console.log("Resultado", res.rows)
            callback(undefined, res.rows);
        }
        client.end()
    })
    console.log("Execucao depois da query");

}


  