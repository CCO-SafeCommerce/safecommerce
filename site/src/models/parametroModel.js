const database = require('../database/config');

function obterParametros(idServidor) {
    console.log("ACESSEI O PARAMETRO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function obterParametros(): ", idServidor);
    var instruction =
    `
        SELECT fk_Metrica FROM Parametro WHERE fk_Servidor = ${idServidor};
    `
    return database.execute(instruction);
}

function adicionar(idServidor, metricas) {
    console.log("ACESSEI O PARAMETRO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function adicionar(): ", idServidor, metricas);

    var instruction = `
        INSERT INTO Parametro VALUES
    `;

    for (let index = 0; index < metricas.length; index++) {
        instruction += ` (${idServidor}, ${metricas[index]})`

        if (index != metricas.length - 1) {
            instruction += ','
        }
    }

    return database.execute(instruction)
}

function remover(idServidor, metricas) {
    console.log("ACESSEI O PARAMETRO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function remover(): ", idServidor, metricas);

    var instruction = `
        DELETE FROM Parametro WHERE fk_Servidor = ${idServidor} and fk_Metrica IN (${metricas})
    `;

    return database.execute(instruction)
}

function limparParametros(idServidor) {
    console.log("ACESSEI O PARAMETRO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function limparParametros(): ", idServidor);

    var instruction = `
        DELETE FROM Parametro WHERE fk_Servidor = ${idServidor} and fk_Metrica IN (${metricas})
    `;

    return database.execute(instruction)
}

module.exports = {
    obterParametros,
    adicionar,
    remover, 
    limparParametros
}