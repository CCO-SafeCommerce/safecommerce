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
    var instructionAzure = `SELECT TOP 5 AVG(valor) as 'valor', CONVERT(DATE, horario) as horario from leituraCpu
    where fkServidor = ${idServidor}
        group by CONVERT(DATE, horario)
		order by horario desc

`

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
    var instructionAzure = `SELECT TOP 5 AVG(valor) as 'valor', CONVERT(DATE, horario) as horario from leituraTemperatura
    where fkServidor = ${idServidor}
        group by CONVERT(DATE, horario)
		order by horario desc
`

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

function dadosTempCpu(idServidor){
    var instruction = `SELECT valor, horario FROM leituraTemp where fkServidor = ${idServidor} order by horario desc limit 20;`
    var instructionAzure = `SELECT fkServidor, horario, [11] as 'temp', [1] as 'cpu'  FROM (
        SELECT fkServidor, fkMetrica, DATEPART(MINUTE, dataLeitura) as 'horario', valor_leitura FROM [dbo].[Leitura]
            WHERE fkMetrica = 11 or fkMetrica = 1
    
    ) p PIVOT (
        AVG(valor_leitura) FOR fkMetrica IN ([11],[1])
    ) pvt 
    WHERE fkServidor = ${idServidor}`

    return database.execute(instruction, instructionAzure);
}

function obterUltimaTemp(){
    var instruction = `SELECT valor, horario FROM leituraFreq where fkServidor = 2 order by horario desc limit 20;`
   
    var instructionAzure = `
        SELECT
        s.modelo,
        s.ipServidor,
        (select top 1 valor_leitura from Leitura where fkServidor = s.idServidor and fkMetrica = 11 order by dataLeitura desc) as 'temperatura',
        (select top 1 dataLeitura from Leitura where fkServidor = s.idServidor and fkMetrica = 11 order by dataLeitura desc) as 'ultimoRegistro',
        (select top 1 situacao from Leitura where fkServidor = s.idServidor and fkMetrica = 11 order by dataLeitura desc) as 'situacao'
    FROM Servidor s;
    `
    return database.execute(instruction, instructionAzure);
}

function obterDadosFreqDia(idServidor) {
    console.log("ACESSEI O LEITURA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function obterDadosFreq(): ", idServidor);
    
    var instruction = `SELECT valor, horario FROM leituraFreq where fkServidor = ${idServidor} order by horario desc limit 20;`
    var instructionAzure = `SELECT TOP 5 AVG(valor) as 'valor', CONVERT(DATE, horario) as horario from leituraFreq
    where fkServidor = ${idServidor}
        group by CONVERT(DATE, horario)
		order by horario desc`
   
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

function obterAppsCorHw(idServidor) {
    console.log("ACESSEI O LEITURA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function obterAppsCorHw(): ", idServidor);

    var instruction = `SELECT ano, mes, dia, demanda, usoCPU, usoRAM FROM vwAppsCorHW WHERE fkServidor = ${idServidor} ORDER BY ano DESC, mes DESC, dia DESC LIMIT 6`;
    var instructionAzure = `SELECT TOP 6 ano, mes, dia, demanda, usoCPU, usoRAM FROM vwAppsCorHW WHERE fkServidor = ${idServidor} ORDER BY ano DESC, mes DESC, dia DESC`;

    return database.execute(instruction, instructionAzure);
}

function alertas(idServidor){
    console.log("ACESSEI O LEITURA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function obterAppsCorHw(): ", idServidor);

    var instruction = `select DISTINCT Componente, qtdAvisos, qtdEmergencias from situacaoLeitura where fkServidor = ${idServidor} order by componente`;

    return database.execute(instruction)
}

function maiorEmergencia(idServidor){
    console.log("ACESSEI O LEITURA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function maiorEmergencia(): ", idServidor);

    var instruction = `select componente from situacaoleitura where qtdEmergencias = (select max(qtdEmergencias) from leitura where fkServidor = ${idServidor} limit 1) and fkServidor = ${idServidor} limit 1`;

    return database.execute(instruction)
}

function maiorAlerta(idServidor){
    console.log("ACESSEI O LEITURA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function maiorAlerta(): ", idServidor);

    var instruction = `select componente from situacaoleitura where qtdAvisos = (select max(qtdAvisos) from leitura where fkServidor = ${idServidor} limit 1) and fkServidor = ${idServidor} limit 1`;
    
    return database.execute(instruction)
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
    obterAppsCorHw,
    obterUltimaTemp,
    alertas,
    maiorEmergencia,
    maiorAlerta,
    dadosTempCpu
}