var freqCPUChart = {}

function criarGraficoFreqCPU() {
    const dadosFreq = {
        labels: [],
        datasets: [{
            label: 'Frequência de uso CPU',
            backgroundColor: '#dc3e1d',
            borderColor: '#dc3e1d',
            data: [],
        }]
    };

    const configFreq = {
        type: 'line',
        data: dadosFreq,
        options: {
            animation: {
                duration: 0
            },
            scales: {
                y: {
                    min: 0,
                    max: 10,
                }
            }
        }
    };

    freqCPUChart = new Chart(
        document.getElementById('frequencyCpu'),
        configFreq
    );
}

function obterDadosFreqCPU(idServidor) {
    fetch(`/leituras/obterDadosFreq/${idServidor}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(resposta)
                plotarGraficoFreqCPU(resposta, freqCPUChart);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
    .catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });

}

function plotarGraficoFreqCPU(resposta, grafico) {
    for (i = resposta.length -1; i >= 0; i--) {
        if (grafico.data.datasets[0].data.length > 30 && grafico.data.labels.length > 30) {
            grafico.data.datasets[0].data.shift();
            grafico.data.labels.shift();
        }
       
        var dataN = new Date(resposta[i].horario)
        var dataS = `${dataN.getHours()}:${dataN.getMinutes()}`
        grafico.data.datasets[0].data.push(resposta[i].valor/1000000000);
        grafico.data.labels.push(dataS);
        console.log(grafico.data.datasets[0].data)
    }
    grafico.update()
}