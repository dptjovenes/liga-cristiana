document.addEventListener("DOMContentLoaded", () => {
  fetch("data.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al cargar data.json");
      }
      return response.json();
    })
    .then((data) => {
      // 1. Cargar Próximos Partidos (Inicio)
      const partidosContainer = document.getElementById("proximos-partidos");
      if (partidosContainer && data.partidos) {
        const proximos = data.partidos.slice(0, 3); // Muestra los primeros 3
        partidosContainer.innerHTML = proximos
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

      // 2. Cargar Calendario Completo (calendario.html)
      const calendarioContainer = document.getElementById("calendario-lista") || document.getElementById("lista-partidos");
      if (calendarioContainer && data.partidos) {
        calendarioContainer.innerHTML = data.partidos
          .map(
            (match) => `
            <div class="match-card" style="margin-bottom: 1rem;">
              <span class="team">${match.local}</span>
              <span class="vs">VS</span>
              <span class="team">${match.visitante}</span>
              <div class="match-info">
                <span>📅 ${match.fecha}</span> | <span>⏰ ${match.hora}</span> | <span>📍 ${match.cancha}</span>
              </div>
            </div>
          `
          )
          .join("");
      }

      // 3. Cargar Plantillas de Equipos (equipos.html)
      const equiposContainer = document.getElementById("lista-equipos");
      if (equiposContainer && data.plantillas) {
        equiposContainer.innerHTML = data.plantillas
          .map(
            (eq) => `
            <div class="match-card" style="margin-bottom: 1rem; align-items: flex-start;">
              <h3 style="color: var(--primary); margin-bottom: 0.5rem;">${eq.equipo}</h3>
              <ul style="list-style: none; padding-left: 0;">
                ${eq.jugadores && eq.jugadores.length > 0 
                  ? eq.jugadores.map(j => `<li>⚽ ${j}</li>`).join('')
                  : '<li><em>Plantilla por confirmar</em></li>'}
              </ul>
            </div>
          `
          )
          .join("");
      }

      // 4. Cargar Tabla de Posiciones
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

      // 5. Cargar Tabla de Goleadores
      const tablaGoleadores = document.getElementById("tabla-goleadores");
      if (tablaGoleadores && data.goleadores) {
        if (data.goleadores.length === 0) {
          tablaGoleadores.innerHTML = `<tr><td colspan="4">Aún no hay goles registrados</td></tr>`;
        } else {
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
      }
    })
    .catch((error) => {
      console.error("Error cargando los datos de la liga:", error);
    });
});
            
