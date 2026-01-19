/* ===============================
   CARGAR RESULTADOS ANTERIORES
=============================== */

function cargarResultadosAnteriores() {

    if (!window.diaActivo || window.mesActivo === null || !window.anioActivoGlobal) {
        return;
    }

    const mes  = window.mesActivo + 1; // JS → SQL
    const anio = window.anioActivoGlobal;
    const dia  = window.diaActivo;

    fetch(`../api/resultados_anteriores_diaria_mas1.php?anio=${anio}&mes=${mes}&dia=${dia}`)
        .then(res => res.json())
        .then(data => pintarResultados(data))
        .catch(err => console.error('ERROR API:', err));
}

/* ===============================
   PINTAR RESULTADOS
=============================== */

function pintarResultados(data) {

    // Limpiar UI
    document.querySelectorAll('.sorteo .bolas').forEach(b => b.innerHTML = '');

    if (!Array.isArray(data) || data.length === 0) {
        return;
    }

    /* ===============================
       AGRUPAR POR HORA
    =============================== */
    const porHora = {};

    data.forEach(item => {

        const hora = item.hora.toString().padStart(2, '0');

        if (!porHora[hora]) {
            porHora[hora] = {
                diaria: null,
                mas1: null
            };
        }

        /* ===============================
           LA DIARIA (solo 1)
        =============================== */
        if (item.nombre_juego === 'La Diaria' && !porHora[hora].diaria) {
            porHora[hora].diaria = item.resultado_ganador;
        }

        /* ===============================
           MÁS 1 (solo el +1:X)
        =============================== */
        if (item.nombre_juego === 'Más 1' && item.resultado_ganador.includes('+1')) {
            // Extraer solo el número después de :
            const valor = item.resultado_ganador.split(':')[1]?.trim();
            porHora[hora].mas1 = valor;
        }
    });

    /* ===============================
       PINTAR EN DOM
    =============================== */
    document.querySelectorAll('.sorteo').forEach(sorteo => {

        const hora = sorteo.dataset.hora;
        const bolas = sorteo.querySelector('.bolas');

        if (!porHora[hora]) return;

        /* ===== LA DIARIA ===== */
        if (porHora[hora].diaria !== null) {
            bolas.innerHTML += `
                <div class="bola">
                    ${String(porHora[hora].diaria).padStart(2, '0')}
                </div>
            `;
        }

        /* ===== MÁS 1 ===== */
        if (porHora[hora].mas1 !== null) {
            bolas.innerHTML += `
                <div class="bola mas">
                    <img src="../assets/img/Más_1.png" class="logo-mas" alt="Más 1">
                </div>
                <div class="bola clara">${porHora[hora].mas1}</div>
            `;
        }
    });
}
