const database = require('../database/config')

function obterProcessos(fkServidor) {
    console.log("ACESSEI O Processo MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function obterProcessos(): ")
    var instrucao = `
        select pid, nome, usoCpu, usoRam from Processo where fkServidor = '${fkServidor}' order by dataLeitura desc, usoCpu desc limit 10;
    `
    var instructionAzure = `
        select TOP(10) pid, nome, usoCpu, usoRam from Processo where fkServidor = '${fkServidor}' order by dataLeitura desc, usoCpu desc;
    `

    return database.execute(instrucao, instructionAzure)
}

function obterProcessosNotDesejavel(fkServidor) {
    console.log("ACESSEI O Processo MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function obterProcessos(): ")
    var instrucao = `
    SELECT count(nome) as QtdNotDesejaveis FROM Processo WHERE nome NOT IN (select nome FROM Permissao_Processo WHERE Permissao_Processo.fkServidor = ${fkServidor}) AND Processo.fkServidor = ${fkServidor};
    `
    var instructionAzure = `
    SELECT count(nome) as QtdNotDesejaveis FROM Processo WHERE nome NOT IN (select nome FROM Permissao_Processo WHERE Permissao_Processo.fkServidor = ${fkServidor}) AND Processo.fkServidor = ${fkServidor};
    `

    return database.execute(instrucao, instructionAzure)
}


function obterProcessosDesejavel(fkServidor) {
    console.log("ACESSEI O Processo MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function obterProcessos(): ")
    var instrucao = `
    SELECT count(nome) as NomesDesejaveis FROM Permissao_Processo WHERE fkServidor = ${fkServidor} AND permissao = 1
    `
    var instructionAzure = `
    SELECT count(nome) as NomesDesejaveis FROM Permissao_Processo WHERE fkServidor = ${fkServidor} AND permissao = 1
    `

    return database.execute(instrucao, instructionAzure)
}

function modificarPermissao(fkServidor, nome) {
    console.log("ACESSEI O Processo MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function obterProcessos(): ")
    var instrucao = `
    INSERT INTO Permissao_Processo (nome, permissao, fkServidor) VALUES('${nome}', 1, ${fkServidor})
    `

    return database.execute(instrucao)
}

function encerrarProcessos(fkServidor, pid) {
    console.log("ACESSEI O Processo MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function obterProcessos(): ")
    var instrucao = `
        INSERT INTO KillPids VALUES (${fkServidor}, ${pid});    
    `

    return database.execute(instrucao)
}

module.exports = {
    obterProcessos,
    encerrarProcessos,
    obterProcessosNotDesejavel,
    obterProcessosDesejavel,
    modificarPermissao
}