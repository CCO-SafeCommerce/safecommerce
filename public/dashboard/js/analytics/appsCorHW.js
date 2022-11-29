var modelosAppCorHw = {}

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

            const ctx = document.getElementById('appsDemandCorChart');
            
            var datasetApp = {
                label: 'Demanda das aplicações',
                data: [],
                borderColor: '#36A2EB',
                backgroundColor: '#9AD0F5'
            }

            var datasetCPU = {
                label: 'Porcentagem de uso da CPU',
                data: [],
                borderColor: '#FF7492',
                backgroundColor: '#FFB1C1'
            }

            var datasetRAM = {
                label: 'Porcentagem de uso da RAM',
                data: [],
                borderColor: '#FFCD56',
                backgroundColor: '#FFE6AA'
            }

            var config = {
                type: 'line',
                data: {
                    labels: [],
                    datasets: []
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: { position: 'top' },
                        title: { display: false }
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