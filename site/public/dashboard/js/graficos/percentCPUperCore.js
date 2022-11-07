var percentCPUperCoreChart = {}

function renderizarAba3() {
    var tabelaMetrica = document.getElementById('accordionExample');

    tabelaMetrica.innerHTML = `        
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingThree">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapseThree" aria-expanded="false"
                    aria-controls="collapseThree">
                    Porcentagem de uso da CPU por core
                </button>
            </h2>
            <div id="collapseThree" class="accordion-collapse collapse"
                aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                <div class="accordion-body bodyCanvas">
                    <canvas id="qtdCpuCore" class="chartjs-render-monitorlineChart"></canvas>
                </div>
            </div>
        </div>
    `;
}

function criarGraficoPercentCPUperCore() {
    const dadosCpuCore = {
        labels: [],
        datasets: [{
                label: 'Core de CPU: 1',
                backgroundColor: '#dc3e1d',
                borderColor: '#dc3e1d',
                data: [],
            },
            {
                label: 'Core de CPU: 2',
                backgroundColor: '#68b2f8',
                borderColor: '#68b2f8',
                data: [],
            },
            {
                label: 'Core de CPU: 3',
                backgroundColor: '#fce07f',
                borderColor: '#fce07f',
                data: [],
            },
            {
                label: 'Core de CPU: 4',
                backgroundColor: '#7fda89',
                borderColor: '#7fda89',
                data: [],
            },
            {
                label: 'Core de CPU: 5',
                backgroundColor: '#ffb145',
                borderColor: '#ffb145',
                data: [],
            },
            {
                label: 'Core de CPU: 6',
                backgroundColor: '#adeada',
                borderColor: '#adeada',
                data: [],
            },
            {
                label: 'Core de CPU: 7',
                backgroundColor: '#a45785',
                borderColor: '#a45785',
                data: [],
            },
            {
                label: 'Core de CPU: 8',
                backgroundColor: '#626970',
                borderColor: '#626970',
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
    //console.log('iniciando plotagem do gráfico...');
    //console.log("ANTES DO IF CPUCore" + resposta.length)
    if (grafico.data.datasets[0].data.length > 30 && grafico.data.labels.length > 30) {
        resposta = resposta.slice(-100)
    }
    grafico.update()
    //console.log("Depois do IF CPUCore" + resposta.length)
    for (i = 0; i < resposta.length; i += 8) {

        if (grafico.data.datasets[0].data.length > 30 && grafico.data.labels.length > 30) {
            grafico.data.datasets[0].data.shift();
            grafico.data.datasets[1].data.shift();
            grafico.data.datasets[2].data.shift();
            grafico.data.datasets[3].data.shift();
            grafico.data.datasets[4].data.shift();
            grafico.data.datasets[5].data.shift();
            grafico.data.datasets[6].data.shift();
            grafico.data.datasets[7].data.shift();
            grafico.data.labels.shift();
        }
        var dataN = new Date(resposta[i].horario)
        var dataS = `${dataN.getHours()}:${dataN.getMinutes()}`
        grafico.data.datasets[0].data.push(resposta[i].valor);
        grafico.data.datasets[1].data.push(resposta[i + 1].valor);
        grafico.data.datasets[2].data.push(resposta[i + 2].valor);
        grafico.data.datasets[3].data.push(resposta[i + 3].valor);
        grafico.data.datasets[4].data.push(resposta[i + 4].valor);
        grafico.data.datasets[5].data.push(resposta[i + 5].valor);
        grafico.data.datasets[6].data.push(resposta[i + 6].valor);
        grafico.data.datasets[7].data.push(resposta[i + 7].valor);
        grafico.data.labels.push(dataS);
    }
    grafico.update()
}