var percentCPUperCoreChart = {}
var qtdVCPU = 0

function defineDataset(){
    var cores = ["#F5DE0C", "#E8A917", "#FFCF0D", "#FF9E0D", "#F5770C", "#FAB000", "#DE8600", "#DE4600", "#F5340C", "#DE0500", "#F5330C", "#FA7500", "#FDB60D", "#FF8519", "#E8520C", "#F50600", "#FF7600", "#FFB70D", "#FF370D", "#E84C00"];

    var datasets = [];

    for(let i = 0; i < qtdVCPU; i++){
        datasets.append([{
            labels: `Core ${i + 1}`,
            backgroundColor: cores[i],
            borderColor: cores[i],
            data: []
        }])
    }

    return datasets;
}

function criarGraficoPercentCPUperCore() {
    const datasets = defineDataset()
    const dadosCpuCore = {
        labels: [],
        datasets:datasets 
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
    for (i = resposta.length -1; i >= 0; i--) {
        if (grafico.data.datasets[0].data.length > 30 && grafico.data.labels.length > 30) {
            grafico.data.datasets.forEach(grafico => {
                grafico.data.datasets[i].data.shift()
            });
            grafico.data.labels.shift();
        }
        var dataN = new Date(resposta[i].horario)
        var dataS = `${dataN.getHours()}:${dataN.getMinutes()}`
        grafico.data.datasets[0].data.push(resposta[i].valor);
        grafico.data.labels.push(dataS);
    }
    grafico.update()
}