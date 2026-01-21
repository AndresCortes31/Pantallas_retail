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

        // Limpiar filas anteriores (excepto cabecera)
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
       CARGAR DATOS POR AÑO
       =============================== */
    function cargarDatosPorAnio(anio) {
        fetch(`../api/top_numeros_ganadores_anio.php?anio=${anio}`)
            .then(res => res.json())
            .then(data => pintarTabla(data))
            .catch(err => console.error("❌ Error cargando datos:", err));
    }

    /* ===============================
       SELECTOR DE AÑO (LOCAL)
       =============================== */
    document.querySelectorAll(".anio-opciones div").forEach(opcion => {
        opcion.addEventListener("click", () => {

            const anio = opcion.dataset.anio;

            // Actualizar texto visible
            anioActivo.textContent = anio;

            // Cerrar dropdown
            document.querySelector(".anio-opciones").classList.remove("open");

            // Cargar datos
            cargarDatosPorAnio(anio);
        });
    });

    /* ===============================
       CARGA INICIAL
       =============================== */
    if (anioActivo?.textContent) {
        cargarDatosPorAnio(anioActivo.textContent);
    }

});
