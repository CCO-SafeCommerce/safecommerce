const aplicacaoModel = require('../models/aplicacaoModel')

function cadastrar(req, res) {
    var fkServidor = req.body.idServidor
    var nomeAplicacao = req.body.nomeAplicacao
    var portaAplicacao = req.body.portaAplicacao

    if (fkServidor == null) {
        res.status(403).send("Id do Servidor está indefinido")
    } else if (nomeAplicacao == null) {
        res.status(403).send("Nome da aplicação está indefinido")
    } else if (portaAplicacao == null) {
        res.status(403).send('Porta está indefinida')
    } else {
        aplicacaoModel.cadastrar(fkServidor, nomeAplicacao, portaAplicacao).then(resposta => {
            console.log(resposta)
            res.json(resposta)
        }).catch(function (erro) {
            console.log(erro);
            console.log(
                "\nHouve um erro ao realizar o cadastro da empresa! Erro: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        });
    }
}

function monitorando(req, res) {
    var fkServidor = req.params.idServidor

    if (fkServidor == null) {
        res.status(403).send("Id do Servidor está indefinido")
    } else {
        aplicacaoModel.getAplicacoesByFkServidor(fkServidor).then(resposta => {
            console.log(resposta)
            res.json(resposta)
        }).catch(function (erro) {
            console.log(erro);
            console.log(
                "\nHouve um erro ao realizar o cadastro da empresa! Erro: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        });
    }
}

function editar(req, res) {
    var idAplicacao = req.body.idAplicacao;
    var nomeAplicacao = req.body.nomeAplicacao
    var portaAplicacao = req.body.portaAplicacao

    if (idAplicacao == null) {
        res.status(403).send("Id da Aplicação está indefinido")
    } else if (nomeAplicacao == null) {
        res.status(403).send("Nome da aplicação está indefinido")
    } else if (portaAplicacao == null) {
        res.status(403).send('Porta está indefinida')
    } else {
        aplicacaoModel.atualizar(idAplicacao, nomeAplicacao, portaAplicacao).then(resposta => {
            console.log(resposta)
            res.json(resposta)
        }).catch(function (erro) {
            console.log(erro);
            console.log(
                "\nHouve um erro ao realizar o cadastro da empresa! Erro: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        });
    }
}

function deletar(req, res) {
    var idAplicacao = req.params.idAplicacao;

    if (idAplicacao == null) {
        res.status(403).send("Id do Servidor está indefinido")
    } else {
        aplicacaoModel.deletar(idAplicacao).then(resposta => {
            console.log(resposta)
            res.json(resposta)
        }).catch(function (erro) {
            console.log(erro);
            console.log(
                "\nHouve um erro ao realizar o cadastro da empresa! Erro: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        });
    }
}

module.exports = {
    cadastrar,
    monitorando,
    editar, 
    deletar
}