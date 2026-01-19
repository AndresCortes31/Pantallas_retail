<div class="mockup-container">
    <img src="../assets/img/Loto_loto.png" class="logo-mockup" alt="Loto">

    <?php include './includes/tabs.php'; ?>

    <?php
        $aniosDisponibles = obtenerAniosDisponibles($conn);
        $anioActual = date('Y');
    ?>

    <!-- CONTENIDO -->
    <div class="contenido contenido-calendario">

        <!-- BLOQUE IZQUIERDO -->
        <div class="cal-izq">

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
                    <span class="label">SELECCIONÁ MES</span>

                    <div class="select-box mes-dropdown">
                        <span class="mes-activo">Enero</span>
                        <span class="flecha">▼</span>
                    </div>

                    <div class="mes-opciones">
                        <div data-mes="0">Enero</div>
                        <div data-mes="1">Febrero</div>
                        <div data-mes="2">Marzo</div>
                        <div data-mes="3">Abril</div>
                        <div data-mes="4">Mayo</div>
                        <div data-mes="5">Junio</div>
                        <div data-mes="6">Julio</div>
                        <div data-mes="7">Agosto</div>
                        <div data-mes="8">Septiembre</div>
                        <div data-mes="9">Octubre</div>
                        <div data-mes="10">Noviembre</div>
                        <div data-mes="11">Diciembre</div>
                    </div>
                </div>
            </div>

            <!-- CALENDARIO -->
            <div class="calendario">
                <div class="dias-semana">
                    <span>DOM</span><span>LUN</span><span>MAR</span>
                    <span>MIE</span><span>JUE</span><span>VIE</span><span>SAB</span>
                </div>

                <div class="dias-mes" id="dias-mes">
                    
                </div>
            </div>

        </div>

        <!-- BLOQUE DERECHO -->
        <div class="cal-der">

            <div class="sorteo" data-hora="10">
                <h3>SORTEO 11:00 A.M.</h3>
                <div class="bolas">
                </div>
            </div>

            <div class="sorteo" data-hora="14">
                <h3>SORTEO 3:00 P.M.</h3>
                <div class="bolas">
                </div>
            </div>

            <div class="sorteo" data-hora="20">
                <h3>SORTEO 9:00 P.M.</h3>
                <div class="bolas">
                </div>
            </div>

        </div>

    </div>
</div>
