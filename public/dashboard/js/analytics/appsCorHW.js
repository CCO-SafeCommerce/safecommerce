var statsAppsCorHW = {}
var dataAppsCorHW = []

function plotarGraficoAppsDemand(idServidor) {
    document.getElementById('divAnalytic#AppsCorHW').style.display = 'flex'

    fetch(`/leituras/appCorHw/${idServidor}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(resposta => {
        resposta.json().then(json => {
            statsAppsCorHW = {
                lrCPU: json.lrCPU,
                lrRAM: json.lrRAM,
                corCPU: json.corCPU,
                corRAM: json.corRAM
            }
            
            dataAppsCorHW = json.data

            document.getElementById('appsCoefCorCPU').innerText = `Coefieciente de correlação entre Conexões simultâneas e Uso de CPU: ${json.corCPU}`
            document.getElementById('appsCoefCorRAM').innerText = `Coefieciente de correlação entre Conexões simultâneas e Uso de RAM: ${json.corRAM}`
            
            criarGraficoAppsCorHW(dataAppsCorHW)
            criarGraficoAppsCorCPU(dataAppsCorHW)
            criarGraficoAppsCorRAM(dataAppsCorHW)
        });
    }).catch((answer) => {
        console.log(`Erro: ${answer}`);
    });
}

function criarGraficoAppsCorHW(data) {
    const ctx = document.getElementById('appsCorHWChart');

    var datasetApp = {
        label: 'Conexões simultâneas',
        data: [],
        backgroundColor: 'rgba(44, 159, 163, 0.7)',
        order: 2,
        yAxisID: 'y',
    }
    
    var datasetCPU = {
        label: '% de uso da CPU',
        data: [],
        borderColor: '#93a31c',
        backgroundColor: '#93a31c',
        type: 'line',
        order: 1,
        yAxisID: 'y2'
    }

    var datasetRAM = {
        label: '% de uso da RAM',
        data: [],
        borderColor: '#ffa02e',
        backgroundColor: '#ffa02e',
        type: 'line',
        order: 0,
        yAxisID: 'y2'
    }

    var config = {
        type: 'bar',
        data: { labels: [], datasets: [] },
        options: {
            interaction: { intersect: false, mode: 'index', },
            responsive: true,
            plugins: {
                legend: { position: 'top' },
                title: { display: false },
                tooltip: {
                    callbacks: {
                        label: (tooltipItem) => {
                            var label = tooltipItem.dataset.label || '';

                            if (label) {
                                label += ': ';                                
                            }

                            if (tooltipItem.dataset.order != 2) {
                                label += `${Number(tooltipItem.parsed.y).toFixed(2)}%`
                            } else {
                                label += `${Number(tooltipItem.parsed.y).toFixed(2)}`
                            }

                            return label
                        }
                    }
                }                                   
            },
            scales: {
                x: { title: { display: true, text: 'Dias', } },
                y: {
                    type: 'linear',
                    position: 'right',
                    ticks: { color: '#2c9fa3' },
                    title: {
                        display: true,
                        text: 'Demanda de aplicações',
                        color: '#2c9fa3'
                    }
                },
                y2: {
                    type: 'linear',
                    position: 'left',
                    min: 0,
                    max: 100,
                    title: { display: true, text: '% de uso de Hardware' },
                    grid: { drawOnChartArea: false }
                }
            }
        }
    }

    data.forEach(registro => {
        datasetApp.data.push(registro.demanda)
        datasetCPU.data.push(registro.usoCPU)
        datasetRAM.data.push(registro.usoRAM)
        config.data.labels.push(`${registro.dia}/${registro.mes}/${registro.ano}`)
    });

    config.data.datasets.push(datasetApp)

    if (datasetCPU.data.filter(valor => valor > 0).length > 0) {
        config.data.datasets.push(datasetCPU)
    }

    if (datasetRAM.data.filter(valor => valor > 0).length > 0) {
        config.data.datasets.push(datasetRAM)
    }

    new Chart(ctx, config);  
}

function criarGraficoAppsCorCPU(data) {
    const ctx = document.getElementById('appsCorCPUChart');

    var config = {
        type: 'scatter',
        data: {
            datasets: [{
                label: "Dispersão",
                data: []
            }, {
                label: "Regressão Linear",
                data: [],
                type: 'line',
                pointRadius: 0,
            }]
        },
        options: {
            scales: {
                x: {
                  type: 'linear',
                  position: 'bottom',
                  title: { display: true, text: 'Conexões simultâneas', }
                },
                y: {
                  title: { display: true, text: 'Uso de CPU (%)', }
                }
            }
        }
    }

    data.forEach(registro => {
        config.data.datasets[0].data.push({ x: registro.demanda, y: registro.usoCPU })
        config.data.datasets[1].data.push({ x: registro.demanda, y: registro.demanda*statsAppsCorHW.lrCPU.slope + statsAppsCorHW.lrCPU.intercept })
    });

    new Chart(ctx, config);
}

function criarGraficoAppsCorRAM(data) {
    const ctx = document.getElementById('appsCorRAMChart');

    var config = {
        type: 'scatter',
        data: {
            datasets: [{
                label: "Dispersão",
                data: []
            }, {
                label: "Regressão Linear",
                data: [],
                type: 'line',
                pointRadius: 0,
            }]
        },
        options: {
            scales: {
                x: {
                  type: 'linear',
                  position: 'bottom',
                  title: { display: true, text: 'Conexões simultâneas', }
                },
                y: {
                  title: { display: true, text: 'Uso de RAM (%)', }
                }
            }
        }
    }

    data.forEach(registro => {
        config.data.datasets[0].data.push({ x: registro.demanda, y: registro.usoRAM })
        config.data.datasets[1].data.push({ x: registro.demanda, y: registro.demanda*statsAppsCorHW.lrRAM.slope + statsAppsCorHW.lrRAM.intercept })
    });

    new Chart(ctx, config);
}

function forecastAppCorHW() {
    var demandaEsperada = Number(txtDemandaEsperada.value)
    var pPrevisaoCPU = document.getElementById('pPrevisaoCPU')
    var pPrevisaoRAM = document.getElementById('pPrevisaoRAM')

    if (!!statsAppsCorHW.lrCPU) {
        var previsaoCPU = demandaEsperada*statsAppsCorHW.lrCPU.slope + statsAppsCorHW.lrCPU.intercept

        pPrevisaoCPU.innerText = `Para esta demanda, previmos que o uso da CPU alcance: ${previsaoCPU.toFixed(2)}%`;
    }

    if (!!statsAppsCorHW.lrRAM) {
        var previsaoRAM = demandaEsperada*statsAppsCorHW.lrRAM.slope + statsAppsCorHW.lrRAM.intercept

        pPrevisaoRAM.innerText = `Para esta demanda, previmos que o uso da RAM alcance: ${previsaoRAM.toFixed(2)}%`;
    }

    document.getElementById('divPrevisaoUsoHWCorApp').style.display = 'inline-block'
}

function changeVisaoAppsCorChart() {
    var chart = selAppsCorChart.value

    var isHWChart = chart == 'appsCorHWChart';
    var isCPUChart = chart == 'appsCorCPUChart';
    var isRAMChart = chart == 'appsCorRAMChart';

    document.getElementById('appsCorHWChart').style.display = isHWChart ? 'block' : 'none'
    document.getElementById('appsCorCPUChart').style.display = isCPUChart ? 'block' : 'none'
    document.getElementById('appsCorRAMChart').style.display = isRAMChart ? 'block' : 'none'
}