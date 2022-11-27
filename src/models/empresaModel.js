var database = require("../database/config")

function cadastrar(nome, cnpj) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar(): ", nome, cnpj)
    var instrucao = `
        INSERT INTO Empresa (nome, cnpj) VALUES ('${nome}', '${cnpj}');
    `;
    return database.execute(instrucao);
}

function procurarPorCNPJ(cnpj) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function procurarPorCNPJ(): ", cnpj)
    var instrucao = `
        SELECT * FROM Empresa WHERE cnpj = '${cnpj}';
    `;
    return database.execute(instrucao);
}

module.exports = {
    cadastrar,
    procurarPorCNPJ
}