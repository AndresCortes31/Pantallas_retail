document.addEventListener("DOMContentLoaded", () => {

    /* ===============================
       GUARD CLAUSE – SOLO PANTALLA 5
       =============================== */
    const contenedor = document.getElementById("listadoDuros");
    if (!contenedor) {
        console.warn("Top Números Duros: pantalla no activa");
        return;
    }

    /* ===============================
       ESTADO
       =============================== */
    let anioSeleccionado = new Date().getFullYear();
    let mesSeleccionado  = 0; // 0 = Todos

    /* ===============================
       DOM
       =============================== */
    const selectorAnio  = document.querySelector(".selector-anio");
    const anioDropdown  = document.querySelector(".anio-dropdown");
    const anioOpciones  = document.querySelector(".anio-opciones");
    const anioActivo    = document.querySelector(".anio-activo");

    const selectorMes   = document.querySelector(".selector-mes");
    const mesDropdown   = document.querySelector(".mes-dropdown");
    const mesOpciones   = document.querySelector(".mes-opciones");
    const mesActivo     = document.querySelector(".mes-activo");

    /* ===============================
       ESTADO VISUAL INICIAL
       =============================== */
    anioActivo.textContent = anioSeleccionado;
    mesActivo.textContent  = "Todos los meses";

    /* ===============================
       SELECTOR AÑO
       =============================== */
    anioDropdown.addEventListener("click", e => {
        e.stopPropagation();
        anioOpciones.classList.toggle("open");
        mesOpciones.classList.remove("open");
    });

    anioOpciones.querySelectorAll("div").forEach(opcion => {
        opcion.addEventListener("click", () => {

            anioSeleccionado = parseInt(opcion.dataset.anio, 10);
            anioActivo.textContent = anioSeleccionado;
            anioOpciones.classList.remove("open");

            // Reset mes
            mesSeleccionado = 0;
            mesActivo.textContent = "Todos los meses";

            cargarMesesPorAnio(anioSeleccionado);

            console.log("Año:", anioSeleccionado, "Mes:", mesSeleccionado);
        });
    });

    /* ===============================
       SELECTOR MES
       =============================== */
    mesDropdown.addEventListener("click", e => {
        e.stopPropagation();
        mesOpciones.classList.toggle("open");
        anioOpciones.classList.remove("open");
    });

    /* ===============================
       CARGAR MESES (MISMA LÓGICA P4)
       =============================== */
    function cargarMesesPorAnio(anio) {

        fetch(`../api/meses_por_anio.php?anio=${anio}`)
            .then(res => res.json())
            .then(meses => {

                const nombresMeses = [
                    "", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
                    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
                ];

                mesOpciones.innerHTML = `<div data-mes="0">Todos los meses</div>`;

                meses.forEach(mes => {
                    mesOpciones.innerHTML += `
                        <div data-mes="${mes}">
                            ${nombresMeses[mes]}
                        </div>
                    `;
                });

                mesOpciones.querySelectorAll("div").forEach(opcion => {
                    opcion.addEventListener("click", () => {
                        mesSeleccionado = parseInt(opcion.dataset.mes, 10);
                        mesActivo.textContent = opcion.textContent;
                        mesOpciones.classList.remove("open");

                        console.log("Año:", anioSeleccionado, "Mes:", mesSeleccionado);
                    });
                });
            })
            .catch(err => console.error("Error cargando meses:", err));
    }

    /* ===============================
       CLICK FUERA
       =============================== */
    document.addEventListener("click", e => {
        if (!selectorAnio.contains(e.target)) {
            anioOpciones.classList.remove("open");
        }
        if (!selectorMes.contains(e.target)) {
            mesOpciones.classList.remove("open");
        }
    });

    /* ===============================
       INIT
       =============================== */
    cargarMesesPorAnio(anioSeleccionado);

});
