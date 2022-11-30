const database = require('../database/config')

function obterProcessos(fkServidor) {
    console.log("ACESSEI O Processo MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function obterProcessos(): ")
    var instrucao = `
        select TOP(10) pid, dataLeitura, nome, usoCpu, usoRam from Processo where fkServidor = '${fkServidor}' order by dataLeitura desc, usoCpu desc;
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
    encerrarProcessos
}