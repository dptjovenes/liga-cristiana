document.addEventListener("DOMContentLoaded", () => {
  fetch("data.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al cargar data.json");
      }
      return response.json();
    })
    .then((data) => {
      // Cargar Próximos Partidos
      const partidosContainer = document.getElementById("proximos-partidos");
      if (partidosContainer && data.partidos) {
        partidosContainer.innerHTML = data.partidos
          .map(
            (match) => `
            <div class="match-card">
              <span class="team">${match.local}</span>
              <span class="vs">VS</span>
              <span class="team">${match.visitante}</span>
              <div class="match-info">
                <span>📅 ${match.fecha}</span> | <span>⏰ ${match.hora}</span><br>
                <span>📍 ${match.cancha}</span>
              </div>
            </div>
          `
          )
          .join("");
      }

      // Cargar Tabla de Posiciones
      const tablaPosiciones = document.getElementById("tabla-posiciones");
      if (tablaPosiciones && data.posiciones) {
        tablaPosiciones.innerHTML = data.posiciones
          .map(
            (pos, index) => `
            <tr>
              <td>${index + 1}</td>
              <td class="text-left"><strong>${pos.equipo}</strong></td>
              <td>${pos.pj}</td>
              <td>${pos.pg}</td>
              <td>${pos.pe}</td>
              <td>${pos.pp}</td>
              <td><strong>${pos.pts}</strong></td>
            </tr>
          `
          )
          .join("");
      }

      // Cargar Tabla de Goleadores
      const tablaGoleadores = document.getElementById("tabla-goleadores");
      if (tablaGoleadores && data.goleadores) {
        tablaGoleadores.innerHTML = data.goleadores
          .map(
            (gol, index) => `
            <tr>
              <td>${index + 1}</td>
              <td class="text-left"><strong>${gol.jugador}</strong></td>
              <td class="text-left">${gol.equipo}</td>
              <td><strong>${gol.goles}</strong></td>
            </tr>
          `
          )
          .join("");
      }
    })
    .catch((error) => {
      console.error("Error cargando los datos de la liga:", error);
    });
});
      
