document.addEventListener("DOMContentLoaded", () => {
    // Função para buscar dados do servidor
    function getPatientDataFromServer(callback) {
      fetch('/get_patient_data')
          .then(response => response.json())
          .then(data => callback(data))
          .catch(error => console.error('Erro ao buscar dados do servidor:', error));
    }
  
    // Função para atualizar o mapa com base nos dados do paciente
    function updateMap() {
      getPatientDataFromServer((patientData) => {
        console.log('Dados do paciente:', patientData);
  
        // Limpar todas as salas antes de destacar
        const salas = document.querySelectorAll("#hospitalMap div");
        salas.forEach((sala) => {
          sala.classList.remove("destacado");
        });
  
        // Iterar sobre os dados e destacar a sala do paciente
        patientData.forEach(function (patient) {
          const salaElement = document.getElementById(patient.local);
          console.log(salaElement)
          if (salaElement) {
            console.log(`Destacando sala ${patient.local} para paciente ${patient.name}`);
            salaElement.classList.add("destacado");
          } else {
            console.log(`Elemento da sala ${patient.local} não encontrado no mapa.`);
          }
        });
      });
    }
  
      updateMap();
      setInterval(updateMap, 5000); // Update 5 secs
  
    function drawHospitalMap() {
      const canvas = document.getElementById("hospitalMap");
      const ctx = canvas.getContext("2d");
  
      // Desenho das salas
      drawRoom(ctx, 130, 150, 80, 80, "Sala 01");
      drawRoom(ctx, 130, 50, 80, 80, "Sala 02");
      drawRoom(ctx, 250, 50, 120, 120, "Sala 03");
      drawRoom(ctx, 250, 200, 120, 120, "Sala 04");
    }
  
    // Função auxiliar para desenhar uma sala
    function drawRoom(ctx, x, y, width, height, roomName) {
      ctx.fillStyle = "white";
      ctx.strokeStyle = "black";
      ctx.fillRect(x, y, width, height);
      ctx.strokeRect(x, y, width, height);
  
      const textX = x + width / 2;
      const textY = y + height / 2;
  
      ctx.font = "12px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
  
      ctx.strokeText(roomName, textX, textY);
  
      const salaElement = document.createElement("div");
      salaElement.id = roomName;
  
      document.body.appendChild(salaElement);
      
    }
  
    // Chamar a função para desenhar a planta do hospital
    drawHospitalMap();
  });
  