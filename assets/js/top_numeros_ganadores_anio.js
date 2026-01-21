document.addEventListener("DOMContentLoaded", () => {

    const tabla = document.querySelector(".tabla-anio");

    /* ===============================
       MAPA DE IMÁGENES POR NÚMERO
       =============================== */
    function obtenerImagenNumero(numero) {
        // Formato 01, 02, 03...
        const numFormateado = numero.toString().padStart(2, "0");
        return `../assets/img/SUENOS_HN/${numFormateado}.png`;
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
                    <img src="${obtenerImagenNumero(row.numero)}"
                         alt="Sueño ${row.numero}"
                         onerror="this.style.display='none'">
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
            .catch(err => {
                console.error("Error cargando datos:", err);
            });
    }

    /* ===============================
       ESCUCHAR CAMBIO DE AÑO
       =============================== */
    document.addEventListener("anioCambiado", e => {
        cargarDatosPorAnio(e.detail.anio);
    });

    /* ===============================
       CARGA INICIAL
       =============================== */
    const anioInicial = document.querySelector(".anio-activo")?.textContent;
    if (anioInicial) {
        cargarDatosPorAnio(anioInicial);
    }

});
