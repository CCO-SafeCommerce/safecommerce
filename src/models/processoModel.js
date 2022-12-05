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
    SELECT nome, qtdMatado FROM Frequencia_Processo WHERE fkServidor = ${fkServidor};
    `
    var instructionAzure = `
    SELECT nome, qtdMatado FROM Frequencia_Processo WHERE fkServidor = ${fkServidor};
    `

    return database.execute(instrucao, instructionAzure)
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
    obterProcessosNotDesejavel
}