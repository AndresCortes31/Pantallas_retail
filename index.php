<?php 
include 'includes/header.php';
include 'includes/nav.php';

$pag = $_GET['pag'] ?? 'num_sorteados_mes';

switch ($pag) {

    case 'num_sorteados_mes':
        include 'paginas/num_sorteados_mes.php';
    break;

    case 'resultados_anteriores':
        include 'paginas/resultados_anteriores.php';
    break;

    case 'num_sorteados_semana':
        include 'paginas/num_sorteados_semana.php';
    break;

    case 'top_lineas_ganadoras':
        include 'paginas/top_lineas_ganadoras.php';
    break;

    case 'top_numeros_duros':
        include 'paginas/top_numeros_duros.php';
    break;

    case 'top_numeros_ganadores_anio':
        include 'paginas/top_numeros_ganadores_anio.php';
    break;

    default:
        include 'paginas/num_sorteados_mes.php';
    break;
}

include 'includes/footer.php';
?>
