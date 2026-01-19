/* ======================================================
   NUMEROS SORTEADOS POR DIA DE SEMANA
   JS FINAL – ESTABLE Y FUNCIONAL
   ====================================================== */

/* ======================================================
   IMÁGENES DE SUEÑOS
   ====================================================== */
function diaEnEspanol(diaEN) {
    const mapa = {
        Monday: "Lunes",
        Tuesday: "Martes",
        Wednesday: "Miércoles",
        Thursday: "Jueves",
        Friday: "Viernes",
        Saturday: "Sábado",
        Sunday: "Domingo"
    };
    return mapa[diaEN] ?? diaEN;
}



function imagenSueno(numero) {
    if (numero === null || numero === undefined) return "";
    const key = numero.toString().padStart(2, "0");
    if (!MAPA_SUENOS[key]) return "";
    return `<img src="../assets/img/SUENOS_HN/${MAPA_SUENOS[key]}" alt="${key}">`;
}

/* ======================================================
   FORMATEAR FECHA
   ====================================================== */
function formatearFecha(fechaSQL) {
    const [y, m, d] = fechaSQL.split("-").map(Number);
    const f = new Date(y, m - 1, d); // LOCAL
    return f.toLocaleDateString("es-HN", {
        day: "numeric",
        month: "2-digit",
        year: "numeric"
    });
}



/* ======================================================
   FETCH + PINTAR TABLA
   ====================================================== */
function cargarResultados() {

    const anio = document.querySelector(".anio-activo")?.textContent;
    const mes  = document.querySelector(".mes-activo")?.dataset.mes;
    const dia  = document.querySelector(".dia-activo")?.dataset.dia;

    if (!anio || mes === undefined || !dia) return;

    fetch(`../api/num_sorteos_semana.php?anio=${anio}&mes=${mes}&dia=${dia}`)
        .then(r => {
            if (!r.ok) throw new Error(`HTTP ${r.status}`);
            return r.json();
        })
        .then(data => pintarTabla(data))
        .catch(err => {
            console.error("❌ Error cargando semana:", err);
            const contenedor = document.getElementById("filasSemana");
            contenedor.innerHTML = `
                <div class="fila">
                    <span class="fecha">ERROR AL CARGAR</span>
                    <span class="num">—</span>
                    <span class="num">—</span>
                    <span class="num">—</span>
                </div>
            `;
        });
}

function pintarTabla(data) {

    const contenedor = document.getElementById("filasSemana");
    contenedor.innerHTML = "";

    if (!data || !data.length) {
        contenedor.innerHTML = `
            <div class="fila">
                <span class="fecha">SIN RESULTADOS</span>
                <span class="num">—</span>
                <span class="num">—</span>
                <span class="num">—</span>
            </div>
        `;
        return;
    }

    data.forEach(row => {
        contenedor.innerHTML += `
            <div class="fila">
                <span class="fecha">
                    ${row.dia}<br>${formatearFecha(row.fecha)}
                </span>

                <span class="num">
                    <span class="valor">${row.ganador_11am}</span>
                    ${imagenSueno(row.ganador_11am)}
                </span>

                <span class="num">
                    <span class="valor">${row.ganador_3pm}</span>
                    ${imagenSueno(row.ganador_3pm)}
                </span>

                <span class="num">
                    <span class="valor">${row.ganador_9pm}</span>
                    ${imagenSueno(row.ganador_9pm)}
                </span>
            </div>
        `;
    });
}

/* ======================================================
   DOM READY
   ====================================================== */
document.addEventListener("DOMContentLoaded", () => {

    // REFERENCIAS
    const anioActivo   = document.querySelector(".anio-activo");
    const opcionesAnio = document.querySelectorAll(".anio-opciones div");

    const mesActivo   = document.querySelector(".mes-activo");
    const mesDropdown = document.querySelector(".mes-dropdown");
    const mesOpciones = document.querySelector(".mes-opciones");

    const diaActivo   = document.querySelector(".dia-activo");
    const diaDropdown = document.querySelector(".dia-dropdown");
    const diaOpciones = document.querySelector(".dia-opciones");

    if (!anioActivo || !mesActivo || !diaActivo) {
        //console.error("❌ Selectores no encontrados");
        return;
    }

    const hoy = new Date();
    const anioActual = hoy.getFullYear();
    const mesActual  = hoy.getMonth() + 1;

    const meses = [
        { id: 0, nombre: "Todos los meses" },
        { id: 1, nombre: "Enero" },
        { id: 2, nombre: "Febrero" },
        { id: 3, nombre: "Marzo" },
        { id: 4, nombre: "Abril" },
        { id: 5, nombre: "Mayo" },
        { id: 6, nombre: "Junio" },
        { id: 7, nombre: "Julio" },
        { id: 8, nombre: "Agosto" },
        { id: 9, nombre: "Septiembre" },
        { id: 10, nombre: "Octubre" },
        { id: 11, nombre: "Noviembre" },
        { id: 12, nombre: "Diciembre" }
    ];

    const dias = [
        { id: "Monday", nombre: "Lunes" },
        { id: "Tuesday", nombre: "Martes" },
        { id: "Wednesday", nombre: "Miércoles" },
        { id: "Thursday", nombre: "Jueves" },
        { id: "Friday", nombre: "Viernes" },
        { id: "Saturday", nombre: "Sábado" },
        { id: "Sunday", nombre: "Domingo" }
    ];

    // DROPDOWNS
    mesDropdown.addEventListener("click", e => {
        e.stopPropagation();
        mesOpciones.style.display = "block";
    });

    diaDropdown.addEventListener("click", e => {
        e.stopPropagation();
        diaOpciones.style.display = "block";
    });

    document.addEventListener("click", () => {
        mesOpciones.style.display = "none";
        diaOpciones.style.display = "none";
    });

    // MESES
    function cargarMeses(anio) {
        mesOpciones.innerHTML = "";
        meses.forEach(mes => {
            if (anio == anioActual && mes.id > mesActual) return;
            const div = document.createElement("div");
            div.textContent = mes.nombre;
            div.dataset.mes = mes.id;
            div.onclick = () => {
                mesActivo.textContent = mes.nombre;
                mesActivo.dataset.mes = mes.id;
                mesOpciones.style.display = "none";
                cargarResultados();
            };
            mesOpciones.appendChild(div);
        });
        mesActivo.textContent = "Todos los meses";
        mesActivo.dataset.mes = 0;
    }

    // DÍAS
    function cargarDias() {
        diaOpciones.innerHTML = "";
        dias.forEach(dia => {
            const div = document.createElement("div");
            div.textContent = dia.nombre;
            div.dataset.dia = dia.id;
            div.onclick = () => {
                diaActivo.textContent = dia.nombre;
                diaActivo.dataset.dia = dia.id;
                diaOpciones.style.display = "none";
                cargarResultados();
            };
            diaOpciones.appendChild(div);
        });
        diaActivo.textContent = "Lunes";
        diaActivo.dataset.dia = "Monday";
    }

    // AÑO
    opcionesAnio.forEach(op => {
        op.onclick = () => {
            anioActivo.textContent = op.dataset.anio;
            cargarMeses(op.dataset.anio);
            cargarResultados();
        };
    });

    // INIT
    cargarMeses(anioActivo.textContent);
    cargarDias();
    cargarResultados();
});
