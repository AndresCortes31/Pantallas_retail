<?php
require_once __DIR__ . '/../bd/bd.php';
require_once __DIR__ . '/../includes/zz-funciones.php';

$anio = isset($_GET['anio']) ? (int)$_GET['anio'] : (int)date('Y');
$mes  = isset($_GET['mes'])  ? (int)$_GET['mes']  : (int)date('n');

$data = obtenerNumerosSorteadosPorMes($conn, $anio, $mes);

header('Content-Type: application/json');
echo json_encode($data);
