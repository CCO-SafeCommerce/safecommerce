var discoWriteMsChart = {}

function criarGraficoDiscoWriteMs() {
    const dadosWDisk = {
        labels: [],
        datasets: [{
            label: 'Escrito por Disco',
            backgroundColor: '#dc3e1d',
            borderColor: '#dc3e1d',
            data: [],
        }]
    };

    const configWDisk = {
        type: 'line',
        data: dadosWDisk,
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

    discoWriteMsChart = new Chart(
        document.getElementById('diskWrite'),
        configWDisk
    );
}

function obterDadosDiscoWriteMs(idServidor) {
    fetch(`/leituras/obterDadosWDisk/${idServidor}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                plotarGraficoDiscoWriteMs(resposta, discoWriteMsChart);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
    .catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

function plotarGraficoDiscoWriteMs(resposta, grafico) {
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