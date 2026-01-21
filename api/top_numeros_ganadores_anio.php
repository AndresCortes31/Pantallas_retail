<?php
require_once __DIR__ . '/../bd/bd.php';
require_once __DIR__ . '/../includes/zz-funciones.php';

header('Content-Type: application/json');

// Año recibido por GET
$anio = isset($_GET['anio']) ? (int) $_GET['anio'] : (int) date('Y');

// Validación básica
if ($anio <= 0) {
    echo json_encode([]);
    exit;
}

try {
    $data = obtenerTop10NumerosGanadoresPorAnio($conn, $anio);
    echo json_encode($data);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Error al obtener los datos',
        'detalle' => $e->getMessage()
    ]);
}
