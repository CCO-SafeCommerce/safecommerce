const database = require('../database/config')

function cadastrar(fkServidor, nome, porta) {
    console.log("ACESSEI O Aplicacao MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar(): ", fkServidor, nome, porta)
    var instrucao = `
        INSERT INTO Aplicacao (nome, porta, fkServidor) VALUES ('${nome}', ${porta}, ${fkServidor})
    `

    return database.execute(instrucao)
}

function getAplicacoesByFkServidor(fkServidor) {
    console.log("ACESSEI O Aplicacao MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function getAplicacoesByFkServidor(): ", fkServidor)
    var subselectMySQL = `
        SELECT 
            valor_leitura 
        FROM Leitura 
        WHERE Leitura.fkMetrica = 13 
        AND Leitura.fkServidor = a.fkServidor
        AND Leitura.componente = CONCAT(a.nome,":",a.porta)
        ORDER BY Leitura.dataLeitura DESC
        LIMIT 1
    `;
    
    var instrucao = `
        SELECT
            a.idAplicacao,
            a.nome,
            a.porta,
            (${subselectMySQL}) as 'demanda',
            a.fkServidor
        FROM Aplicacao as a
        WHERE a.fkServidor = ${fkServidor}
    `

    return database.execute(instrucao)
}

function atualizar(idAplicacao, nome, porta) {
    console.log("ACESSEI O Aplicacao MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar(): ", idAplicacao, nome, porta)
    var instrucao = `
        UPDATE Aplicacao SET nome = '${nome}', porta = ${porta} WHERE idAplicacao = ${idAplicacao};
    `

    return database.execute(instrucao)
}

function deletar(idAplicacao) {
    console.log("ACESSEI O Aplicacao MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar(): ", idAplicacao)
    var instrucao = `
        DELETE FROM Aplicacao WHERE idAplicacao = ${idAplicacao};
    `

    return database.execute(instrucao)
}

module.exports = {
    cadastrar,
    getAplicacoesByFkServidor,
    atualizar,
    deletar
}