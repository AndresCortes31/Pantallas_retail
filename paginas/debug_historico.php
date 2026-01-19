<?php
date_default_timezone_set("America/Tegucigalpa");

// ===============================
// CONFIG
// ===============================
$url   = "https://juega.loto.hn/websales/?action=gamesdata";
$juego = "La Diaria"; // ajusta si el nombre exacto varía

// ===============================
// CONSUMIR API
// ===============================
$json = file_get_contents($url);

if ($json === false) {
    die("No se pudo consumir el API");
}

$data = json_decode($json, true);

if (!isset($data[$juego])) {
    die("No se encontró el juego en el API");
}

// ===============================
// BUSCAR FECHAS (FILTRANDO FUTURAS)
// ===============================
$fechas = [];
$nowMs  = time() * 1000; // ahora en milisegundos

function recorrerFechas($nodo, &$fechas, $nowMs) {
    foreach ($nodo as $key => $value) {
        if ($key === 'date' && is_numeric($value)) {

            // 👉 SOLO FECHAS REALES (NO FUTURAS)
            if ($value <= $nowMs) {
                $fechas[] = $value;
            }

        } elseif (is_array($value)) {
            recorrerFechas($value, $fechas, $nowMs);
        }
    }
}

recorrerFechas($data[$juego], $fechas, $nowMs);

// ===============================
// RESULTADO
// ===============================
if (empty($fechas)) {
    die("No se encontraron fechas históricas válidas");
}

sort($fechas);

$timestampMasAntiguo = $fechas[0];
$timestampMasReciente = end($fechas);

echo "<h3>Resultado del análisis</h3>";

echo "Fecha más antigua encontrada:<br>";
echo date('Y-m-d H:i:s', $timestampMasAntiguo / 1000);
echo "<br><strong>AÑO MÍNIMO:</strong> " . date('Y', $timestampMasAntiguo / 1000);

echo "<hr>";

echo "Fecha más reciente encontrada:<br>";
echo date('Y-m-d H:i:s', $timestampMasReciente / 1000);
echo "<br><strong>AÑO MÁXIMO:</strong> " . date('Y', $timestampMasReciente / 1000);
