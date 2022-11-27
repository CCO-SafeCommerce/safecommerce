function validarCNPJ(cnpj) {
    var resultado = 'OK';
  
    if (cnpj == undefined) {
        resultado = 'CNPJ está indefinido';
    } else if (cnpj == '') {
        resultado = 'CNPJ é obrigatório';
    } else if (cnpj.length != 18) {
        //CNPJ da erro ao colocar apenas o valor sem pontos e barras
        resultado = 'CNPJ deve ter 14 caracteres';
    } else if ((cnpj[2] != '.') || (cnpj[6] != '.') || (cnpj[10] != '/') || (cnpj[15] != '-')) { 
        // 87.608.614/0001-39 
        resultado = 'CNPJ inválido';
    }
  
    return resultado;
}

function validarCPF(cpf) {
    var resultado = 'OK';
  
    if (cpf == undefined) {
        resultado = 'CPF está indefinido';
    } else if (cpf == '') {
        resultado = 'CPF é obrigatório';
    } else if (cpf.length != 14) {
        //CPF da erro ao colocar apenas o valor sem pontos e barras
        resultado = 'CPF deve ter 11 caracteres';
    } else if ((cpf[3] != '.') || (cpf[7] != '.') || (cpf[11] != '-')) {
        // 456.783.912-00
        resultado = 'CPF inválido';
    }
  
    return resultado;
}

function validarSenha(senha) {
    var resultado = 'OK';
  
    if (senha == undefined) {
        resultado = 'Senha está indefinido';
    } else if (senha == '') {
        resultado = 'Senha é obrigatório';
    } else if (senha.length < 8) {
       resultado = 'Senha deve ter no minímo 8 caracteres';
    }
  
    return resultado;
}

function validarEmail(email) {
    var resultado = 'OK';
  
    if (email == undefined) {
        resultado = 'Email está indefinido';
      
    } else if (email == '') {
        resultado = 'Email é obrigatório';
  
    } else {
        var posicaoAt = email.indexOf('@');
  
        if (posicaoAt <= 0) {
            resultado = 'Email em formato inválido';
  
        } else {
            var posicaoDot = email.indexOf('.', posicaoAt)
   
            if (posicaoDot <= 2) {
                resultado = 'Email em formato inválido';
  
            } else {
                var resto = email.slice(posicaoDot, -1);
  
                if (resto.length < 1) {
                    resultado = 'Email em formato inválido'
                }
            }
        }
    }

    return resultado
}

