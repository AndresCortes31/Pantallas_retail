document.addEventListener("DOMContentLoaded", () => {

    // 🔐 GUARD CLAUSE: este JS es SOLO para Top Líneas
    const contenedor = document.getElementById("listadoLineas");
    if (!contenedor) {
        console.warn("Top Líneas: pantalla no activa, JS detenido");
        return;
    }

    /* ===============================
       ESTADO INICIAL
       =============================== */
    let anioSeleccionado = new Date().getFullYear();
    let mesSeleccionado  = 0; // 0 = Todos

    /* ===============================
       REFERENCIAS DOM
       =============================== */
    const selectorAnio  = document.querySelector(".selector-anio");
    const anioDropdown  = document.querySelector(".anio-dropdown");
    const anioOpciones  = document.querySelector(".anio-opciones");
    const anioActivo    = document.querySelector(".anio-activo");

    const selectorMes   = document.querySelector(".selector-mes");
    const mesDropdown   = document.querySelector(".mes-dropdown");
    const mesOpciones   = document.querySelector(".mes-opciones");
    const mesActivo     = document.querySelector(".mes-activo");

    // Estado visual inicial
    anioActivo.textContent = anioSeleccionado;
    mesActivo.textContent  = "Todos";

    /* ===============================
       SELECTOR AÑO
       =============================== */
    anioDropdown.addEventListener("click", (e) => {
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
            mesActivo.textContent = "Todos";

            cargarMesesPorAnio(anioSeleccionado);
            cargarTopLineas(anioSeleccionado, mesSeleccionado);
        });
    });

    /* ===============================
       SELECTOR MES
       =============================== */
    mesDropdown.addEventListener("click", (e) => {
        e.stopPropagation();
        mesOpciones.classList.toggle("open");
        anioOpciones.classList.remove("open");
    });

    /* ===============================
       CARGAR MESES POR AÑO
       =============================== */
    function cargarMesesPorAnio(anio) {

        fetch(`../api/meses_por_anio.php?anio=${anio}`)
            .then(res => res.json())
            .then(meses => {

                const nombresMeses = [
                    "", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
                    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
                ];

                mesOpciones.innerHTML = `<div data-mes="0">Todos</div>`;

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

                        cargarTopLineas(anioSeleccionado, mesSeleccionado);
                    });
                });
            })
            .catch(err => console.error("Error cargando meses:", err));
    }

    /* ===============================
       CLICK FUERA (CERRAR DROPDOWNS)
       =============================== */
    document.addEventListener("click", (e) => {
        if (selectorAnio && !selectorAnio.contains(e.target)) {
            anioOpciones.classList.remove("open");
        }
        if (selectorMes && !selectorMes.contains(e.target)) {
            mesOpciones.classList.remove("open");
        }
    });

    /* ===============================
       CARGA INICIAL
       =============================== */
    cargarMesesPorAnio(anioSeleccionado);
    cargarTopLineas(anioSeleccionado, mesSeleccionado);
});


/* ===============================
   CARGAR TOP LÍNEAS
   =============================== */
function cargarTopLineas(anio, mes) {

    fetch(`../api/lineas_ganadoras.php?anio=${anio}&mes=${mes}`)
        .then(res => res.json())
        .then(data => {

            const contenedor = document.getElementById("listadoLineas");
            if (!contenedor) return;

            contenedor.innerHTML = `
                <div class="titulos-lineas">
                    <span>LÍNEA</span>
                    <span>NUM. DE VECES SORTEADA</span>
                </div>
            `;

            if (!Array.isArray(data) || data.length === 0) {
                contenedor.innerHTML += `
                    <p style="text-align:center; margin-top:20px;">
                        Sin datos para este período
                    </p>
                `;
                return;
            }

            data.forEach(item => {
                contenedor.innerHTML += `
                    <div class="fila-linea">
                        <span class="linea">LÍNEA DEL ${item.linea}</span>
                        <span class="valor">${item.total}</span>
                    </div>
                `;
            });
        })
        .catch(err => console.error("Error cargando top líneas:", err));
}
