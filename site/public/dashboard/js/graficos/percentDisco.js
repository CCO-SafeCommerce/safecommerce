var percentDiscoChart = {}

function renderizarAba8() {
    var tabelaMetrica = document.getElementById('accordionExample');

    tabelaMetrica.innerHTML = `        
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingEight">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapseEight" aria-expanded="false"
                    aria-controls="collapseEight">
                    Porcentagem de uso de Disco
                </button>
            </h2>
            <div id="collapseEight" class="accordion-collapse collapse"
                aria-labelledby="headingEight" data-bs-parent="#accordionExample">
                <div class="accordion-body bodyCanvas">
                    <canvas id="diskPercent" class="chartjs-render-monitorlineChart"></canvas>
                </div>
            </div>
        </div>
    `;
}

function criarGraficoPercentDisco() {
    const dadosDisk = {
        labels: [],
        datasets: [{
            label: 'Disco',
            backgroundColor: '#dc3e1d',
            borderColor: '#dc3e1d',
            data: [],
        }]
    };

    const configDisk = {
        type: 'line',
        data: dadosDisk,
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

    percentDiscoChart = new Chart(
        document.getElementById('diskPercent'),
        configDisk
    );
}

function obterDadosPercentDisco(idServidor) {
    fetch(`/leituras/obterDadosDisk/${idServidor}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                plotarGraficoPercentDisco(resposta, percentDiscoChart);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
    .catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

function plotarGraficoPercentDisco(resposta, grafico) {
    //console.log('iniciando plotagem do gráfico...');
    //console.log("ANTES DO IF Disk" + resposta.length)
    if (grafico.data.datasets[0].data.length > 30 && grafico.data.labels.length > 30) {
        resposta = resposta.slice(-50)
    }
    grafico.update()
    //console.log("Depois do IF Disk" + resposta.length)
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