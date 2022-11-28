const leituraModel = require("../models/leituraModel");

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

module.exports = {
    obterDadosCPU,
    obterDadosCPUCore,
    obterDadosFreq,
    obterDadosRam,
    obterDadosDisk,
    obterDadosRDisk,
    obterDadosWDisk,
    obterDadosTemperatura,
    obterDadosTemperaturaDia,
    obterDadosFreqDia,
    obterDadosUsoCpuDia
}