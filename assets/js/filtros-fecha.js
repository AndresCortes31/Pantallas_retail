document.addEventListener("DOMContentLoaded", () => {

    /* ===============================
       SELECTOR DE AÑO
       =============================== */

    const dropdown = document.querySelector(".anio-dropdown");
    const opciones = document.querySelector(".anio-opciones");
    const anioActivoSpan = document.querySelector(".anio-activo");

    if (dropdown && opciones && anioActivoSpan) {

        dropdown.addEventListener("click", (e) => {
            e.stopPropagation();
            opciones.style.display =
                opciones.style.display === "block" ? "none" : "block";
        });

        opciones.querySelectorAll("div").forEach(opcion => {
            opcion.addEventListener("click", () => {

                const nuevoAnio = parseInt(opcion.textContent, 10);

                anioActivoSpan.textContent = nuevoAnio;
                opciones.style.display = "none";

                if (typeof generarCalendario === "function") {
                    window.anioActivoGlobal = nuevoAnio;
                    generarCalendario(window.mesActivo, window.anioActivoGlobal);
                }
            });
        });

        document.addEventListener("click", () => {
            opciones.style.display = "none";
        });
    }

    /* ===============================
       SELECTOR DE MES
       =============================== */

    const mesDropdown = document.querySelector(".mes-dropdown");
    const mesOpciones = document.querySelector(".mes-opciones");
    const mesActivoSpan = document.querySelector(".mes-activo");

    if (mesDropdown && mesOpciones && mesActivoSpan) {

        mesDropdown.addEventListener("click", (e) => {
            e.stopPropagation();
            mesOpciones.style.display =
                mesOpciones.style.display === "block" ? "none" : "block";
        });

        mesOpciones.querySelectorAll("div").forEach(opcion => {
            opcion.addEventListener("click", () => {

                const nuevoMes = parseInt(opcion.dataset.mes, 10);

                mesActivoSpan.textContent = opcion.textContent;
                mesOpciones.style.display = "none";

                window.mesActivo = nuevoMes;

                if (typeof generarCalendario === "function") {
                    generarCalendario(window.mesActivo, window.anioActivoGlobal);
                }
            });
        });
    }

});
