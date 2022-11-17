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

module.exports = {
    cadastrar
}