const produtoPersistencia = require('../persistencia/produto_persistencia');

const listaProdutos = [
    {
        id: 1,
        nome: "PS4",
        preco: 4000
    },
    {
        id: 2,
        nome: "XBOX",
        preco: 2500
    }
]

let idGerador = 3;

function geraId() {
    return idGerador++
}

// Para exportar a função diretamente se usa o exports. ao invés de const

exports.listar = (req, res) => {
    produtoPersistencia.listar( (err, listaProdutos) => {
        if(err){
            return res.status(500).json({erro:err});
        }
        else {
            return res.json(listaProdutos);
        }
    });
}

exports.buscarPorId = (req, res) => {
    const id = req.params.id;
    produtoPersistencia.buscarPorId(id, (err, produto) => {
        if(err) {
            return res.status(404).json({erro:"Produto nao encontrado"})
        }
        else {
            return res.json(produto);
        }
    })    
}

exports.inserir = (req,res) => {    
    const produto = req.body
    produtoPersistencia.inserir(produto, (err, produtoInserido) => {
        if(err) {
            return res.status(500).json({erro:err});
        }
        else {
            return res.status(201).json(produtoInserido);
        }
    });
}

exports.atualizar = (req, res) => {
    const id = req.params.id;
    const produto = req.body;

    produtoPersistencia.atualizar(id, produto, (err, produtoAtualizado) => {
        if(err) {
            return res.status(404).json({erro:"Produto nao encontrado"})
        }
        else {
            return res.status(201).json(produtoAtualizado);
        }
    });  
}

exports.deletar = (req, res) => {
    const id = req.params.id;

    produtoPersistencia.deletar(id, (err, produtoDeletado) => {
        if(err) {
            return res.status(404).json({erro:"Produto nao encontrado"})
        }
        else {
            return res.status(200).json(produtoDeletado);
        }
    })
}

// exportando todas as funções
//module.exports = { listar, ... }