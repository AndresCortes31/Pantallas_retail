/* =========================
   ESTADO GLOBAL (window)
========================= */
window.mesActivo = 0;   // 0 = Enero
window.anioActivoGlobal = new Date().getFullYear();
window.diaActivo = null;

let diasMesCont;

/* =========================
   UTILIDADES
========================= */
function diasEnMes(mes, anio) {
    return new Date(anio, mes + 1, 0).getDate();
}

function primerDiaSemana(mes, anio) {
    return new Date(anio, mes, 1).getDay(); // 0 = Domingo
}

/* =========================
   REGLA 3
   Día automático
========================= */
function calcularDiaAutomatico(mes, anio) {
    const hoy = new Date();

    // Si es mes y año actual → hoy
    if (
        hoy.getFullYear() === anio &&
        hoy.getMonth() === mes
    ) {
        return hoy.getDate();
    }

    // Si no → último día del mes
    return diasEnMes(mes, anio);
}

/* =========================
   GENERAR CALENDARIO
========================= */
function generarCalendario(mes, anio) {

    if (!diasMesCont) return;

    diasMesCont.innerHTML = '';
    window.diaActivo = null;

    const totalDias = diasEnMes(mes, anio);
    const inicio = primerDiaSemana(mes, anio);

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    // 👉 Regla 3
    const diaAuto = calcularDiaAutomatico(mes, anio);
    window.diaActivo = diaAuto;

    // Espacios vacíos iniciales
    for (let i = 0; i < inicio; i++) {
        diasMesCont.innerHTML += `<span></span>`;
    }

    // Días del mes
    for (let d = 1; d <= totalDias; d++) {

        const span = document.createElement('span');
        span.textContent = d.toString().padStart(2, '0');

        const fechaDia = new Date(anio, mes, d);
        fechaDia.setHours(0, 0, 0, 0);

        /* =========================
           REGLA 1 – Bloquear futuros
        ========================= */
        if (fechaDia > hoy) {
            span.classList.add('dia-deshabilitado');
        } else {

            span.addEventListener('click', () => {
                document
                    .querySelectorAll('.dias-mes span')
                    .forEach(s => s.classList.remove('dia-activo'));

                span.classList.add('dia-activo');
                window.diaActivo = d;

                // 🔥 CARGAR RESULTADOS
                if (typeof cargarResultadosAnteriores === "function") {
                    cargarResultadosAnteriores();
                }
            });


            // Marcar día automático
            if (d === diaAuto) {
                span.classList.add('dia-activo');
            }
        }

        diasMesCont.appendChild(span);
    }

    // 🔥 Cargar resultados iniciales
    if (typeof cargarResultadosAnteriores === "function") {
        cargarResultadosAnteriores();
    }
}

/* =========================
   INIT
========================= */
document.addEventListener('DOMContentLoaded', () => {
    diasMesCont = document.getElementById('dias-mes');
    generarCalendario(window.mesActivo, window.anioActivoGlobal);
});
