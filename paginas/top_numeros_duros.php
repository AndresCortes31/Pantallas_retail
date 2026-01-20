<div class="mockup-container">
    <img src="../assets/img/Loto_loto.png" class="logo-mockup" alt="Loto">

    <?php include './includes/tabs.php'; ?>

    <?php
        $aniosDisponibles = obtenerAniosDisponibles($conn);
        $anioActual = date('Y');
    ?>

    <div class="contenido contenido-top-duros">

        <!-- SELECTORES -->
            <!-- SELECTORES -->
            <div class="selectores">

                <div class="selector-anio">
                    <span class="label-anio">SELECCIONÁ AÑO</span>
                    <div class="anio-dropdown">
                        <span class="anio-activo"><?= $anioActual ?></span>
                        <span class="flecha">&#9662;</span>
                    </div>

                    <div class="anio-opciones">
                        <?php foreach ($aniosDisponibles as $anio): ?>
                            <div data-anio="<?= $anio ?>"><?= $anio ?></div>
                        <?php endforeach; ?>
                    </div>
                </div>

                <div class="selector-mes">
                    <span class="label-anio">SELECCIONÁ MES</span>
                    <div class="mes-dropdown">
                        <span class="mes-activo">Todos los meses</span>
                        <span class="flecha">&#9662;</span>
                    </div>

                    <!-- 👇 ESTO ES CLAVE -->
                    <div class="mes-opciones">
                        <!-- JS las llena -->
                    </div>
                </div>
            </div>

        <!-- LISTADO -->
        <div class="listado-duros">

            <!-- TITULOS -->
            <div class="titulos-duros">
                <span>NÚMERO</span>
                <span>NUM. DE DÍAS SIN JUGAR</span>
            </div>

            <!-- FILAS -->
            <div class="fila-duro">
                <span class="numero">11 <img src="../assets/img/SUENOS_HN/11-PERRO.png"></span>
                <span class="dias">102 DÍAS SIN JUGAR</span>
            </div>

            <div class="fila-duro">
                <span class="numero">24 <img src="../assets/img/SUENOS_HN/24-SAPO.png"></span>
                <span class="dias">98 DÍAS SIN JUGAR</span>
            </div>

            <div class="fila-duro">
                <span class="numero">30 <img src="../assets/img/SUENOS_HN/30-BOLO.png"></span>
                <span class="dias">86 DÍAS SIN JUGAR</span>
            </div>

            <div class="fila-duro">
                <span class="numero">54 <img src="../assets/img/SUENOS_HN/54-LICOR.png"></span>
                <span class="dias">83 DÍAS SIN JUGAR</span>
            </div>

            <div class="fila-duro">
                <span class="numero">77 <img src="../assets/img/SUENOS_HN/77-HUMO.png"></span>
                <span class="dias">79 DÍAS SIN JUGAR</span>
            </div>

            <div class="fila-duro">
                <span class="numero">70 <img src="../assets/img/SUENOS_HN/70-ORO.png"></span>
                <span class="dias">75 DÍAS SIN JUGAR</span>
            </div>

            <div class="fila-duro">
                <span class="numero">36 <img src="../assets/img/SUENOS_HN/36-VIEJITA.png"></span>
                <span class="dias">69 DÍAS SIN JUGAR</span>
            </div>

            <div class="fila-duro">
                <span class="numero">94 <img src="../assets/img/SUENOS_HN/94-CARRO.png"></span>
                <span class="dias">50 DÍAS SIN JUGAR</span>
            </div>

            <div class="fila-duro">
                <span class="numero">19 <img src="../assets/img/SUENOS_HN/19-MARIPOSA.png"></span>
                <span class="dias">48 DÍAS SIN JUGAR</span>
            </div>

            <div class="fila-duro">
                <span class="numero">02 <img src="../assets/img/SUENOS_HN/02-MUJER.png"></span>
                <span class="dias">37 DÍAS SIN JUGAR</span>
            </div>

        </div>

    </div>
</div>
