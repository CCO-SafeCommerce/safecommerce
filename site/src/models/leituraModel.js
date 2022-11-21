const database = require('../database/config');

function limparHistoricoServidor(idServidor) {
    console.log("ACESSEI O LEITURA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function limparHistoricoServidor(): ", idServidor);
    var instruction =
    `
        DELETE FROM Leitura WHERE fkServidor = ${idServidor};
    `;
    return database.execute(instruction);
}
function obterDadosTemperatura(idServidor){
    console.log("ACESSEI O LEITURA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function obterDadosCPU(): ", idServidor);

    var instruction = `SELECT valor, horario, situacao FROM leituraTemp where fkServidor = ${idServidor} order by horario desc limit 20;`
    var instructionAzure = `SELECT TOP 20 valor, horario, situacao FROM leituraTemperatura where fkServidor = ${idServidor} order by horario desc;`
    return database.execute(instruction, instructionAzure);

}
function obterDadosCPU(idServidor) {
    console.log("ACESSEI O LEITURA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function obterDadosCPU(): ", idServidor);

    var instruction = `SELECT valor, horario FROM leituraCPU where fkServidor = ${idServidor} order by horario desc limit 20;`
    var instructionAzure = `SELECT TOP 20 valor, horario FROM leituraCPU where fkServidor = ${idServidor} order by horario desc;`
    return database.execute(instruction, instructionAzure);
}

function obterDadosCPUCore(idServidor) {
    console.log("ACESSEI O LEITURA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function obterDadosCPUCore(): ", idServidor);
    
    var instruction = `SELECT valor, horario, core FROM leituraCoreCPU where fkServidor = ${idServidor} order by horario desc limit 20;`
    var instructionAzure = `SELECT TOP 20 valor, horario, core FROM leituraCoreCPU where fkServidor = ${idServidor} order by horario desc;`
   
    return database.execute(instruction, instructionAzure);
}

function obterDadosFreq(idServidor) {
    console.log("ACESSEI O LEITURA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function obterDadosFreq(): ", idServidor);
    
    var instruction = `SELECT valor, horario FROM leituraFreq where fkServidor = ${idServidor} order by horario desc limit 20;`
    var instructionAzure = `SELECT TOP 20 valor, horario FROM leituraFreq where fkServidor = ${idServidor} order by horario desc;`
   
    return database.execute(instruction, instructionAzure);
}

function obterDadosRam(idServidor) {
    console.log("ACESSEI O LEITURA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function obterDadosRam(): ", idServidor);

    var instruction = `SELECT valor, horario FROM leituraRAM where fkServidor = ${idServidor} order by horario desc limit 20;`
    var instructionAzure = `SELECT TOP 20 valor, horario FROM leituraRAM where fkServidor = ${idServidor} order by horario desc;`

    return database.execute(instruction, instructionAzure);
}

function obterDadosDisk(idServidor) {
    console.log("ACESSEI O LEITURA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function obterDadosDisk(): ", idServidor);

    var instruction = `SELECT valor, horario FROM leituraDisco where fkServidor = ${idServidor} order by horario desc limit 20;`
    var instructionAzure = `SELECT TOP 20 valor, horario FROM leituraDisco where fkServidor = ${idServidor} order by horario desc;`
   
    return database.execute(instruction, instructionAzure);
}

function obterDadosRDisk(idServidor) {
    console.log("ACESSEI O LEITURA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function obterDadosRDisk(): ", idServidor);

    var instruction = `SELECT valor, horario FROM leituraLDisco where fkServidor = ${idServidor} order by horario desc limit 20;`
    var instruction = `SELECT TOP 20 valor, horario FROM leituraLDisco where fkServidor = ${idServidor} order by horario desc;`
   
    return database.execute(instruction);
}

function obterDadosWDisk(idServidor) {
    console.log("ACESSEI O LEITURA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function obterDadosWDisk(): ", idServidor);

    var instruction = `SELECT valor, horario FROM leituraEDisco where fkServidor = ${idServidor} order by horario desc limit 20;`
    var instruction = `SELECT TOP 20 valor, horario FROM leituraEDisco where fkServidor = ${idServidor} order by horario desc;`
   
    return database.execute(instruction);
}

module.exports = {
    limparHistoricoServidor,
    obterDadosCPU,
    obterDadosCPUCore,
    obterDadosFreq,
    obterDadosRam,
    obterDadosDisk,
    obterDadosRDisk,
    obterDadosWDisk,
    obterDadosTemperatura
}