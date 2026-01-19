<div class="mockup-container">
    <img src="../assets/img/Loto_loto.png" class="logo-mockup" alt="Loto">

    <?php include './includes/tabs.php'; ?>
    <?php
        $aniosDisponibles = obtenerAniosDisponibles($conn);
        $anioActual = date('Y');
    ?>

    <div class="contenido contenido-top-lineas">

        <!-- SELECTORES -->
        <div class="selectores">
            <div class="selector selector-anio">
                <span class="titulo-selector">SELECCIONA AÑOS</span>

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

            <div class="selector selector-mes">
                <span class="titulo-selector">SELECCIONA MESESS</span>

                <div class="mes-dropdown">
                    <span class="mes-activo">Todos</span>
                    <span class="flecha">&#9662;</span>
                </div>

                <div class="mes-opciones">
                    <div data-mes="0">Todos</div>
                    <div data-mes="1">Enero</div>
                    <div data-mes="2">Febrero</div>
                    <div data-mes="3">Marzo</div>
                    <div data-mes="4">Abril</div>
                    <div data-mes="5">Mayo</div>
                    <div data-mes="6">Junio</div>
                    <div data-mes="7">Julio</div>
                    <div data-mes="8">Agosto</div>
                    <div data-mes="9">Septiembre</div>
                    <div data-mes="10">Octubre</div>
                    <div data-mes="11">Noviembre</div>
                    <div data-mes="12">Diciembre</div>
                </div>
            </div>

        </div>

        <!-- LISTADO -->
        <div class="listado-lineas" id="listadoLineas">

            <!-- Js -->
        </div>

    </div>
</div>
