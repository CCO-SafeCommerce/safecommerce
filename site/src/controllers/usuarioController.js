var usuarioModel = require("../models/usuarioModel");
var bcrypt = require('bcrypt');

function entrar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {        
        usuarioModel.procurarPorEmail(email)
        .then(function (resultado) {
            console.log(`\nResultados encontrados: ${resultado.length}`);
            console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

            if (resultado.length == 1) {
                bcrypt.compare(senha, resultado[0].senha).then(function (isIgual) {
                    if (isIgual) {
                        delete resultado[0].senha
                        console.log(resultado[0])
                        res.json(resultado[0])

                    } else {
                        res.status(403).send("Email e/ou senha inválido(s)");

                    }                    

                }).catch(function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                });

            } else {
                res.status(403).send("Email e/ou senha inválido(s)");
            }

        }).catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
    }

}

function cadastrar(req, res) {
    var nome = req.body.nameServer;
    var email = req.body.emailServer;
    var senha = req.body.passwdServer;
    var idAdmin = req.body.idAdminServer;
    var idEmpresa = req.body.idCompanyServer;
    
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (idAdmin == undefined) {
        res.status(400).send("O id do admin está undefined!");
    } else if (idEmpresa == undefined) {
        res.status(400).send("O id da empresa está undefined!");
    } else {
        usuarioModel.procurarPorEmail(email)
        .then(function (isEmailEmUso) {
            if (isEmailEmUso.length == 0) {
                bcrypt.hash(senha, 8)
                .then(function (hash) {
                    usuarioModel.cadastrar(nome, email, hash, idEmpresa, idAdmin)
                    .then(function (resultado) {
                        console.log(resultado)
                        res.json(resultado);    
                    }).catch(function (erro) {
                        console.log(erro);
                        console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                        res.status(500).json(erro.sqlMessage);
                    });
                    
                }).catch(function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                });

            } else {
                res.status(403).send("Email já está em uso");
            }
        })
    }
}

module.exports = {
    entrar,
    cadastrar,
}