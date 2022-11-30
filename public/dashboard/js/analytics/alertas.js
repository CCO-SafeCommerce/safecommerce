//const { obterDadosAlerta } = require("../../../../src/models/leituraModel")

// variaveis de alerta
var idServidor = 0

// const { obterDadosAlerta } = require("../../../../src/models/leituraModel")

var alertaCPU = {}
var alertaRAM = {}
var alertaDISCO = {}

// variaveis de Emergencia

var emergenciaCPU = {}
var emergenciaRAM = {}
var emergenciaDISCO = {}


function definirChartAlertas(){
    console.log("teste")
    // setup 
    const data = {
        labels: ['CPU', 'RAM', 'DISCO'],
        datasets: [{
          label: 'Emergencias',
          data: [1, 2, 0.3],
          backgroundColor: 'rgba(255, 26, 104, 0.2)',
          borderColor:'rgba(255, 26, 104, 1)',
          borderWidth: 1
        }, 
        {
            label: 'Alertas',
            data: [0.5],
            backgroundColor: 'rgba(250, 201, 65, 0.2)',
            borderColor:'rgba(250, 186, 10)',
            borderWidth: 1
          }]
      };

      // config 
      const config = {
        type: 'bar',
        data,
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      };

      // render init block
      window.chartAlerta = new Chart(
        document.getElementById('chartAlerta'),
        config
      );
}


function obterInformacaoAlerta(idServidor, componente){
    fetch(`/leituras/obterDadosAlerta?idServidor=${idServidor}&componente=${componente}`,{
      method: "GET",
      headers: {
        "contest-type": "application/json"
      }
    }).then(function (response){
      if(response.ok){
        response.json().then(function (resposta){
          console.log(resposta)
         // plotarGraficoAlertas(resposta, alertaCPU, alertaRAM, alertaDISCO);
         console.log("funfou")
        });
      } else{
        console.error('Nenhum dado Encontrado ou erro na API');
      }
    })
    .catch(function (error){
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

function obterInformacaoEmergencia(idServidor, componente){
  fetch(`/leituras/obterDadosEmergencia?idServidor=${idServidor}&componente=${componente}`, {
    method: "GET",
    headers: {
      "contest-type": "application/json"
    }
  }).then(function (response){
    if(response.ok){
      response.json().then(function (resposta){
        console.log(resposta)
        plotarGraficoEmergencia(resposta, emergenciaCPU, emergenciaRAM, emergenciaDISCO);
      });
    } else{
      console.error('Nenhum dado Encontrado ou erro na API')
    }
  })
  .catch(function (error){
    console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
  });
}

function obterAlertasRAM(idServidor){
    console.log("id do servidor: " + idServidor)
    var componente = "RAM"
    alertaRAM =  obterInformacaoAlerta(idServidor, componente )

    return alertaRAM
}

function obterEmergenciaRAM(idServidor){
  console.log("id do servidor: " + idServidor)
  var componente = "RAM"
  emergenciaRAM = obterInformacaoEmergencia(idServidor, componente)

  return emergenciaRAM
}

function obterAlertasCPU(idServidor){
  console.log("id do servidor: " + idServidor)
  var componente = "CPU"
  alertaCPU =  obterInformacaoAlerta(idServidor, componente )

  return alertaCPU
}

function obterEmergenciaCPU(idServidor){
  console.log("id do servidor: " + idServidor)
  var componente = "CPU"
  emergenciaCPU = obterInformacaoEmergencia(idServidor, componente)

  return emergenciaCPU
}

function obterAlertaDISCO(idServidor){
  console.log("id servidor: " + idServidor)
  var componente = "DISCO"
  alertaDisco = obterInformacaoAlerta(idServidor, componente)

  return alertaDISCO
}

function obterEmergenciaDISCO(idServidor){
  console.log("id do servidor: " + idServidor)
  var componente = "DISCO"
  emergenciaDISCO = obterInformacaoEmergencia(idServidor, componente)

  return emergenciaDISCO
}

function pegarComponenteMaiorEmergencia(idServidor){
  fetch(`/leituras/obterMaiorAlertas?idServidor=${idServidor}`,{
    method: "GET",
    headers:{
     "contest-type": "application/json"
    }
  }).then(function (response){
    if(response.ok){
      response.json().then(function (resposta){
        console.log(resposta)
      });
    } else{
      console.error('Nenhum dado Encontrado ou erro na API');
    }
  })
  .catch(function (error){
    console.error(`Erro na obtenção dos dados`)
  });
}

function plotarGraficoAlerta(idServidor){

//   data.datasets[0].data = [obterAlertaCPU(idServidor), obterAlertasRAM(idServidor), obterEmergenciaDISCO(idServidor)]
//   window.chartAlerta.update()

  
}