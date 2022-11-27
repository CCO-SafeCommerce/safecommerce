const database = require('../database/config');

function getServers(idCompany) {
    console.log("ACESSEI O SERVER MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function getServer(): ", idCompany);
    var instruction = 
    `
    SELECT * FROM visaoGeralServidores WHERE fkEmpresa = ${idCompany}
    `
    return database.execute(instruction);
}

function getCurrentServer(id) {
    console.log("ACESSEI O SERVER MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function getServer(): ", id);
    var instruction =
    `
    SELECT * FROM Servidor WHERE idServidor = ${id};
    `
    return database.execute(instruction);
}

function updateServer(id, modelo, so) {
    console.log("ACESSEI O SERVER MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function updateServer(): ", id, modelo, so)

    var instruction = `
        UPDATE Servidor SET modelo = '${modelo}', so = '${so}' WHERE idServidor = ${id}
    `;

    return database.execute(instruction);
}

function deleteServer(id) {
    console.log("ACESSEI O SERVER MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function delete(): ", id)

    var instruction = `
        DELETE FROM Servidor WHERE idServidor = ${id}
    `

    return database.execute(instruction)
}

module.exports = {
    getServers,
    getCurrentServer,
    updateServer,
    deleteServer
}