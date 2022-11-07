var percentCPUChart = {}

function renderizarAba1(idServidor) {
    var tabelaMetrica = document.getElementById('accordionExample');

    tabelaMetrica.innerHTML += `        
        <div class="accordion-item" id="abaMetrica1">
            <h2 class="accordion-header" id="headingOne">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                    Porcentagem de uso da CPU
                </button>
            </h2>
            <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne"
                data-bs-parent="#accordionExample">
                <div class="accordion-body bodyCanvas">
                    <canvas id="cpuPercent" class="chartjs-render-monitor lineChart"></canvas>
                </div>
            </div>
        </div>
    `;
    criarGraficoPercentCPU(idServidor)
}

function criarGraficoPercentCPU(idServidor) {
    const dadosCpu = {
        labels: [],
        datasets: [{
            label: 'CPU',
            backgroundColor: '#dc3e1d',
            borderColor: '#dc3e1d',
            data: [],
        }]
    };

    const configCpu = {
        type: 'line',
        data: dadosCpu,
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

    percentCPUChart = new Chart(
        document.getElementById('cpuPercent'),
        configCpu
    );

    obterDadosPercentCPU(idServidor)
}

function obterDadosPercentCPU(idServidor) {
    fetch(`/leituras/obterDadosCPU/${idServidor}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                plotarGraficoPercentCPU(resposta, percentCPUChart);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
    .catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

function plotarGraficoPercentCPU(resposta, grafico) {
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

function destruirAba1() {
    percentCPUChart.destroy()
    var aba = document.getElementById("abaMetrica1")
    aba.parentNode.removeChild(aba)
}