<?php


require_once __DIR__ . '/../bd/bd.php';
require_once __DIR__ . '/../includes/zz-funciones.php';

/* ===============================
   VALIDAR PARÁMETROS
   =============================== */

$anio = isset($_GET['anio']) ? (int)$_GET['anio'] : 0;
$mes  = isset($_GET['mes'])  ? (int)$_GET['mes']  : 0;
$dia  = isset($_GET['dia'])  ? (int)$_GET['dia']  : 0;

if ($anio <= 0 || $mes <= 0 || $dia <= 0) {
    echo json_encode([]);
    exit;
}

/* ===============================
   OBTENER RESULTADOS
   =============================== */

$data = obtenerResultadosPorFecha($conn, $anio, $mes, $dia);
header('Content-Type: application/json');
echo json_encode($data);
