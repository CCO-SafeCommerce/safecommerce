

function definirChartAlertas(idServidor, componente){
    fetch(`/leituras/alertas?idServidor=${idServidor}&componente=${componente}`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }

    }).then(function (response){
      if(response.ok){
        response.json().then(function (resposta){
          var alertaCpu = resposta[0].qtdAvisos
          console.log("Alertas do CPU: " + alertaCpu)
          var emergenciaCpu = resposta[0].qtdEmergencias
          console.log("Quantidade de emergencias da CPU: " +emergenciaCpu)
          var alertaDisco = resposta[1].qtdAvisos
          console.log("Quantidade de Avisos do Disco: " + alertaDisco)
          var emergenciaDisco = resposta[1].qtdEmergencias
          console.log("Quantidade de Emergencias do Disco: " + emergenciaDisco)
          var alertaRam = resposta[2].qtdAvisos
          console.log("Quantidade de alertas da RAM: " + alertaRam)
          var emergenciaRam = resposta[2].qtdEmergencias
          console.log("Quantidade de emergencias da RAM: " + emergenciaRam)
     
          data.datasets[0].data.push(emergenciaCpu, emergenciaRam, emergenciaDisco)
          data.datasets[1].data.push(alertaCpu,alertaRam,alertaDisco)
          window.chartAlerta.update()
        });

      } else{
        console.error('Nenhum dado Encontrado ou erro na API');
      }
    })
    .catch(function (error){
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });

    console.log("teste")

    // setup 
    const data = {
        labels: ['CPU', 'RAM', 'DISCO'],
        datasets: [{
          label: 'Emergencias',
          data:  [],
          backgroundColor: 'rgba(255, 26, 104, 0.2)',
          borderColor:'rgba(255, 26, 104, 1)',
          borderWidth: 1
        }, 
        {
            label: 'Alertas',
            data: [],
            backgroundColor: 'rgba(250, 201, 65, 0.2)',
            borderColor:'rgba(250, 186, 10)',
            borderWidth: 1
          }]
      };

      // config 
      const config = {
        type: 'bar',
        data,
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      };

      // render init block
      window.chartAlerta = new Chart(
        document.getElementById('chartAlerta'),
        config
      );

     

}

function maiorEmergencias(idServidor){
fetch(`/leituras/maiorEmergencia?idServidor=${idServidor}`,{
  method: "GET",
  headers: {
    "Content-Type": "application/json"
  }
}).then(function (response){
  if(response.ok){
    response.json().then(function (resposta){
      console.log(resposta)

      if(resposta[0].qtdEmergencias == 0){
        maiorEmergencia.innerHTML = "<br>" + "Nenhuma Emergencia captada"
      }else{

        maiorEmergencia.innerHTML = "<br>" + resposta[0].componente
      }
    });
  } else{
    console.error('Nenhum dado Encontrado ou erro na API');
  }
})
.catch(function (error){
  console.error(`Erro na obtenção dos dados para a KPI ${error.message}`);
});
}

function maiorAlertas(idServidor){
  fetch(`/leituras/maiorAlerta?idServidor=${idServidor}`,{
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(function (response){
    if(response.ok){
      response.json().then(function (resposta){
        console.log("essa é a resposta")
        console.log(resposta)
        if(resposta[0].qtdAvisos == 0){
          maiorAlerta.innerHTML = "<br>" + "Nenhum Alerta Captado"
        }else{
          maiorAlerta.innerHTML = "<br>" + resposta[0].componente
        }
      });
    } else{
      console.error('Nenhum dado Encontrado ou erro na API');
    }
  })
  .catch(function (error){
    console.error(`Erro na obtenção dos dados para a KPI ${error.message}`);
  });
  }
