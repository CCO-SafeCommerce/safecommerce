var discoReadMsChart = {}

function renderizarAba9() {
    var tabelaMetrica = document.getElementById('accordionExample');

    tabelaMetrica.innerHTML += `        
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingNine">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapseNine" aria-expanded="false"
                    aria-controls="collapseNine">
                    Lido pelo Disco
                </button>
            </h2>
            <div id="collapseNine" class="accordion-collapse collapse" aria-labelledby="headingNine"
                data-bs-parent="#accordionExample">
                <div class="accordion-body bodyCanvas">
                    <canvas id="diskRead" class="chartjs-render-monitorlineChart"></canvas>
                </div>
            </div>
        </div>
    `;
}

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
    //console.log('iniciando plotagem do gráfico...');
    //console.log("ANTES DO IF RDisk" + resposta.length)
    if (grafico.data.datasets[0].data.length > 30 && grafico.data.labels.length > 30) {
        resposta = resposta.slice(-50)
    }
    grafico.update()
    //console.log("Depois do IF RDisk" + resposta.length)
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