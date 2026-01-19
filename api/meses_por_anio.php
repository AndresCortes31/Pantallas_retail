<?php
require_once __DIR__ . '/../bd/bd.php';
require_once __DIR__ . '/../includes/zz-funciones.php';

$anio = isset($_GET['anio']) ? (int)$_GET['anio'] : 0;

if ($anio === 0) {
    echo json_encode([]);
    exit;
}

$meses = obtenerMesesDisponiblesPorAnio($conn, $anio);

echo json_encode($meses);
