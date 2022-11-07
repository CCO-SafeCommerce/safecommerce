const database = require('../database/config');

function limparHistoricoServidor(idServidor) {
    console.log("ACESSEI O LEITURA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function limparHistoricoServidor(): ", idServidor);
    var instruction =
    `
        DELETE FROM Leitura WHERE fkServidor = ${idServidor};
    `
    return database.execute(instruction);
}

module.exports = {
    limparHistoricoServidor
}