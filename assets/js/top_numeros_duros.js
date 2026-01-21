document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       GUARD CLAUSE
       ===================================================== */
    const contenedor = document.getElementById("listadoDuros");
    if (!contenedor) {
        console.warn("Top Números Duros: pantalla no activa");
        return;
    }

    /* =====================================================
       ESTADO
       ===================================================== */
    let anioSeleccionado = new Date().getFullYear();
    let mesSeleccionado  = 0; // 0 = todos

    /* =====================================================
       REFERENCIAS DOM
       ===================================================== */
    const selectorAnio  = document.querySelector(".selector-anio");
    const anioDropdown  = document.querySelector(".anio-dropdown");
    const anioOpciones  = document.querySelector(".anio-opciones");
    const anioActivo    = document.querySelector(".anio-activo");

    const selectorMes   = document.querySelector(".selector-mes");
    const mesDropdown   = document.querySelector(".mes-dropdown");
    const mesOpciones   = document.querySelector(".mes-opciones");
    const mesActivo     = document.querySelector(".mes-activo");

    anioActivo.textContent = anioSeleccionado;
    mesActivo.textContent  = "Todos los meses";

    /* =====================================================
       SELECTOR AÑO
       ===================================================== */
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

            // reset mes
            mesSeleccionado = 0;
            mesActivo.textContent = "Todos los meses";
            mesActivo.dataset.mes = 0;

            cargarMesesPorAnio(anioSeleccionado);
            cargarTopNumerosDuros();
        });
    });

    /* =====================================================
       SELECTOR MES
       ===================================================== */
    mesDropdown.addEventListener("click", e => {
        e.stopPropagation();
        mesOpciones.classList.toggle("open");
        anioOpciones.classList.remove("open");
    });

    /* =====================================================
       CARGAR MESES DESDE API
       ===================================================== */
    function cargarMesesPorAnio(anio) {

        fetch(`../api/meses_por_anio.php?anio=${anio}`)
            .then(r => r.json())
            .then(meses => {

                const nombres = [
                    "", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
                    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
                ];

                mesOpciones.innerHTML = `<div data-mes="0">Todos los meses</div>`;

                meses.forEach(mes => {
                    mesOpciones.innerHTML += `
                        <div data-mes="${mes}">
                            ${nombres[mes]}
                        </div>
                    `;
                });

                mesOpciones.querySelectorAll("div").forEach(op => {
                    op.addEventListener("click", () => {
                        mesSeleccionado = parseInt(op.dataset.mes, 10);
                        mesActivo.textContent = op.textContent;
                        mesActivo.dataset.mes = mesSeleccionado;
                        mesOpciones.classList.remove("open");

                        cargarTopNumerosDuros();
                    });
                });
            })
            .catch(err => console.error("❌ Error meses:", err));
    }

    /* =====================================================
       CARGAR TOP NÚMEROS DUROS
       ===================================================== */

       /* ======================================================
   IMÁGENES DE SUEÑOS – TOP NÚMEROS DUROS
   ====================================================== */
function imagenSueno(numero) {

    if (numero === null || numero === undefined) return "";

    const key = numero.toString().padStart(2, "0");

    // Validar que exista en el mapa
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

    function cargarTopNumerosDuros() {

        fetch(`../api/top_numeros_duros.php?anio=${anioSeleccionado}&mes=${mesSeleccionado}`)
            .then(r => r.json())
            .then(data => {

                contenedor.innerHTML = `
                    <div class="titulos-duros">
                        <span>NÚMERO</span>
                        <span>NUM. DE DÍAS SIN JUGAR</span>
                    </div>
                `;

                if (!data || !data.length) {
                    contenedor.innerHTML += `
                        <p style="text-align:center;margin-top:20px">
                            Sin datos para este período
                        </p>
                    `;
                    return;
                }

                data.forEach(item => {

                    const numero = item.numero.toString().padStart(2, "0");

                    contenedor.innerHTML += `
                        <div class="fila-duro">
                            <span class="numero">
                                ${numero}
                                ${imagenSueno(numero)}
                            </span>
                            <span class="dias">
                                ${item.dias_sin_jugar} DÍAS SIN JUGAR
                            </span>
                        </div>
                    `;
                });
            })
            .catch(err => console.error("❌ Error top números duros:", err));
    }

    /* =====================================================
       CLICK FUERA → CERRAR DROPDOWNS
       ===================================================== */
    document.addEventListener("click", e => {
        if (selectorAnio && !selectorAnio.contains(e.target)) {
            anioOpciones.classList.remove("open");
        }
        if (selectorMes && !selectorMes.contains(e.target)) {
            mesOpciones.classList.remove("open");
        }
    });

    /* =====================================================
       INIT
       ===================================================== */
    cargarMesesPorAnio(anioSeleccionado);
    cargarTopNumerosDuros();

});
