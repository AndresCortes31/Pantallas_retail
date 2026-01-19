let anioActivo;
let mesActivo;

/* =========================
   CARGAR NÚMEROS DEL MES
========================= */
function cargarNumerosMes(anio, mes) {
    fetch(`../api/sorteos_mes.php?anio=${anio}&mes=${mes}`)
        .then(res => res.json())
        .then(data => {

            document.querySelectorAll('.circulo').forEach(c => {
                c.classList.remove('s1','s2','s3','s4');
            });

            data.forEach(item => {
                const numero = item.numero.padStart(2, '0');
                const veces  = parseInt(item.veces, 10);

                const el = Array.from(document.querySelectorAll('.circulo'))
                    .find(c => c.textContent === numero);

                if (!el) return;

                if (veces >= 4) el.classList.add('s4');
                else if (veces === 3) el.classList.add('s3');
                else if (veces === 2) el.classList.add('s2');
                else if (veces === 1) el.classList.add('s1');
            });
        });
}

/* =========================
   ACTUALIZAR MESES DISPONIBLES
========================= */
function actualizarMesesDisponibles(anio) {
    fetch(`../api/meses_por_anio.php?anio=${anio}`)
        .then(res => res.json())
        .then(mesesDisponibles => {

            // 🔥 FIX CLAVE: convertir a números
            mesesDisponibles = mesesDisponibles.map(m => parseInt(m, 10));

            document.querySelectorAll('.mes').forEach(mesEl => {
                const mes = parseInt(mesEl.dataset.mes, 10);

                mesEl.classList.remove('activo','disabled');

                if (!mesesDisponibles.includes(mes)) {
                    mesEl.classList.add('disabled');
                }
            });

            // Activar el primer mes disponible
            if (mesesDisponibles.length > 0) {
                mesActivo = mesesDisponibles[0];

                const el = document.querySelector(`.mes[data-mes="${mesActivo}"]`);
                if (el) {
                    el.classList.add('activo');
                    cargarNumerosMes(anioActivo, mesActivo);
                }
            }
        });
}

/* =========================
   INICIALIZACIÓN
========================= */
document.addEventListener('DOMContentLoaded', () => {

    anioActivo = parseInt(document.querySelector('.anio-activo').textContent, 10);

    actualizarMesesDisponibles(anioActivo);

    // Click en MESES
    document.querySelectorAll('.mes').forEach(m => {
        m.addEventListener('click', () => {
            if (m.classList.contains('disabled')) return;

            document.querySelectorAll('.mes').forEach(x => x.classList.remove('activo'));
            m.classList.add('activo');

            mesActivo = parseInt(m.dataset.mes, 10);
            cargarNumerosMes(anioActivo, mesActivo);
        });
    });

    // Click en AÑOS
    document.querySelectorAll('.anio-opciones div').forEach(a => {
        a.addEventListener('click', () => {
            anioActivo = parseInt(a.dataset.anio, 10);
            document.querySelector('.anio-activo').textContent = anioActivo;
            actualizarMesesDisponibles(anioActivo);
        });
    });
});
