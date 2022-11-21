var tempCPUChart = {}

function criarGraficoTemperatura() {
    console.log("CAHEIMS")
    const dadosTemp = {
        labels: [],
        datasets: [{
            label: 'Temperatura da CPU',
            backgroundColor: '#dc3e1d',
            borderColor: '#dc3e1d',
            data: [],
        }]
    };

    const configTemp = {
        type: 'line',
        data: dadosTemp,
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

    tempCPUChart = new Chart(
        document.getElementById('temperature'),
        configTemp
    );
}

function obterDadosTempCPU(idServidor) {
    console.log("Etntrou")
    fetch(`/leituras/obterDadosTemperatura/${idServidor}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (response) {
        console.log("PEGUEI FAMILISA")
        if (response.ok) {
            response.json().then(function (resposta) {
                plotarGraficoTemperatura(resposta, tempCPUChart);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
    .catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });

}

function plotarGraficoTemperatura(resposta, grafico) {
    console.log("TO TENTANDO")
    for (i = resposta.length -1; i >= 0; i--) {

        if (grafico.data.datasets[0].data.length > 30 && grafico.data.labels.length > 30) {
            grafico.data.datasets[0].data.shift();
            grafico.data.labels.shift();
        }
        var dataN = new Date(resposta[i].horario)
        var dataS = `${dataN.getHours()}:${dataN.getMinutes()}`
        grafico.data.datasets[0].data.push(resposta[i].valor);
        grafico.data.labels.push(dataS);
    }
    grafico.update()
}