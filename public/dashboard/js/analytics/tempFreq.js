var tempCPUFreq = {}
var tempUsoCpu = {}

var datasetTemperatura = {
    label: "Temperatura da CPU (ºC)",
    data: [],
    backgroundColor: 'black',
    borderColor: 'black'
}

var datasetFreq = {
    label: "Frequência da CPU (MHz)",
    data: [],
    backgroundColor: '#dc3e1d',
    borderColor: '#dc3e1d',
}

var datasetUso = {
    label: "Uso da CPU (%)",
    data: [],
    backgroundColor: '#dc3e1d',
    borderColor: '#dc3e1d',
}

var labelsTempFreq = []
var labelsTempUso = []

function criarGraficoTempXFreq(idServidor){
  

    const config = {
        type: 'line',
        data: {
            datasets: [datasetTemperatura, datasetFreq],
            labels: labelsTempFreq,
        },
        options: {
            animation: {
                duration: 0
            },
            scales: {
                y: {
                    min: 0,
                    max: 100,
                }
            }
        }
    };

    tempCPUFreq = new Chart(
        document.getElementById('tempFreq'),
        config
    );
    obterDadosTempCPUFreq(idServidor);
}

function obterDadosTempCPUFreq(idServidor) {
    
    fetch(`/leituras/obterDadosTemperaturaDia/${idServidor}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (response) {
        console.log("PEGUEI FAMILISA")
        if (response.ok) {
            response.json().then(function (resposta) {
                
                
                fetch(`/leituras/obterDadosFreqDia/${idServidor}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then(function (response1) {
                    if (response1.ok) {
                        response1.json().then(function (resposta1) {
                     
                            plotarGraficoTemperaturaFrequencia(resposta, resposta1, tempCPUFreq);
                        console.log(resposta)                        });
                    } else {
                        console.error('Nenhum dado encontrado ou erro na API');
                    }
                })
                .catch(function (error) {
                    console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
                });                
                
               
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
    .catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });

}

function plotarGraficoTemperaturaFrequencia(resposta, resposta1, grafico) {
    console.log("TO TENTANDO")
   
    for (i = 0; i < resposta.length ; i++) {
       // console.log(resposta[i].dia)
        var data = `${resposta[i].dia}/${resposta[i].mes}/${resposta[i].ano}`
        datasetTemperatura.data.push(resposta[i].valor);
        labelsTempFreq.push(data);
    }
    for (i = 0; i < resposta.length; i++) {
        console.log(resposta1[i])
        datasetFreq.data.push(resposta1[i].valor/1000000000);
       
    }
    console.log(datasetFreq)
    grafico.update();
   
}

function criarGraficoTempXUso(idServidor){
    const config = {
        type: 'line',
        data: {
            datasets: [datasetTemperatura, datasetUso],
            labels: labelsTempUso,
        },
        options: {
            animation: {
                duration: 0
            },
            scales: {
                y: {
                    min: 0,
                    max: 100,
                }
            }
        }
    };

    tempUsoCpu = new Chart(
        document.getElementById('tempUso'),
        config
    );
    obterDadosTempCpuUso(idServidor);
}

function obterDadosTempCpuUso(idServidor) {
    
    fetch(`/leituras/obterDadosTemperaturaDia/${idServidor}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                
                
                fetch(`/leituras/obterDadosUsoCpuDia/${idServidor}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then(function (response1) {
                    if (response1.ok) {
                        response1.json().then(function (resposta1) {
                     
                            plotarGraficoTemperaturaUsoCpu(resposta, resposta1, tempUsoCpu);
                        //console.log(resposta)   
                                         });
                    } else {
                        console.error('Nenhum dado encontrado ou erro na API');
                    }
                })
                .catch(function (error) {
                    console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
                });                
                
               
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
    .catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });

}
function plotarGraficoTemperaturaUsoCpu(resposta, resposta1, grafico) {
    console.log("TO TENTANDO")
  
    for (i = 0; i < resposta.length ; i++) {
      
        datasetTemperatura.data.push(resposta[i].valor);
        
    }
    for (i = 0; i < resposta1.length; i++) {
        console.log(resposta1[i].valor)
        datasetUso.data.push(resposta1[i].valor);
        var data = `${resposta1[i].dia}/${resposta1[i].mes}/${resposta1[i].ano}`
      
        labelsTempUso.push(data);
    }
    console.log(datasetUso)
    console.log(datasetTemperatura)
    console.log(labelsTempUso)

    grafico.update();
   
}