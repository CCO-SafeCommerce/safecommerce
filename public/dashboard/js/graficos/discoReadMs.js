var discoReadMsChart = {}

function criarGraficoDiscoReadMs() {
    const dadosRDisk = {
        labels: [],
        datasets: [{
            label: 'Lido por Disco',
            backgroundColor: '#dc3e1d',
            borderColor: '#dc3e1d',
            data: [],
        }]
    };

    const configRDisk = {
        type: 'line',
        data: dadosRDisk,
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

    discoReadMsChart = new Chart(
        document.getElementById('diskRead'),
        configRDisk
    );
}

function obterDadosDiscoReadMs(idServidor) {
    fetch(`/leituras/obterDadosRDisk/${idServidor}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                plotarGraficoDiscoReadMs(resposta, discoReadMsChart);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
    .catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });

}

function plotarGraficoDiscoReadMs(resposta, grafico) {
    for (i = resposta.length -1; i >= 0; i--) {

        if (grafico.data.datasets[0].data.length > 30 && grafico.data.labels.length > 30) {
            grafico.data.datasets[0].data.shift();
            grafico.data.labels.shift();
        }
        var dataN = new Date(resposta[i].horario)
        var dataS = `${dataN.getHours()}:${dataN.getMinutes()}`
        grafico.data.datasets[0].data.push(resposta[i].valor / Math.pow(10,9));
        grafico.data.labels.push(dataS);
    }
    grafico.update()
}