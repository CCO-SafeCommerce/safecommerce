var tempCPUChart = {};
var tempCPUFreq = {};
var params = new URLSearchParams(window.location.search);
var idServidor = params.get("idServer");
selectedServer = idServidor;
var servers = JSON.parse(sessionStorage.SERVERS);

var servidor = servers.find((s) => {
  if (s.idServidor == idServidor) {
    return s;
  }
});

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

var labelsTempFreq = [];

function criarGraficoTemperatura() {
  const dadosTemp = {
    labels: [],
    datasets: [
      {
        label: "Temperatura da CPU",
        backgroundColor: "#dc3e1d",
        borderColor: "#dc3e1d",
        data: [],
      },
    ],
  };

  const configTemp = {
    type: "line",
    data: dadosTemp,
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

  tempCPUChart = new Chart(document.getElementById("temperature"), configTemp);
}

function criarGraficoTempXFreq() {
  const config = {
    type: "line",
    datasets: [datasetTemperatura, datasetFreq],
    labels: labelsTempFreq,
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

  tempCPUFreq = new Chart(document.getElementById("tempFreq"), config);
}

function obterDadosTempCPU(idServidor) {
  fetch(`/leituras/obterDadosTemperatura/${idServidor}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (response) {
      console.log("PEGUEI FAMILISA");
      if (response.ok) {
        response.json().then(function (resposta) {
          plotarGraficoTemperatura(resposta, tempCPUChart);
        });
      } else {
        console.error("Nenhum dado encontrado ou erro na API");
      }
    })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

function plotarGraficoTemperatura(resposta, grafico) {
  console.log("TO TENTANDO");
  for (i = resposta.length - 1; i >= 0; i--) {
    if (
      grafico.data.datasets[0].data.length > 30 &&
      grafico.data.labels.length > 30
    ) {
      grafico.data.datasets[0].data.shift();
      grafico.data.labels.shift();
    }
    var dataN = new Date(resposta[i].horario);
    var dataS = `${dataN.getHours()}:${dataN.getMinutes()}`;
    grafico.data.datasets[0].data.push(resposta[i].valor);
    grafico.data.labels.push(dataS);
  }
  grafico.update();
}

function obterDadosTempCPUFreq(idServidor) {
  fetch(`/leituras/obterDadosTemperatura/${idServidor}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (response) {
      console.log("PEGUEI FAMILISA");
      if (response.ok) {
        response.json().then(function (resposta) {
          fetch(`/leituras/obterDadosFreq/${idServidor}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then(function (response1) {
              if (response1.ok) {
                response1.json().then(function (resposta1) {
                  plotarGraficoTemperaturaFrequencia(
                    resposta,
                    resposta1,
                    tempCPUChart
                  );
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

function plotarGraficoTemperaturaFrequencia(resposta, resposta1, grafico) {
  console.log("TO TENTANDO");

  for (i = resposta.length - 1; i >= 0; i--) {
    if (
      grafico.data.datasets[0].data.length > 30 &&
      grafico.data.labels.length > 30
    ) {
      grafico.data.datasets[0].data.shift();
      grafico.data.labels.shift();
    }
    var dataN = new Date(resposta[i].horario);
    var dataS = `${dataN.getHours()}:${dataN.getMinutes()}`;
    grafico.data.datasets[0].data.push(resposta[i].valor);
    labelsTempFreq.push(dataS);
  }
  for (i = resposta1.length - 1; i >= 0; i--) {
    if (
      grafico.data.datasets[1].data.length > 30 &&
      grafico.data.labels.length > 30
    ) {
      grafico.data.datasets[1].data.shift();
      grafico.data.labels.shift();
    }
    var dataN = new Date(resposta1[i].horario);
    var dataS = `${dataN.getHours()}:${dataN.getMinutes()}`;
    grafico.data.datasets[1].data.push(resposta1[i].valor);
  }
}

function monitorarParaAlertar(idServidor) {
  fetch(`/leituras/obterDadosTemperatura/${idServidor}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (response) {
      if (response.ok) {
        response.json().then(async function (resposta) {
          if (resposta[0].situacao == "n") {
          } else {
            var ip = servidor.ipServidor;
            var apiKey = "1231525ddbe74309926041e22caf7f3b";
            let url = `https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}&ip=189.1.175.50`;
            var cidade = await fetch(url).then((responseCidade) =>
              responseCidade.json().then(async (json) => {
                cidade = json.city;
                var apiKeyTemp = "2f5227bde113d8d046103f8249cc4cec";

                await fetch(
                  `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKeyTemp}&lang=pt_br`
                )
                  .then((responseTemp) => {
                    responseTemp.json().then((jsonTemp) => {
                      var temp = jsonTemp.main.temp - 273.15;
                      if (resposta[0].situacao == "a") {
                       if(temp > 30 && temp <= 35){
                         alert("A temperatura do servidor está subindo. A temperatura atual da cidade em que o servidor está é de " + temp.toFixed(2) + "°C. Pode ser que o servidor esteja com problemas de refrigeração.");
                       }else if(temp > 35){
                            alert("A temperatura do servidor está subindo. A temperatura atual da cidade em que o servidor está é de " + temp.toFixed(2) + "°C, muito alta! Pode ser que o servidor esteja com problemas de refrigeração.");
                       }
                       // eu nao sei sdksjdksjdk estou so´ ha

                    }else{
                        if(temp > 30 && temp <= 35){
                         alert("A temperatura do servidor está muito alta. A temperatura atual da cidade em que o servidor está é de " + temp.toFixed(2) + "°C. Pode ser que o servidor esteja com problemas de refrigeração.");
                       }else if(temp > 35){
                            alert("A temperatura do servidor está muito alta. A temperatura atual da cidade em que o servidor está é de " + temp.toFixed(2) + "°C, muito alta! Pode ser necessário desligar o servidor para evitar danos.");
                       }
                    }
                      console.log(temp);
                    });
                  })
                  .catch((error) => {
                    console.error(
                      `Erro na obtenção dos dados p/ gráfico: ${error.message}`
                    );
                  });
              })
            );

          
          }
        });
      } else {
        console.error("Nenhum dado encontrado ou erro na API");
      }
    })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}
