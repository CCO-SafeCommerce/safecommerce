var percentCPUperCoreChart = {}

function criarGraficoPercentCPUperCore() {
    const dadosCpuCore = {
        labels: [],
        datasets: [{
                label: 'Core de CPU: 1',
                backgroundColor: '#dc3e1d',
                borderColor: '#dc3e1d',
                data: [],
            },
        ]
    };

    const configCpuCore = {
        type: 'line',
        data: dadosCpuCore,
        options: {
            animation: {
                duration: 0
            },
        }
    };

    percentCPUperCoreChart = new Chart(
        document.getElementById('qtdCpuCore'),
        configCpuCore
    );
}

function obterDadosPercentCPUperCore(idServidor) {
    fetch(`/leituras/obterDadosCPUCore/${idServidor}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                plotarGraficoPercentCPUperCore(resposta, percentCPUperCoreChart);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    }).catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });

}

function plotarGraficoPercentCPUperCore(resposta, grafico) {
    for (i = resposta.length -1; i >= 0; i--) {
        if (grafico.data.datasets[0].data.length > 30 && grafico.data.labels.length > 30) {
            grafico.data.labels.shift();
        }
        var dataN = new Date(resposta[i].horario)
        var dataS = `${dataN.getHours()}:${dataN.getMinutes()}`
        grafico.data.datasets[0].data.push(resposta[i].valor);
        grafico.data.labels.push(dataS);
    }
    grafico.update()
}