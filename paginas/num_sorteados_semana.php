<div class="mockup-container">
    <img src="../assets/img/Loto_loto.png" class="logo-mockup" alt="Loto">

    <?php include './includes/tabs.php'; ?>

    <?php
        $aniosDisponibles = obtenerAniosDisponibles($conn);
        $anioActual = date('Y');
    ?>

    <div class="contenido contenido-calendario">

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
                    <span class="label-anio">SELECCIONÁ MES</span>
                    <div class="mes-dropdown">
                        <span class="mes-activo">Todos los meses</span>
                        <span class="flecha">&#9662;</span>
                    </div>

                    <div class="mes-opciones">
                        <!-- JS las llena -->
                    </div>
                </div>


                <div class="selector-dia">
                    <span class="label-anio">SELECCIONÁ DÍA</span>

                    <div class="dia-dropdown">
                        <span class="dia-activo">Lunes</span>
                        <span class="flecha">&#9662;</span>
                    </div>

                    <div class="dia-opciones">
                        <!-- JS las llena -->
                    </div>
                </div>


            </div>


            <!-- LISTADO -->
            <div class="listado-sorteos">

                <!-- TITULOS -->
                <div class="titulos">
                    <span>FECHA SORTEO</span>
                    <span>GANADOR 11:00 AM</span>
                    <span>GANADOR 3:00 PM</span>
                    <span>GANADOR 9:00 PM</span>
                </div>

                <!-- FILAS -->
                <div id="filasSemana">

                </div>
            </div>

        </div>

    </div>


</div>
