document.addEventListener("DOMContentLoaded", () => {

    // 🔐 Guard: este JS es SOLO para Pantalla 5
    const contenedor = document.getElementById("listadoDuros");
    if (!contenedor) {
        console.warn("Top Números Duros: pantalla no activa, JS detenido");
        return;
    }

    /* ===============================
       ESTADO INICIAL
       =============================== */
    let anioSeleccionado = new Date().getFullYear();
    let mesSeleccionado  = 0; // 0 = Todo el año

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
    mesActivo.textContent  = "Todos los meses";

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
            mesActivo.textContent = "Todos los meses";

            cargarMesesPorAnio(anioSeleccionado);
            cargarTopNumerosDuros(anioSeleccionado, mesSeleccionado);
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

                        cargarTopNumerosDuros(anioSeleccionado, mesSeleccionado);
                    });
                });
            })
            .catch(err => console.error("Error cargando meses:", err));
    }

    /* ===============================
       CLICK FUERA
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
       CARGAR TOP NÚMEROS DUROS
       =============================== */
    function cargarTopNumerosDuros(anio, mes) {

        fetch(`../api/top_numeros_duros.php?anio=${anio}&mes=${mes}`)
            .then(res => res.json())
            .then(data => {

                contenedor.innerHTML = `
                    <div class="titulos-duros">
                        <span>NÚMERO</span>
                        <span>NUM. DE DÍAS SIN JUGAR</span>
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

                    const numero = item.numero.toString().padStart(2, '0');

                    contenedor.innerHTML += `
                        <div class="fila-duro">
                            <span class="numero">
                                ${numero}
                                <img src="../assets/img/SUENOS_HN/${numero}-SUENO.png"
                                     onerror="this.style.display='none'">
                            </span>
                            <span class="dias">
                                ${item.dias_sin_jugar} DÍAS SIN JUGAR
                            </span>
                        </div>
                    `;
                });
            })
            .catch(err => console.error("Error cargando top números duros:", err));
    }

    /* ===============================
       INIT
       =============================== */
    cargarMesesPorAnio(anioSeleccionado);
    cargarTopNumerosDuros(anioSeleccionado, mesSeleccionado);
});
