const serverModel = require("../models/serverModel");
const parametroModel = require("../models/parametroModel");
const leituraModel = require("../models/leituraModel");

function obterUltimaMedidaDisco(req,res) {
    var id = req.body.idServidor;
   
    serverModel.obterUltimaMedidaDisco(id)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
}
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

function obterDadosCPU(req,res) {
    var id = req.body.idServidor;
    
    serverModel.obterDadosCPU(id)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
}
function obterDadosCPUCore(req,res) {
    var id = req.body.idServidor;
    
    serverModel.obterDadosCPUCore(id)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
}
function obterDadosFreq(req,res) {
    var id = req.body.idServidor;
    
    serverModel.obterDadosFreq(id)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
}
function obterDadosRam(req,res) {
    var id = req.body.idServidor;
    
    serverModel.obterDadosRam(id)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
}
function obterDadosDisk(req,res) {
    var id = req.body.idServidor;
    
    serverModel.obterDadosDisk(id)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
}
function obterDadosRDisk(req,res) {
    var id = req.body.idServidor;
    
    serverModel.obterDadosRDisk(id)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
}
function obterDadosWDisk(req,res) {
    var id = req.body.idServidor;
    
    serverModel.obterDadosWDisk(id)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
}
function obterDadosTotalDisk(req,res) {
    var id = req.body.idServidor;
    
    serverModel.obterDadosTotalDisk(id)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
}
function obterDadosTotalRam(req,res) {
    var id = req.body.idServidor;
    
    serverModel.obterDadosTotalRam(id)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
}
function obterDadosTotalCpus(req,res) {
    var id = req.body.idServidor;
    
    serverModel.obterDadosTotalCpus(id)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
}
function obterUltimaMedidaRam(req,res) {
    var id = req.body.idServidor;
    serverModel.obterUltimaMedidaRam(id)
    .then(
        function (resultado) {
            res.json(resultado);
        }
    ).catch(
        function (erro) {
            console.log(erro);
            console.log(
                "\nHouve um erro ao realizar o cadastro! Erro: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        }
    );
}
function obterSO(req,res) {
    var id = req.body.idServidor;
    serverModel.obterSO(id)
    .then(
        function (resultado) {
            res.json(resultado);
        }
    ).catch(
        function (erro) {
            console.log(erro);
            console.log(
                "\nHouve um erro ao realizar o cadastro! Erro: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        }
    );
}
module.exports = {
    getServers,
    getCurrentServer,
    updateServer,
    deleteServer,
    obterDadosCPU,
    obterDadosCPUCore,
    obterDadosFreq,
    obterDadosRam,
    obterDadosDisk,
    obterDadosRDisk,
    obterDadosWDisk,
    obterDadosTotalDisk,
    obterDadosTotalRam,
    obterDadosTotalCpus,
    obterUltimaMedidaDisco,
    obterUltimaMedidaRam,
    obterSO
}