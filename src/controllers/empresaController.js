var nodemailer = require('nodemailer');
var generator = require('generate-password');
var bcrypt = require('bcrypt');

var empresaModel = require('../models/empresaModel');
var usuarioModel = require('../models/usuarioModel');

function cadastrar(req, res) {
    var nome = req.body.nomeServer;
    var cnpj = req.body.cnpjServer;
    var email = req.body.emailServer;

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (cnpj == undefined) {
        res.status(400).send("Seu cnpj está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else {
        empresaModel.cadastrar(nome, cnpj)
            .then(function (_) {
                empresaModel.procurarPorCNPJ(cnpj)
                .then(function (resultado) {
                    var nomeAdmin = `Admin ${nome}`;
                    var emailAdmin = `admin-${nome.toLowerCase().replaceAll(' ', '.').normalize('NFD').replace(/[\u0300-\u036f]/g, "")}@safecommerce.com`
                    var senhaAdmin = generator.generate({
                        length: 10,
                        numbers: true,
                        symbols: false,
                        lowercase: true,
                        uppercase: true,
                        excludeSimilarCharacters: false,
                        strict: false
                    });

                    bcrypt.hash(senhaAdmin, 8).then(function (hash) {
                        usuarioModel.cadastrar(nomeAdmin, emailAdmin, null, hash, resultado[0].idEmpresa, null)
                        .then( function (_) {
                            enviarEmail(emailAdmin, senhaAdmin, email)
                            console.log("Usuário cadastrado com sucesso!")
                            res.json(resultado)
                            console.log(senhaAdmin);
                        }).catch(function (erro) {
                            console.log(erro);
                            console.log(
                                "\nHouve um erro ao realizar o cadastro do usuário! Erro: ",
                                erro.sqlMessage
                            );
                            res.status(500).json(erro.sqlMessage);
                        });

                    }).catch(function (erro) {
                        console.log(erro);
                        console.log(
                            "\nHouve um erro ao realizar o cadastro da empresa! Erro: ",
                            erro.sqlMessage
                        );
                        res.status(500).json(erro.sqlMessage);
                    });                    

                }).catch(function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro da empresa! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                });

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

function enviarEmail(email, senha, destino) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'safecommerce.sptech@gmail.com',
            pass: 'tzgy xrth btar uvyx',
        }
    });

    var mailOptions = {
        from: 'Safecommerce',
        to: destino,
        subject: 'Acesso a plataforma SafeCommerce!',
        html: '<h1>Bem vindo a SafeCommerce!!!</h1><br>' +
        "<p>Aqui está seu login para acessar a plataforma: </p><br>" +
        `Email: ${email} <br>` +
        `Senha: ${senha}`,
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if(error) {
            console.log(error);
        } else {
            console.log('Email enviado: ' + info.response);
        }
    })
}

module.exports = {
    cadastrar,
}