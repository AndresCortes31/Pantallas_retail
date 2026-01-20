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
        <div class="listado-duros" id="listadoDuros">

            <!-- TITULOS -->
            <div class="titulos-duros">
                <span>NÚMERO</span>
                <span>NUM. DE DÍAS SIN JUGAR</span>
            </div>

            <!-- js  -->

        </div>

    </div>
</div>
