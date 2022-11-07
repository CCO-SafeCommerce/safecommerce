var percentRAMChart = {}

function renderizarAba6() {
    var tabelaMetrica = document.getElementById('accordionExample');

    tabelaMetrica.innerHTML = `        
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingSix">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                    Porcentagem de uso da Memória RAM
                </button>
            </h2>
            <div id="collapseSix" class="accordion-collapse collapse" aria-labelledby="headingSix"
                data-bs-parent="#accordionExample">
                <div class="accordion-body bodyCanvas">
                    <canvas id="ramPercent" class="chartjs-render-monitorlineChart"></canvas>
                </div>
            </div>
        </div>
    `;
}

function criarGraficoPercentRAM() {
    const dadosRam = {
        labels: [],
        datasets: [{
            label: 'RAM',
            backgroundColor: '#dc3e1d',
            borderColor: '#dc3e1d',
            data: [],
        }]
    };

    const configRam = {
        type: 'line',
        data: dadosRam,
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

    percentRAMChart = new Chart(
        document.getElementById('ramPercent'),
        configRam
    );   
}

function obterDadosPercentRAM(idServidor) {
    fetch(`/leituras/obterDadosRam/${idServidor}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                plotarGraficoPercentRAM(resposta, percentRAMChart);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
    .catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

function plotarGraficoPercentRAM(resposta, grafico) {
    //console.log('iniciando plotagem do gráfico...');
    //console.log("ANTES DO IF RAM" + resposta.length)
    if (grafico.data.datasets[0].data.length > 30 && grafico.data.labels.length > 30) {
        resposta = resposta.slice(-50)
    }
    grafico.update()
    //console.log("Depois do IF RAM" + resposta.length)
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