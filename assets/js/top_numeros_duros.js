document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       REFERENCIAS DOM
       ===================================================== */
    const anioActivo   = document.querySelector(".anio-activo");
    const anioDropdown = document.querySelector(".anio-dropdown");
    const anioOpciones = document.querySelector(".anio-opciones");

    const mesActivo   = document.querySelector(".mes-activo");
    const mesDropdown = document.querySelector(".mes-dropdown");
    const mesOpciones = document.querySelector(".mes-opciones");

    if (!anioActivo || !anioDropdown || !anioOpciones ||
        !mesActivo  || !mesDropdown  || !mesOpciones) {
        console.warn("Top números duros: selectores no presentes");
        return;
    }

    /* =====================================================
       ESTADO
       ===================================================== */
    const estado = {
        anio: parseInt(anioActivo.textContent, 10),
        mes: 0
    };

    /* =====================================================
       DATA MESES (ÚNICO DATO EN JS)
       ===================================================== */
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

    /* =====================================================
       UTILIDADES
       ===================================================== */
    function cerrarDropdowns() {
        anioOpciones.style.display = "none";
        mesOpciones.style.display  = "none";
    }

    /* =====================================================
       DROPDOWN AÑO (DINÁMICO DESDE PHP)
       ===================================================== */
    anioDropdown.addEventListener("click", e => {
        e.stopPropagation();
        cerrarDropdowns();
        anioOpciones.style.display = "block";
    });

    anioOpciones.querySelectorAll("div").forEach(div => {
        div.addEventListener("click", () => {
            estado.anio = parseInt(div.dataset.anio, 10);
            anioActivo.textContent = div.dataset.anio;

            cerrarDropdowns();
            cargarMeses();

            console.log("📅 Año seleccionado:", estado.anio);
            // 👉 aquí luego llamamos al fetch
        });
    });

    /* =====================================================
       DROPDOWN MES
       ===================================================== */
    mesDropdown.addEventListener("click", e => {
        e.stopPropagation();
        cerrarDropdowns();
        mesOpciones.style.display = "block";
    });

    function cargarMeses() {
        mesOpciones.innerHTML = "";

        meses.forEach(m => {
            const div = document.createElement("div");
            div.textContent = m.nombre;
            div.dataset.mes = m.id;

            div.addEventListener("click", () => {
                estado.mes = m.id;
                mesActivo.textContent = m.nombre;
                mesActivo.dataset.mes = m.id;

                cerrarDropdowns();

                console.log("📆 Mes seleccionado:", estado.mes);
                // 👉 aquí luego llamamos al fetch
            });

            mesOpciones.appendChild(div);
        });

        // reset por defecto
        estado.mes = 0;
        mesActivo.textContent = "Todos los meses";
        mesActivo.dataset.mes = 0;
    }

    /* =====================================================
       CLICK FUERA
       ===================================================== */
    document.addEventListener("click", cerrarDropdowns);

    /* =====================================================
       INIT
       ===================================================== */
    cargarMeses();

});
