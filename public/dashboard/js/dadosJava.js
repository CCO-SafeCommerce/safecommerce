

function getDadosUsuarios(idUsuario){
   console.log("aaaaaaaaaaaaaaaaaaaa "+ idUsuario)
    fetch("/usuarios/dadosUsuarioJava", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idUsuarioServer: idUsuario
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")

        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));

                sessionStorage.EMAIL_USUARIO = json.email;
                sessionStorage.NOME_USUARIO = json.nome;
                sessionStorage.ID_EMPRESA = json.idEmpresa;
                sessionStorage.FK_ADMIN = json.fkUsuario;
                sessionStorage.ID_USUARIO = json.idUsuario;
                sessionStorage.NOME_EMPRESA = json.empresa;
                


            });

        } else {
            console.log("Houve um erro ao tentar realizar o login!");

            resposta.text().then(texto => {
                console.error(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })
}

function setCurrentServerPage(id) {
    fetch("/servers/getCurrentServer", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idServer: id
        })
    }).then((answer) => {
        console.log(answer);
        
        if(answer.ok) {
            console.log("A requisição foi um sucesso!");
            answer.json().then(json => {   
                sessionStorage.CURRENT_SERVER = JSON.stringify(json);
                sessionStorage.ID_SERVER = json[0].idServidor;
                sessionStorage.MODEL_SERVER = json[0].modelo;
                console.log(json);  
    
          
            });
        } else {
            console.log("ERROR: answer is not ok");
        }
    }).catch((answer) => {
        console.log(`Erro: ${answer}`);
    });
}