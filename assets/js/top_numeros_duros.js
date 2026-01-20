document.addEventListener("DOMContentLoaded", () => {

    // 🔐 Guard clause – solo Pantalla 5
    const contenedor = document.querySelector(".listado-duros");
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
       ESTADO INICIAL VISUAL
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

            // reset mes
            mesSeleccionado = 0;
            mesActivo.textContent = "Todos los meses";

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

    const meses = [
        { id: 0,  nombre: "Todos los meses" },
        { id: 1,  nombre: "Enero" },
        { id: 2,  nombre: "Febrero" },
        { id: 3,  nombre: "Marzo" },
        { id: 4,  nombre: "Abril" },
        { id: 5,  nombre: "Mayo" },
        { id: 6,  nombre: "Junio" },
        { id: 7,  nombre: "Julio" },
        { id: 8,  nombre: "Agosto" },
        { id: 9,  nombre: "Septiembre" },
        { id: 10, nombre: "Octubre" },
        { id: 11, nombre: "Noviembre" },
        { id: 12, nombre: "Diciembre" }
    ];

    mesOpciones.innerHTML = "";
    meses.forEach(m => {
        const div = document.createElement("div");
        div.dataset.mes = m.id;
        div.textContent = m.nombre;

        div.addEventListener("click", () => {
            mesSeleccionado = m.id;
            mesActivo.textContent = m.nombre;
            mesOpciones.classList.remove("open");

            console.log("Año:", anioSeleccionado, "Mes:", mesSeleccionado);
        });

        mesOpciones.appendChild(div);
    });

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

});
