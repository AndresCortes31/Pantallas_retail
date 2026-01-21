document.addEventListener("DOMContentLoaded", () => {

    const tabla = document.querySelector(".tabla-anio");
    const anioActivo = document.querySelector(".anio-activo");

    /* ===============================
       IMAGEN DE SUEÑO (USA MAPA_SUENOS)
       =============================== */
    function imagenSueno(numero) {

        if (numero === null || numero === undefined) return "";

        const key = numero.toString().padStart(2, "0");

        if (typeof MAPA_SUENOS === "undefined") {
            console.error("❌ MAPA_SUENOS no está cargado");
            return "";
        }

        if (!MAPA_SUENOS[key]) {
            console.warn(`⚠️ No existe imagen para el número ${key}`);
            return "";
        }

        return `
            <img 
                src="../assets/img/SUENOS_HN/${MAPA_SUENOS[key]}"
                alt="Sueño ${key}"
                class="img-sueno"
            >
        `;
    }

    /* ===============================
       PINTAR TABLA
       =============================== */
    function pintarTabla(data) {

        tabla.querySelectorAll(".fila:not(.fila-head)").forEach(f => f.remove());

        data.forEach(row => {

            const fila = document.createElement("div");
            fila.className = "fila";

            fila.innerHTML = `
                <span class="numero">
                    ${row.numero}
                    ${imagenSueno(row.numero)}
                </span>

                <span>${row.ene}</span>
                <span>${row.feb}</span>
                <span>${row.mar}</span>
                <span>${row.abr}</span>
                <span>${row.may}</span>
                <span>${row.jun}</span>
                <span>${row.jul}</span>
                <span>${row.ago}</span>
                <span>${row.sep}</span>
                <span>${row.oct}</span>
                <span>${row.nov}</span>
                <span>${row.dic}</span>

                <span class="total">${row.total}</span>
            `;

            tabla.appendChild(fila);
        });
    }

    /* ===============================
       ESTADO VISUAL DE MESES
       =============================== */
function actualizarEstadoMeses(anioSeleccionado) {

    const anioActual = new Date().getFullYear();
    const mesActual = new Date().getMonth() + 1; // 1 - 12

    const meses = document.querySelectorAll(".fila-head span[data-mes]");

    meses.forEach(mes => {
        mes.classList.remove("mes-activo", "mes-todos-activos");

        const mesNumero = parseInt(mes.dataset.mes);

        if (anioSeleccionado < anioActual) {
            // Años pasados → todos activos
            mes.classList.add("mes-todos-activos");
        } 
        else if (anioSeleccionado === anioActual) {
            // Año actual → solo el mes actual activo
            if (mesNumero === mesActual) {
                mes.classList.add("mes-activo");
            }
        }
    });
}

    /* ===============================
       CARGAR DATOS POR AÑO
       =============================== */
    function cargarDatosPorAnio(anio) {
        fetch(`../api/top_numeros_ganadores_anio.php?anio=${anio}`)
            .then(res => res.json())
            .then(data => pintarTabla(data))
            .catch(err => console.error("❌ Error cargando datos:", err));
    }

    /* ===============================
       SELECTOR DE AÑO
       =============================== */
    document.querySelectorAll(".anio-opciones div").forEach(opcion => {
        opcion.addEventListener("click", () => {

            const anio = parseInt(opcion.dataset.anio);

            anioActivo.textContent = anio;
            document.querySelector(".anio-opciones").classList.remove("open");

            cargarDatosPorAnio(anio);
            actualizarEstadoMeses(anio);
        });
    });

    /* ===============================
       CARGA INICIAL
       =============================== */
    if (anioActivo?.textContent) {
        const anio = parseInt(anioActivo.textContent);
        cargarDatosPorAnio(anio);
        actualizarEstadoMeses(anio);
    }

});
