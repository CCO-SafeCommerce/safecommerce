const processoModel = require("../models/processoModel");

function obterProcessos(req,res) {
    var id = req.params.idServidor

    if (id == undefined) {
        res.status(400).send("Id do Servidor está undefined!");
    } else {
        processoModel.obterProcessos(id).then(function (resultado) {
            res.json(resultado);

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

function encerrarProcessos(req,res) {
    var pid = req.body.pid
    var fkServidor = req.body.idServidor
    if (pid == undefined) {
        res.status(400).send("Pid do processo está undefined!");
    } else {
        processoModel.encerrarProcessos(fkServidor, pid).then(function (resultado) {
            res.json(resultado);

        }).catch(function (erro) {
            console.log(erro);
            console.log(
                "\nHouve um erro ao realizar o encerramento! Erro: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        });
    }
}

function obterProcessosNotDesejavel(req,res) {
    var id = req.params.idServidor

    if (id == undefined) {
        res.status(400).send("Id do Servidor está undefined!");
    } else {
        processoModel.obterProcessosNotDesejavel(id).then(function (resultado) {
            res.json(resultado);

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
    obterProcessos,
    encerrarProcessos,
    obterProcessosNotDesejavel
}