<?php
require_once __DIR__ . '/../bd/bd.php';
require_once __DIR__ . '/../includes/zz-funciones.php';

header('Content-Type: application/json');

// --------------------
// Parámetros
// --------------------
$anio = isset($_GET['anio']) ? (int)$_GET['anio'] : (int)date('Y');
$mes  = isset($_GET['mes'])  ? (int)$_GET['mes']  : 0; // 0 = Todo el año

// --------------------
// Validaciones básicas
// --------------------
if ($anio <= 0) {
    echo json_encode([]);
    exit;
}

// --------------------
// Obtener data
// --------------------
$data = obtenerTopNumerosDuros($conn, $anio, $mes);

// --------------------
// Respuesta
// --------------------
echo json_encode($data);
