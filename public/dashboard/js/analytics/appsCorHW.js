var appCorHWData = []

function plotarGraficoAppsDemandCor(idServidor) {
    fetch(`/leituras/apps-cor-hw/${idServidor}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(resposta => {
        resposta.json().then(json => {
            appCorHWData = json

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

            json.forEach(registro => {
                datasetApp.data.push(registro.demanda)
                datasetCPU.data.push(registro.usoCPU)
                datasetRAM.data.push(registro.usoRAM)
                config.labels.push(`${registro.ano}/${registro.mes}`)
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
    })
}

function forecastAppCorHW() {
}