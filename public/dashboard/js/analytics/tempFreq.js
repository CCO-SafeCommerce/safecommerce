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

var datasetCor =[]
var datasetReg = []
var data = {
  datasets : [{
    label: "Dispersão",
    data: datasetCor
  },{
    label: "Regressão Linear",
    data: datasetReg,
    type: 'line',
    pointRadius: 0,
  }
]
}



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
  document.getElementById('divAnalytic#tempUsoCor').style.display = 'flex'
  
  const config = {
    type: 'scatter',
    data: data,
    options: {
      scales: {
        x: {
          type: 'linear',
          position: 'bottom',
          title: { display: true, text: 'Temperatura (ºC)', }
        },
        y: {
          title: { display: true, text: 'Uso de CPU (%)', }
        }
      }
    }
  };

  tempUsoCor = new Chart(document.getElementById("tempUsoCor"), config);
  obterDadosCor(idServidor);
  
}

function criarGraficoTempXUso(idServidor) {
  document.getElementById('divAnalytic#tempUso').style.display = 'flex'
  
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
  fetch(`/leituras/regressaoTempUso/${idServidor}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (resposta) {
          plotarCorrelacaoTemperaturaUsoCpu(resposta, tempUsoCor)
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

function plotarCorrelacaoTemperaturaUsoCpu(resposta, grafico) {
  console.log(resposta)

  for(i = 0; i < resposta.data.length; i++){
    console.log(resposta.data[i].temp)  
    datasetCor.push({x: resposta.data[i].temp, y: resposta.data[i].cpu})
    datasetReg.push({x: resposta.data[i].temp, y: resposta.regressao[0] + resposta.data[i].temp * resposta.regressao[1]})
  }

  grafico.update();
}

