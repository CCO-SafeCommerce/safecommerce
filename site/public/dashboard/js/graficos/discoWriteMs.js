var discoWriteMsChart = {}

function renderizarAba10() {
    var tabelaMetrica = document.getElementById('accordionExample');

    tabelaMetrica.innerHTML = `        
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingTen">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapseTen" aria-expanded="false" aria-controls="collapseTen">
                    Escrito pelo Disco
                </button>
            </h2>
            <div id="collapseTen" class="accordion-collapse collapse" aria-labelledby="headingTen"
                data-bs-parent="#accordionExample">
                <div class="accordion-body bodyCanvas">
                    <canvas id="diskWrite" class="chartjs-render-monitorlineChart"></canvas>
                </div>
            </div>
        </div>
    `;
}

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
   // //console.log('iniciando plotagem do gráfico...');
    //console.log("ANTES DO IF WDisk" + resposta.length)
    if (grafico.data.datasets[0].data.length > 30 && grafico.data.labels.length > 30) {
        resposta = resposta.slice(-50)
    }
    grafico.update()
    //console.log("Depois do IF WDisk" + resposta.length)
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