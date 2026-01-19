<?php
$activeTab = $_GET['pag'] ?? 'num_sorteados_mes';
?>

<div class="tabs">
    <div class="tab <?= $activeTab == 'num_sorteados_mes' ? 'active' : '' ?>"
         onclick="location.href='index.php?pag=num_sorteados_mes'">
        NÚMEROS SORTEADOS DEL MES
    </div>

    <div class="tab <?= $activeTab == 'resultados_anteriores' ? 'active' : '' ?>"
         onclick="location.href='index.php?pag=resultados_anteriores'">
        RESULTADOS ANTERIORES
    </div>

    <div class="tab <?= $activeTab == 'num_sorteados_semana' ? 'active' : '' ?>"
         onclick="location.href='index.php?pag=num_sorteados_semana'">
         NÚMEROS SORTEADOS POR DÍA DE SEMANA
    </div>

    <div class="tab <?= $activeTab == 'top_lineas_ganadoras' ? 'active' : '' ?>"
         onclick="location.href='index.php?pag=top_lineas_ganadoras'">
         TOP 3 LÍNEAS GANADORAS
    </div>

    <div class="tab <?= $activeTab == 'top_numeros_duros' ? 'active' : '' ?>"
         onclick="location.href='index.php?pag=top_numeros_duros'">
         TOP 10 NÚMEROS DUROS
    </div>

    <div class="tab <?= $activeTab == 'top_numeros_ganadores_anio' ? 'active' : '' ?>"
         onclick="location.href='index.php?pag=top_numeros_ganadores_anio'">
         TOP 10 NÚMEROS DUROS
    </div>
    
</div>
