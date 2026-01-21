<div class="mockup-container">
    <img src="../assets/img/Loto_loto.png" class="logo-mockup" alt="Loto">

    <?php include './includes/tabs.php'; ?>
    <?php
        $aniosDisponibles = obtenerAniosDisponibles($conn);
        $anioActual = date('Y');
    ?>

    <div class="contenido contenido-top-anio">

        <!-- SELECTOR AÑO -->
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

            <div class="descripcion-top">
                RESUMEN DE LOS NÚMEROS MÁS SORTEADOS DEL AÑO<br>
                Y EL NÚMERO DE VECES QUE JUGARON POR CADA MES.
            </div>
        </div>

        <!-- TABLA -->
        <div class="tabla-anio">

            <!-- CABECERA -->
            <div class="fila fila-head">
                <span>NÚMERO</span>
                <span>ENE</span><span>FEB</span><span>MAR</span><span>ABR</span>
                <span>MAY</span><span>JUN</span><span>JUL</span><span>AGO</span>
                <span>SEP</span><span>OCT</span><span>NOV</span><span>DIC</span>
                <span class="total">TOTAL</span>
            </div>

            <!-- FILAS -->
            <div class="fila">
                <span class="numero">11 <img src="../assets/img/SUENOS_HN/11-PERRO.png"></span>
                <span>4</span><span>3</span><span>4</span><span>4</span>
                <span>3</span><span>4</span><span>3</span><span>3</span>
                <span>4</span><span>4</span><span>3</span><span>4</span>
                <span class="total">43</span>
            </div>

            <div class="fila">
                <span class="numero">24 <img src="../assets/img/SUENOS_HN/24-SAPO.png"></span>
                <span>4</span><span>2</span><span>3</span><span>4</span>
                <span>2</span><span>3</span><span>4</span><span>2</span>
                <span>3</span><span>4</span><span>2</span><span>3</span>
                <span class="total">36</span>
            </div>

            <!-- Repetís filas según datos reales -->

        </div>

    </div>
</div>
