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
            <div class="filtros-semana">

                <!-- AÑO -->
                <div class="filtro-anio">
                    <span class="filtro-label">SELECCIONÁ AÑO</span>
                    <div class="selector-anio">
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
                </div>

                <!-- MES + DÍA -->
                <div class="filtros-secundarios">

                    <div class="filtro">
                        <span class="filtro-label">SELECCIONÁ MES</span>
                        <div class="selector-mes">
                            <div class="mes-dropdown">
                                <span class="mes-activo">Todos los meses</span>
                                <span class="flecha">&#9662;</span>
                            </div>
                            <div class="mes-opciones"></div>
                        </div>
                    </div>

                    <div class="filtro">
                        <span class="filtro-label">SELECCIONÁ DÍA</span>
                        <div class="selector-dia">
                            <div class="dia-dropdown">
                                <span class="dia-activo">Lunes</span>
                                <span class="flecha">&#9662;</span>
                            </div>
                            <div class="dia-opciones"></div>
                        </div>
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
