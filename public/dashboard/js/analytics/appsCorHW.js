var modelosAppCorHw = {}
var dataAppsCorHW = []

function plotarGraficoAppsDemandCor(idServidor) {
    fetch(`/leituras/appCorHw/${idServidor}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(resposta => {
        resposta.json().then(json => {
            modelosAppCorHw = {
                cpu: json.lrCPU,
                ram: json.lrRAM
            }

            dataAppsCorHW = json.data

            const ctx = document.getElementById('appsDemandCorChart');
            
            var datasetApp = {
                label: 'Demanda das aplicações',
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
                        x: { title: { display: true, text: 'Meses', } },
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

            json.data.forEach(registro => {
                datasetApp.data.push(registro.demanda)
                datasetCPU.data.push(registro.usoCPU)
                datasetRAM.data.push(registro.usoRAM)
                config.data.labels.push(`${registro.ano}/${registro.mes}`)
            });

            config.data.datasets.push(datasetApp)

            if (datasetCPU.data.filter(valor => valor > 0).length > 0) {
                config.data.datasets.push(datasetCPU)
            }

            if (datasetRAM.data.filter(valor => valor > 0).length > 0) {
                config.data.datasets.push(datasetRAM)
            }

            new Chart(ctx, config);      
        });
    }).catch((answer) => {
        console.log(`Erro: ${answer}`);
    });
}

function forecastAppCorHW() {
    var demandaEsperada = Number(txtDemandaEsperada.value)
    var pPrevisaoCPU = document.getElementById('pPrevisaoCPU')
    var pPrevisaoRAM = document.getElementById('pPrevisaoRAM')

    if (!!modelosAppCorHw.cpu) {
        var previsaoCPU = demandaEsperada*modelosAppCorHw.cpu.slope + modelosAppCorHw.cpu.intercept

        pPrevisaoCPU.innerText = `Para esta demanda previmos que o uso da CPU alcance: ${previsaoCPU.toFixed(2)}%`;
    }

    if (!!modelosAppCorHw.ram) {
        var previsaoRAM = demandaEsperada*modelosAppCorHw.ram.slope + modelosAppCorHw.ram.intercept

        pPrevisaoRAM.innerText = `Para esta demanda previmos que o uso da CPU alcance: ${previsaoRAM.toFixed(2)}%`;
    }

    document.getElementById('divPrevisaoUsoHWCorApp').style.display = 'inline-block'
}