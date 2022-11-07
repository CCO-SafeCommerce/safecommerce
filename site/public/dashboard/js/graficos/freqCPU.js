var freqCPUChart = {}

function renderizarAba4() {
    var tabelaMetrica = document.getElementById('accordionExample');

    tabelaMetrica.innerHTML = `        
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingFour">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapseFour" aria-expanded="false"
                    aria-controls="collapseFour">
                    Frequência de uso da CPU
                </button>
            </h2>
            <div id="collapseFour" class="accordion-collapse collapse" aria-labelledby="headingFour"
                data-bs-parent="#accordionExample">
                <div class="accordion-body bodyCanvas">
                    <canvas id="frequencyCpu" class="chartjs-render-monitorlineChart"></canvas>
                </div>
            </div>
        </div>
    `;
}

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
                    max: 100,
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
    //console.log('iniciando plotagem do gráfico...');
    //console.log("ANTES DO IF Freq" + resposta.length)
    if (grafico.data.datasets[0].data.length > 30 && grafico.data.labels.length > 30) {
        resposta = resposta.slice(-50)
    }
    grafico.update()
    //console.log("Depois do IF Freq" + resposta.length)
    for (i = 0; i < resposta.length; i++) {

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