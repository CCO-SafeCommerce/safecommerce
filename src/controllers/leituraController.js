const leituraModel = require("../models/leituraModel");
const SLR = require('ml-regression').SLR;
const calculateCorrelation = require("calculate-correlation")

function obterDadosCPU(req,res) {
    var id = req.params.idServidor

    if (id == undefined) {
        res.status(400).send("Id do Servidor está undefined!");
    } else {
        leituraModel.obterDadosCPU(id).then(function (resultado) {
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
function obterCpuAtual(req,res) {
    var id = req.params.idServidor

    if (id == undefined) {
        res.status(400).send("Id do Servidor está undefined!");
    } else {
        leituraModel.obterCpuAtual(id).then(function (resultado) {
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

function obterUltimaTemp(req,res) {
    leituraModel.obterUltimaTemp().then(function (resultado) {
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

function obterDadosUsoCpuDia(req,res) {

    var id = req.params.idServidor

    if (id == undefined) {
        res.status(400).send("Id do Servidor está undefined!");
    } else {
        leituraModel.obterDadosUsoCpuDia(id).then(function (resultado) {
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

function obterDadosCPUCore(req,res) {
    var id = req.params.idServidor

    if (id == undefined) {
        res.status(400).send("Id do Servidor está undefined!");
    } else {
        leituraModel.obterDadosCPUCore(id).then(function (resultado) {
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

function obterDadosFreq(req,res) {
    var id = req.params.idServidor

    if (id == undefined) {
        res.status(400).send("Id do Servidor está undefined!");
    } else {
        leituraModel.obterDadosFreq(id).then(function (resultado) {
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

function obterDadosFreqDia(req,res) {
    var id = req.params.idServidor

    if (id == undefined) {
        res.status(400).send("Id do Servidor está undefined!");
    } else {
        leituraModel.obterDadosFreqDia(id).then(function (resultado) {
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


function obterDadosRam(req,res) {
    var id = req.params.idServidor

    if (id == undefined) {
        res.status(400).send("Id do Servidor está undefined!");
    } else {
        leituraModel.obterDadosRam(id).then(function (resultado) {
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

function obterDadosDisk(req,res) {
    var id = req.params.idServidor

    if (id == undefined) {
        res.status(400).send("Id do Servidor está undefined!");
    } else {
        leituraModel.obterDadosDisk(id).then(function (resultado) {
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

function obterDadosRDisk(req,res) {
    var id = req.params.idServidor

    if (id == undefined) {
        res.status(400).send("Id do Servidor está undefined!");
    } else {
        leituraModel.obterDadosRDisk(id).then(function (resultado) {
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


function obterDadosTemperatura(req,res) {
    var id = req.params.idServidor

    if (id == undefined) {
        res.status(400).send("Id do Servidor está undefined!");
    } else {
        leituraModel.obterDadosTemperatura(id).then(function (resultado) {
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
function obterDadosTemperaturaDia(req,res) {
    var id = req.params.idServidor

    if (id == undefined) {
        res.status(400).send("Id do Servidor está undefined!");
    } else {
        leituraModel.obterDadosTemperaturaDia(id).then(function (resultado) {
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

function obterDadosWDisk(req,res) {
    var id = req.params.idServidor

    if (id == undefined) {
        res.status(400).send("Id do Servidor está undefined!");
    } else {
        leituraModel.obterDadosWDisk(id).then(function (resultado) {
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


function alertas(req,res){
    var id = req.query.idServidor
    var componente = req.query.componente

    if(id == undefined){
        res.status(400).send("Id do servidor está undefined!");
    }
    else if(componente == undefined){
        res.status(400).send("O componente está undefined!");
    }else{
        leituraModel.alertas(id, componente).then(function (resultado){
            res.json(resultado);
        }).catch(function (erro){
            console.log(erro)
            console.log(
                "\nHouve um erro ao realizar a captura! Erro: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        });
    }
}

function maiorEmergencia(req,res){
    var id = req.query.idServidor

    if(id == undefined){
        res.status(400).send("Id do servidor está undefined!");
    }else{
        leituraModel.maiorEmergencia(id).then(function (resultado){
            res.json(resultado);
        }).catch(function (erro){
            console.log(erro)
            console.log(
                "\nHouve um erro ao realizar a captura! Erro: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        });
    }
}

function maiorAlerta(req,res){
    var id = req.query.idServidor

    if(id == undefined){
        res.status(400).send("Id do servidor está undefined!");
    }else{
        leituraModel.maiorAlerta(id).then(function (resultado){
            res.json(resultado);
        }).catch(function (erro){
            console.log(erro)
            console.log(
                "\nHouve um erro ao realizar a captura! Erro: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        });
    }

}
function regressaoTempUso(req, res){
    var idServidor = req.params.idServidor
    leituraModel.dadosTempCpu(idServidor).then(function (resultado){
        resultado.reverse()
        //criar regressao linear para os dados
        var x = resultado.map(r => r.temp)
        var y = resultado.map(r => r.cpu)
       
        var regLinear = new SLR(x, y)    
        var a = regLinear.coefficients
        console.log(regLinear + ' regressao')
        var correlacao = calculateCorrelation(x,y)
        res.json({
            data: resultado,
            regressao: regLinear.coefficients,
            correlacao: correlacao,
         
        })
    }).catch(function (erro){
        console.log(erro)
        console.log(
            "\nHouve um erro ao realizar a captura! Errodddd: ",
            erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
    });
}
function appsCorHw(req, res) {
    var idServidor = req.params.idServidor

    if (idServidor == undefined) {
        res.status(403).send('Id do Servidor está indefinido')
    } else {
        leituraModel.obterAppsCorHw(idServidor).then(resultado => {         
            resultado.reverse()
            
            var xD = resultado.map(r => r.demanda);
            var yCPU = resultado.map(r => r.usoCPU);
            var yRAM = resultado.map(r => r.usoRAM);

            var linearRegressionCPU = null;
            var linearRegressionRAM = null;
            var corCPU = null
            var corRAM = null

            if (yCPU.reduce((somatorio, atual) => somatorio + atual, 0) > 0) {
                linearRegressionCPU = new SLR(xD, yCPU);
                corCPU = calculateCorrelation(xD, yCPU);
            }

            if (yCPU.reduce((somatorio, atual) => somatorio + atual, 0) > 0) {
                linearRegressionRAM = new SLR(xD, yRAM);
                corRAM = calculateCorrelation(xD, yRAM);
            }

            res.json({
                data: resultado,
                lrCPU: linearRegressionCPU,
                lrRAM: linearRegressionRAM,
                corCPU: corCPU,
                corRAM: corRAM
            })
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
    obterDadosCPU,
    obterCpuAtual,
    obterDadosCPUCore,
    obterDadosFreq,
    obterDadosRam,
    obterDadosDisk,
    obterDadosRDisk,
    obterDadosWDisk,
    obterDadosTemperatura,
    obterDadosTemperaturaDia,
    obterDadosFreqDia,
    obterDadosUsoCpuDia,
    appsCorHw,
    obterUltimaTemp,
    alertas,
    maiorEmergencia,
    maiorAlerta,
   regressaoTempUso

}