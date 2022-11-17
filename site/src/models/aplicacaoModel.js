const database = require('../database/config')

function cadastrar(fkServidor, nome, porta) {
    console.log("ACESSEI O Aplicacao MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar(): ", fkServidor, nome, porta)
    var instrucao = `
        INSERT INTO Aplicacao (nome, porta, fkServidor) VALUES ('${nome}', ${porta}, ${fkServidor})
    `

    return database.execute(instrucao)
}

module.exports = {
    cadastrar
}