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
                <!-- NÚMERO (debe verse como TOTAL) -->
                <span class="col-numero">NÚMERO</span>

                <!-- MESES (solo visual, pasivos por defecto) -->
                <span data-mes="1">ENE</span>
                <span data-mes="2">FEB</span>
                <span data-mes="3">MAR</span>
                <span data-mes="4">ABR</span>
                <span data-mes="5">MAY</span>
                <span data-mes="6">JUN</span>
                <span data-mes="7">JUL</span>
                <span data-mes="8">AGO</span>
                <span data-mes="9">SEP</span>
                <span data-mes="10">OCT</span>
                <span data-mes="11">NOV</span>
                <span data-mes="12">DIC</span>

                <!-- TOTAL (siempre fuerte) -->
                <span class="total">TOTAL</span>
            </div>



            <!-- Repetís filas según datos reales -->

        </div>

    </div>
</div>
