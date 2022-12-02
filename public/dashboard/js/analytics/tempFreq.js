var tempCPUFreq = {};
var tempUsoCpu = {};
var tempUsoCor = {};
var datasetTemperatura = {
  label: "Temperatura da CPU (ºC)",
  data: [],
  backgroundColor: "black",
  borderColor: "black",
};

var datasetFreq = {
  label: "Frequência da CPU (MHz)",
  data: [],
  backgroundColor: "#dc3e1d",
  borderColor: "#dc3e1d",
};

var datasetUso = {
  label: "Uso da CPU (%)",
  data: [],
  backgroundColor: "#dc3e1d",
  borderColor: "#dc3e1d",
};

var labelsTempFreq = [];
var labelsTempUso = [];

  
const dadosTemp = {
  labels: [],
  datasets: [
    {
      label: "Temperatura da CPU",
      backgroundColor: "#dc3e1d",
      borderColor: "#dc3e1d",
      data: [35,42,50],
    },
  ],
};

function criarCorrelacaoTempXUso(idServidor){

  
  const config ={
    type: "line",
    data: dadosTemp,
    options:{
      scales: {
        x: { title: { display: true, text: 'Uso de CPU (ºC)', } },
        y: {
            type: 'linear',
            position: 'left',
            title: {
                display: true,
                text: 'Temperatura da CPU (ºC)',
              
            }
        },
    
    }
  }
  }

  tempUsoCor = new Chart(document.getElementById("tempUsoCor"), config);
  obterDadosCor(idServidor);
  
}

function criarGraficoTempXUso(idServidor) {
  const config = {
    type: "line",
    data: {
      datasets: [datasetTemperatura, datasetUso],
      labels: labelsTempUso,
    },
    options: {
      animation: {
        duration: 0,
      },
      scales: {
        y: {
          min: 0,
          max: 100,
        },
      },
    },
  };

  tempUsoCpu = new Chart(document.getElementById("tempUso"), config);
  obterDadosTempCpuUso(idServidor);
}

function obterDadosTempCpuUso(idServidor) {
  fetch(`/leituras/obterDadosTemperaturaDia/${idServidor}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (resposta) {
          fetch(`/leituras/obterDadosUsoCpuDia/${idServidor}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then(function (response1) {
              if (response1.ok) {
                response1.json().then(function (resposta1) {
                  plotarGraficoTemperaturaUsoCpu(
                    resposta,
                    resposta1,
                    tempUsoCpu
                  );
                 
                  //console.log(resposta)
                });
              } else {
                console.error("Nenhum dado encontrado ou erro na API");
              }
            })
            .catch(function (error) {
              console.error(
                `Erro na obtenção dos dados p/ gráfico: ${error.message}`
              );
            });
        });
      } else {
        console.error("Nenhum dado encontrado ou erro na API");
      }
    })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

function obterDadosCor(idServidor) {
  fetch(`/leituras/obterDadosTemperaturaDia/${idServidor}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (resposta) {
          fetch(`/leituras/obterDadosUsoCpuDia/${idServidor}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then(function (response1) {
              if (response1.ok) {
                response1.json().then(function (resposta1) {
                  plotarCorrelacaoTemperaturaUsoCpu(
                    resposta,
                    resposta1,
                    tempUsoCpu
                  );
                 
                  //console.log(resposta)
                });
              } else {
                console.error("Nenhum dado encontrado ou erro na API");
              }
            })
            .catch(function (error) {
              console.error(
                `Erro na obtenção dos dados p/ gráfico: ${error.message}`
              );
            });
        });
      } else {
        console.error("Nenhum dado encontrado ou erro na API");
      }
    })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}


function plotarGraficoTemperaturaUsoCpu(resposta, resposta1, grafico) {
  resposta1 = resposta1.slice(0).reverse();
  resposta = resposta.slice(0).reverse();
  console.log(resposta)
  console.log(resposta1)

  if (resposta1.length > resposta.length) {
    resposta1.forEach((element) => {
        var data = element.horario.indexOf("T")
        data = element.horario.slice(0,data)
        labelsTempUso.push(data);
    });
  } else {
    resposta.forEach((element) => {
        console.log(element.horario)
        let dataCerta = new Date(element.horario)
      
        
        var data = element.horario.indexOf("T")
        data = element.horario.slice(0,data)
        labelsTempUso.push(data);
    });
  }
  
  for (i = 0; i < resposta.length; i++) {
    datasetTemperatura.data.push(resposta[i].valor);
  }

  resposta1.forEach((element) => {
    datasetUso.data.push(element.valor);
  });

  grafico.update();
}

function plotarCorrelacaoTemperaturaUsoCpu(resposta, resposta1, grafico) {
  resposta1 = resposta1.slice(0).reverse();
  resposta = resposta.slice(0).reverse();
  var i = 0;
  resposta1.forEach((element) => {
        //console.log(element.horario)
        //console.log(dataFormatada)
        if(i<resposta.length){
        dadosTemp.labels.push(element.valor.toFixed(2));
        i++
        }
    });

    console.log(dadosTemp)
  for (i = 0; i < resposta.length; i++) {
    //dadosTemp.datasets[0].data.push(resposta[i].valor);
  }

 

  grafico.update();
}

