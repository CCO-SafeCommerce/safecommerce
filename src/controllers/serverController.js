const serverModel = require("../models/serverModel");
const parametroModel = require("../models/parametroModel");
const leituraModel = require("../models/leituraModel");

function getServers(req, res) {
    var idCompany = req.body.idCompanyServer;
    serverModel.getServers(idCompany)
        .then(
            function(result) {
                res.json(result);
            }
        ).catch(
            function(error) {
                console.log(error);
                console.log(
                    "\nHouve um erro ao receber os dados dos servidores! Erro ",
                    error.sqlMessage
                );
                res.status(500).json(error.sqlMessage);
            }
        );
}

function getCurrentServer(req, res) {
    var id = req.body.idServer;
    console.log(id + 'dadsadasdasdasd');

    serverModel.getCurrentServer(id)
        .then(
            function(result) {
                res.json(result);
            }
        ).catch(
            function(error) {
                console.log(error);
                console.log(
                    "\nHouve um erro ao receber os dados dos servidores! Erro ",
                    error.sqlMessage
                );
                res.status(500).json(error.sqlMessage);
            }
        )
}

function updateServer(req, res) {
    var id = req.body.idServidorServer
    var modelo = req.body.modeloServer
    var so = req.body.soServer

    if (id == undefined) {
        res.status(400).send("Id do Servidor está undefined!");
    } else if (modelo == undefined) {
        res.status(400).send("Modelo está undefined!");
    } else if (so == undefined) {
        res.status(400).send("SO está undefined!");
    } else {
        serverModel.updateServer(id, modelo, so).then(function (result) {
            res.json(result)
        }).catch(function(error) {
            console.log(error);
            console.log(
                "\nHouve um erro ao receber os dados dos servidores! Erro ",
                error.sqlMessage
            );
            res.status(500).json(error.sqlMessage);
        })

    }
}

function deleteServer(req, res) {
    var id = req.params.idServidor

    if (id == undefined) {
        res.status(400).send("Id do Servidor está undefined!");
    } else {
        parametroModel.limparParametros(id).then(function (_) {
            leituraModel.limparHistoricoServidor(id).then(function (_) {
                serverModel.deleteServer(id).then(function (result) {
                    res.json(result)
                    
                }).catch(function(error) {
                    console.log(error);
                    console.log(
                        "\nHouve um erro ao receber os dados dos servidores! Erro ",
                        error.sqlMessage
                    );
                    res.status(500).json(error.sqlMessage);
                })

            }).catch(function(error) {
                console.log(error);
                console.log(
                    "\nHouve um erro ao receber os dados dos servidores! Erro ",
                    error.sqlMessage
                );
                res.status(500).json(error.sqlMessage);
            })

        }).catch(function(error) {
            console.log(error);
            console.log(
                "\nHouve um erro ao receber os dados dos servidores! Erro ",
                error.sqlMessage
            );
            res.status(500).json(error.sqlMessage);
        })
    }
}

module.exports = {
    getServers,
    getCurrentServer,
    updateServer,
    deleteServer,
}