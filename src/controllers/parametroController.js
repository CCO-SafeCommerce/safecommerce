var parametroModel = require('../models/parametroModel')

function obterParametros(req,res) {
    var id = req.params.idServer;

    if (id == null || id == "") {
        res.status(400).send("Id do Servidor está undefined!");
    } else {
        parametroModel.obterParametros(id).then(function (resultado) {
            res.json(resultado.map(linha => linha.fk_Metrica))
        }).catch(function (erro) {
            console.log(erro);
            console.log(
                "\nHouve um erro ao realizar o cadastro! Erro: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        });
    }

}

function atualizar(req, res) {
    var id = req.body.idServidor;
    var adicionar = req.body.adicionar;
    var remover = req.body.remover;

    if (id == null || id == "") {
        res.status(400).send("Id do Servidor está undefined!");
    } else if (adicionar == null) {
        res.status(400).send("Adicionar está undefined!");
    } else if (remover == null) {
        res.status(400).send("Remover está undefined!");
    } else {
        Promise.all([
            (adicionar.length > 0 && parametroModel.adicionar(id, adicionar)),
            (remover.length > 0 && parametroModel.remover(id, remover))
        ]).then(function (resultado) {
            res.json(resultado)
        }).catch(function (erro) {
            console.log(erro);
            console.log(
                "\nHouve um erro ao realizar o cadastro! Erro: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        });
    }
}

module.exports = {
    obterParametros,
    atualizar
}