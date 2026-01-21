document.addEventListener("DOMContentLoaded", () => {

    const hoy = new Date();
    const anioActual = hoy.getFullYear();
    const mesActual = hoy.getMonth() + 1; // 1 = enero

    const anioSeleccionado = parseInt(
        document.querySelector(".anio-activo")?.textContent || 0
    );

    // Solo efecto visual si es el año actual
    if (anioSeleccionado === anioActual) {
        const mesHeader = document.querySelector(
            `.fila-head span[data-mes="${mesActual}"]`
        );

        if (mesHeader) {
            mesHeader.classList.add("mes-activo");
        }
    }

});
