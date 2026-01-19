<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
require_once __DIR__ . '/../bd/bd.php';
require_once __DIR__ . '/../includes/zz-funciones.php';

$anio = isset($_GET['anio']) ? (int)$_GET['anio'] : 0;
$mes  = isset($_GET['mes'])  ? (int)$_GET['mes']  : 0;

if ($anio === 0) {
    echo json_encode([]);
    exit;
}

$data = obtenerTopLineasGanadoras($conn, $anio, $mes);

header('Content-Type: application/json');
echo json_encode($data);
