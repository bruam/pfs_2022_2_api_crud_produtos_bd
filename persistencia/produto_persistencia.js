const { Client } = require('pg')

const conexao = {
    user: 'postgres',
    host: '127.0.0.1',
    database: 'crud_produtos',
    password: 'postgres',
    port: 5432,
  }

exports.listar = (callback) => {
    const client = new Client(conexao); //instanciando um objeto client para cada função de chamada ao banco
    client.connect();
    const sql = "SELECT * FROM produto";
    client.query(sql, (err, res) => { //execução da query usando callback
        if(err) {
            console.log("ERRO: " + err);
            callback(err, undefined);
        }
        else {
            console.log(res.rows);
            callback(undefined,res.rows);
        }        
        client.end();
    })
}

exports.buscarPorId = (id, callback) => {
    const client = new Client(conexao);
    client.connect();
    const sql = "SELECT * FROM produto WHERE id = $1";
    const values = [id]
    client.query(sql, values, (err, res) => {
        if(err) {
            console.log("ERRO: " + err);
            callback(err, undefined);
        }
        else {
            console.log(res.rows);
            callback(undefined,res.rows);
        }        
        client.end();
    })
}

exports.inserir = (produto, callback) => {
    const client = new Client(conexao);
    client.connect();
    const sql = "INSERT INTO produto (nome, preco) VALUES($1, $2) RETURNING *";
    const values = [produto.nome, produto.preco];

    client.query(sql, values, (err, res) => {
        if(err) {
            console.log("ERRO: " + err);
            callback(err, undefined);
        }
        else {
            console.log(res.rows[0]);
            callback(undefined,res.rows[0]);
        }        
        client.end();
    })
}

exports.atualizar = (id, produto, callback) => {
    const client = new Client(conexao);
    client.connect();
    const sql = "UPDATE produto SET nome=$1, preco=$2 WHERE id = $3 RETURNING *";
    const values = [produto.nome, produto.preco, id];

    client.query(sql, values, (err, res) => {
        if(err) {
            console.log("ERRO: " + err);
            callback(err, undefined);
        }
        else {
            console.log(res.rows[0]);
            callback(undefined,res.rows[0]);
        }        
        client.end();
    })
}

exports.deletar = (id, callback) => {
    const client = new Client(conexao);
    client.connect();
    const sql = "DELETE FROM produto WHERE id = $1 RETURNING *";
    const values = [id]
    client.query(sql, values, (err, res) => {
        if(err) {
            console.log("ERRO: " + err);
            callback(err, undefined);
        }
        else {
            console.log(res.rows[0]);
            callback(undefined,res.rows[0]);
        }        
        client.end();
    })
}