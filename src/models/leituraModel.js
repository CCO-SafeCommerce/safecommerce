const database = require('../database/config');

function limparHistoricoServidor(idServidor) {
    console.log("ACESSEI O LEITURA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function limparHistoricoServidor(): ", idServidor);
    var instruction =
    `
        DELETE FROM Leitura WHERE fkServidor = ${idServidor};
    `;
    return database.execute(instruction);
}

function obterDadosUsoCpuDia(idServidor){
    var instruction = `SELECT valor, horario, situacao FROM leituraTemp where fkServidor = ${idServidor} order by horario desc limit 20;`
    var instructionAzure = `SELECT AVG(CAST(valor as FLOAT)) as 'valor', datepart(day, horario) as 'dia', datepart(month, horario) as 'mes', datepart(year, horario) as 'ano' FROM leituraCPU 
    where fkServidor = ${idServidor}
        group by datepart(day, horario),
		datepart(month, horario),
		datepart(year, horario)
        order by datepart(day, horario) asc`

    return database.execute(instruction, instructionAzure);
}

function obterDadosTemperatura(idServidor){
    console.log("ACESSEI O LEITURA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function obterDadosCPU(): ", idServidor);

    var instruction = `SELECT valor, horario, situacao FROM leituraTemp where fkServidor = ${idServidor} order by horario desc limit 20;`
    var instructionAzure = `SELECT TOP 20 valor, horario, situacao FROM leituraTemperatura where fkServidor = ${idServidor} order by horario desc;`

    return database.execute(instruction, instructionAzure);

}
function obterDadosTemperaturaDia(idServidor){
    console.log("ACESSEI O LEITURA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function obterDadosCPU(): ", idServidor);

    var instruction = `SELECT valor, horario, situacao FROM leituraTemp where fkServidor = ${idServidor} order by horario desc limit 20;`
    var instructionAzure = `SELECT TOP 5 AVG(CAST(valor as FLOAT)) as 'valor', datepart(day, horario) as 'dia', datepart(month, horario) as 'mes', datepart(year, horario) as 'ano' FROM leituraTemperatura 
    where fkServidor = ${idServidor} 
        group by datepart(day, horario),
		datepart(month, horario),
		datepart(year, horario)
        order by datepart(day, horario) asc`

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
function obterDadosFreqDia(idServidor) {
    console.log("ACESSEI O LEITURA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function obterDadosFreq(): ", idServidor);
    
    var instruction = `SELECT valor, horario FROM leituraFreq where fkServidor = ${idServidor} order by horario desc limit 20;`
    var instructionAzure = `SELECT TOP 5 AVG(CAST(valor as FLOAT)) as 'valor', datepart(day, horario) as 'dia', datepart(month, horario) as 'mes', datepart(year, horario) as 'ano' FROM leituraFreq 
    where fkServidor = ${idServidor}
        group by datepart(day, horario),
		datepart(month, horario),
		datepart(year, horario)
        order by datepart(day, horario) asc`
   
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
    var instructionAzure = `SELECT TOP 20 valor, horario FROM leituraLDisco where fkServidor = ${idServidor} order by horario desc;`
   
    return database.execute(instruction, instructionAzure);
}

function obterDadosWDisk(idServidor) {
    console.log("ACESSEI O LEITURA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function obterDadosWDisk(): ", idServidor);

    var instruction = `SELECT valor, horario FROM leituraEDisco where fkServidor = ${idServidor} order by horario desc limit 20;`
    var instructionAzure = `SELECT TOP 20 valor, horario FROM leituraEDisco where fkServidor = ${idServidor} order by horario desc;`
   
    return database.execute(instruction, instructionAzure);
}

function limparHistoricoAplicacao(componente) {
    console.log("ACESSEI O LEITURA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function limparHistoricoAplicacao(): ", componente);

    var instruction = `DELETE FROM Leitura WHERE componente = '${componente}' AND fkMetrica = 13;`    
   
    return database.execute(instruction);
}

function obterDadosAlerta(idServidor, componente){
    console.log("ACESSEI O LEITURA MODEL \n \n\t\t >> Se aqui der erro de  'Error: connect ECONNREFUSED', \n\t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function obterDadosAlerta(): ", idServidor, componente);

    var instruction = `SELECT count(*) FROM Leitura WHERE fkServidor = ${idServidor} and componente = ${componente} and situacao = "a"`;

    return database.execute(instruction);
}

function obterDadosEmergencia(idServidor, componente){
    console.log("ACESSEI O LEITURA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function limparHistoricoAplicacao(): ", componente)

    var instruction = `SELECT count(*) FROM Leitura WHERE fkServidor = ${idServidor} and componente = ${componente} and situacao = "e"`;

    return database.execute(instruction);
}

function obterAppsCorHw(idServidor) {
    console.log("ACESSEI O LEITURA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function obterAppsCorHw(): ", idServidor);

    var instruction = `SELECT ano, mes, demanda, usoCPU, usoRAM FROM vwAppsCorHW WHERE fkServidor = ${idServidor} ORDER BY ano DESC, mes DESC LIMIT 6`;
    var instructionAzure = `SELECT TOP 6 ano, mes, demanda, usoCPU, usoRAM FROM vwAppsCorHW WHERE fkServidor = ${idServidor} ORDER BY ano DESC, mes DESC`;

    return database.execute(instruction, instructionAzure);
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
    obterDadosTemperatura,
    limparHistoricoAplicacao,
    obterDadosTemperaturaDia,
    obterDadosFreqDia,
    obterDadosUsoCpuDia,
    obterDadosAlerta,
    obterDadosEmergencia,
    obterAppsCorHw
}