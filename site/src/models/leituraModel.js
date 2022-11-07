const database = require('../database/config');

function limparHistoricoServidor(idServidor) {
    console.log("ACESSEI O LEITURA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function limparHistoricoServidor(): ", idServidor);
    var instruction =
    `
        DELETE FROM Leitura WHERE fkServidor = ${idServidor};
    `;
    return database.execute(instruction);
}

function obterDadosCPU(idServidor) {
    console.log("ACESSEI O LEITURA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function obterDadosCPU(): ", idServidor);

    var instruction = `SELECT valor, horario FROM leituraCPU where idServidor = ${idServidor} order by horario desc limit 20;`
   
    return database.execute(instruction);
}

function obterDadosCPUCore(idServidor) {
    console.log("ACESSEI O LEITURA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function obterDadosCPUCore(): ", idServidor);
    
    var instruction = `SELECT valor, horario FROM leituraCoreCPU where idServidor = ${idServidor} order by horario desc limit 20;`
   
    return database.execute(instruction);
}

function obterDadosFreq(idServidor) {
    console.log("ACESSEI O LEITURA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function obterDadosFreq(): ", idServidor);
    
    var instruction = `SELECT valor, horario FROM leituraFreq where idServidor = ${idServidor} order by horario desc limit 20;`
   
    return database.execute(instruction);
}

function obterDadosRam(idServidor) {
    console.log("ACESSEI O LEITURA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function obterDadosRam(): ", idServidor);

    var instruction = `SELECT valor, horario FROM leituraRAM where idServidor = ${idServidor} order by horario desc limit 20;`
   
    return database.execute(instruction);
}

function obterDadosDisk(idServidor) {
    console.log("ACESSEI O LEITURA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function obterDadosDisk(): ", idServidor);

    var instruction = `SELECT valor, horario FROM leituraDisco where idServidor = ${idServidor} order by horario desc limit 20;`
   
    return database.execute(instruction);
}

function obterDadosRDisk(idServidor) {
    console.log("ACESSEI O LEITURA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function obterDadosRDisk(): ", idServidor);

    var instruction = `SELECT valor, horario FROM leituraLDisco where idServidor = ${idServidor} order by horario desc limit 20;`
   
    return database.execute(instruction);
}

function obterDadosWDisk(idServidor) {
    console.log("ACESSEI O LEITURA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function obterDadosWDisk(): ", idServidor);

    var instruction = `SELECT valor, horario FROM leituraEDisco where idServidor = ${idServidor} order by horario desc limit 20;`
   
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
    obterDadosWDisk
}