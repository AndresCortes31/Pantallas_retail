<div class="mockup-container">
    <img src="../assets/img/Loto_loto.png" class="logo-mockup" alt="Loto">

    <?php include './includes/tabs.php'; ?>
    <?php
        $aniosDisponibles = obtenerAniosDisponibles($conn);
        $anioActual = date('Y');
    ?>


    <!-- CONTENIDO -->
    <div class="contenido">

        <!-- COLUMNA IZQUIERDA -->
        <div class="col-izq">
            <div class="frame-izq">

                <div class="frame-header">
                    <img src="../assets/img/Diaria.webp" class="logo-diaria">
                </div>

                <h2>NÚMEROS<br>SORTEADOS<br>DEL MES</h2>

                <ul class="leyenda">
                    <li><span class="dot s1"></span> SORTEADO 1 VEZ</li>
                    <li><span class="dot s2"></span> SORTEADO 2 VECES</li>
                    <li><span class="dot s3"></span> SORTEADO 3 VECES</li>
                    <li><span class="dot s4"></span> SORTEADO 4+ VECES</li>
                </ul>

            </div>
        </div>

        <!-- COLUMNA DERECHA -->
        <div class="col-der">

            <!-- SELECTOR AÑO Y MES -->
            <div class="filtros-fecha">

                <!-- AÑO -->
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

                <!-- MESES -->
                <div class="meses">
                    <span class="mes" data-mes="1">ENERO</span>
                    <span class="mes" data-mes="2">FEBRERO</span>
                    <span class="mes" data-mes="3">MARZO</span>
                    <span class="mes" data-mes="4">ABRIL</span>
                    <span class="mes" data-mes="5">MAYO</span>
                    <span class="mes" data-mes="6">JUNIO</span>
                    <span class="mes" data-mes="7">JULIO</span>
                    <span class="mes" data-mes="8">AGOSTO</span>
                    <span class="mes" data-mes="9">SEPTIEMBRE</span>
                    <span class="mes" data-mes="10">OCTUBRE</span>
                    <span class="mes" data-mes="11">NOVIEMBRE</span>
                    <span class="mes" data-mes="12">DICIEMBRE</span>
                </div>

            </div>

            <div class="grid-circulos">
                <?php
                for ($i = 0; $i <= 99; $i++) {
                    echo '<div class="circulo">' . str_pad($i, 2, '0', STR_PAD_LEFT) . '</div>';
                }
                ?>
            </div>
        </div>

    </div>
</div>

