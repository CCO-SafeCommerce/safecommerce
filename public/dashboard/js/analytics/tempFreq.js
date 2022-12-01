var tempCPUFreq = {};
var tempUsoCpu = {};

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

function criarGraficoTempXFreq(idServidor) {
  const config = {
    type: "line",
    data: {
      datasets: [datasetTemperatura, datasetFreq],
      labels: labelsTempFreq,
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

  tempCPUFreq = new Chart(document.getElementById("tempFreq"), config);
  obterDadosTempCPUFreq(idServidor);
}

function obterDadosTempCPUFreq(idServidor) {
  fetch(`/leituras/obterDadosTemperaturaDia/${idServidor}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (resposta) {
          fetch(`/leituras/obterDadosFreqDia/${idServidor}`, {
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
                    tempCPUFreq
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
    resposta1 = resposta1.slice(0).reverse();
    resposta = resposta.slice(0).reverse();
    if (resposta1.length > resposta.length) {
      resposta1.forEach((element) => {
          //console.log(element.horario)
          let dataCerta = new Date(element.horario)
          let dataFormatada = dataCerta.getDate()+1 + "/" + (dataCerta.getMonth() + 1) + "/" + dataCerta.getFullYear() 
          //console.log(dataFormatada)
          labelsTempFreq.push(dataFormatada);
      });
    } else {
      resposta.forEach((element) => {
          //console.log(element.horario)
          let dataCerta = new Date(element.horario)
          let dataFormatada = dataCerta.getDate()+1 + "/" + (dataCerta.getMonth() + 1) + "/" + dataCerta.getFullYear() 
          //console.log(dataFormatada)
          labelsTempFreq.push(dataFormatada);
      });
    }

  for (i = 0; i < resposta.length; i++) {
    datasetTemperatura.data.push(resposta[i].valor);
  }

  resposta1.forEach((element) => {
    datasetFreq.data.push(element.valor / 1000000000);
  });

  grafico.update();
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
function plotarGraficoTemperaturaUsoCpu(resposta, resposta1, grafico) {
  resposta1 = resposta1.slice(0).reverse();
  resposta = resposta.slice(0).reverse();
  if (resposta1.length > resposta.length) {
    resposta1.forEach((element) => {
        //console.log(element.horario)
        let dataCerta = new Date(element.horario)
        let dataFormatada = dataCerta.getDate()+1 + "/" + (dataCerta.getMonth() + 1) + "/" + dataCerta.getFullYear() 
        //console.log(dataFormatada)
        labelsTempUso.push(dataFormatada);
    });
  } else {
    resposta.forEach((element) => {
        //console.log(element.horario)
        let dataCerta = new Date(element.horario)
        let dataFormatada = dataCerta.getDate()+1 + "/" + (dataCerta.getMonth() + 1) + "/" + dataCerta.getFullYear() 
        //console.log(dataFormatada)
        labelsTempUso.push(dataFormatada);
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
