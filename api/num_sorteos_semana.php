<?php
require_once __DIR__ . '/../bd/bd.php';
require_once __DIR__ . '/../includes/zz-funciones.php';

$anio = isset($_GET['anio']) ? (int)$_GET['anio'] : date('Y');
$mes  = isset($_GET['mes'])  ? (int)$_GET['mes']  : 0;
$dia  = isset($_GET['dia'])  ? $_GET['dia']       : 'Monday';

$resultados = obtenerSorteosPorDiaSemana($conn, $anio, $mes, $dia);

/*
  Transformar:
  filas → una fila por fecha con 3 franjas
*/
$tabla = [];

foreach ($resultados as $r) {

    $fecha = $r['fecha'];

    if (!isset($tabla[$fecha])) {
        $tabla[$fecha] = [
            'fecha' => $fecha,
            'dia'   => $r['dia'], // 👈 AQUÍ
            'ganador_11am' => null,
            'ganador_3pm'  => null,
            'ganador_9pm'  => null
        ];
    }

    if (str_contains($r['franja_sorteo'], '11:00')) {
        $tabla[$fecha]['ganador_11am'] = $r['resultado_ganador'];
    }
    if (str_contains($r['franja_sorteo'], '3:00')) {
        $tabla[$fecha]['ganador_3pm'] = $r['resultado_ganador'];
    }
    if (str_contains($r['franja_sorteo'], '9:00')) {
        $tabla[$fecha]['ganador_9pm'] = $r['resultado_ganador'];
    }
}

header('Content-Type: application/json');
echo json_encode(array_values($tabla));
