<?php
/////////////////////////////////////////////// INICIO FUNCIONES //////////////////////////////////////////////////////////////////////
//----------------------------------- INICIO OBETENER AÑO ----------------------------------------------//
    function obtenerAniosDisponibles(PDO $conn): array {
        $sql = "
            SELECT DISTINCT YEAR(fecha) AS anio
            FROM numeros_ganadores_sorteos
            WHERE nombre_juego = 'La Diaria'
            ORDER BY anio DESC
        ";

        return $conn->query($sql)->fetchAll(PDO::FETCH_COLUMN);
    }
//---------------------------FIN OBTENER AÑO ----------------------------------------------------------//

//----------------------------------- INICIO OBETENER MES ----------------------------------------------//
    function obtenerMesesDisponiblesPorAnio(PDO $conn, int $anio): array {
        $sql = "
            SELECT DISTINCT MONTH(fecha) AS mes
            FROM numeros_ganadores_sorteos
            WHERE
                nombre_juego = 'La Diaria'
                AND YEAR(fecha) = ?
            ORDER BY mes
        ";

        $stmt = $conn->prepare($sql);
        $stmt->execute([$anio]);

        return $stmt->fetchAll(PDO::FETCH_COLUMN);
    }
//----------------------------------- FIN OBETENER MES ----------------------------------------------//

//----------------------------------- INICIO OBETENER nUMEROS SORTEADOS POR MES ----------------------------------------------//
    function obtenerNumerosSorteadosPorMes(PDO $conn, int $anio, int $mes): array {

        $sql = "
            SELECT
                LTRIM(RTRIM(value)) AS numero,
                COUNT(*) AS veces
            FROM numeros_ganadores_sorteos
            CROSS APPLY STRING_SPLIT(resultado_ganador, ' ')
            WHERE
                nombre_juego = 'La Diaria'
                AND descripcion_premio = 'Numeros Sorteados'
                AND YEAR(fecha) = ?
                AND MONTH(fecha) = ?
                AND value NOT LIKE '%[^0-9]%'
            GROUP BY value
        ";

        $stmt = $conn->prepare($sql);
        $stmt->execute([$anio, $mes]);

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
//----------------------------------- FIN OBETENER nUMEROS SORTEADOS POR MES ----------------------------------------------//


//---------------------------------------------FUNCION OBTNER RESULTADOS POR FECHA PANTALLA 2----------------------------------------//

function obtenerResultadosPorFecha($conn, $anio, $mes, $dia) {

    $sql = "
        SELECT
            hora,
            nombre_juego,
            resultado_ganador
        FROM numeros_ganadores_sorteos
        WHERE
            YEAR(fecha) = :anio
            AND MONTH(fecha) = :mes
            AND DAY(fecha) = :dia
            AND nombre_juego IN ('La Diaria', 'Más 1')
        ORDER BY hora, nombre_juego
    ";

    $stmt = $conn->prepare($sql);
    $stmt->execute([
        ':anio' => $anio,
        ':mes'  => $mes,
        ':dia'  => $dia
    ]);

    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

//---------------------------------------------FUNCION OBTNER RESULTADOS POR FECHA PANTALLA 2----------------------------------------//

//---------------------------------------------FUNCION OBTENER SORTEOS POR DIA Y SEMANA PANTALLA 3-----------------------------------//
function obtenerSorteosPorDiaSemana($conn, $anio, $mes, $diaSemana) {

    $mapaDias = [
        "Monday"    => 1,
        "Tuesday"   => 2,
        "Wednesday" => 3,
        "Thursday"  => 4,
        "Friday"    => 5,
        "Saturday"  => 6,
        "Sunday"    => 7
    ];

    $diaISO = $mapaDias[$diaSemana] ?? 1;

    $sql = "
        SELECT
            fecha,
            DATENAME(WEEKDAY, fecha) AS dia,
            franja_sorteo,
            resultado_ganador
        FROM numeros_ganadores_sorteos
        WHERE nombre_juego = 'La Diaria'
          AND YEAR(fecha) = :anio
          AND ((DATEPART(WEEKDAY, fecha) + @@DATEFIRST - 2) % 7) + 1 = :dia
    ";

    if ($mes != 0) {
        $sql .= " AND MONTH(fecha) = :mes ";
    }

    $sql .= " ORDER BY fecha DESC ";

    $stmt = $conn->prepare($sql);
    $stmt->bindValue(':anio', $anio, PDO::PARAM_INT);
    $stmt->bindValue(':dia', $diaISO, PDO::PARAM_INT);

    if ($mes != 0) {
        $stmt->bindValue(':mes', $mes, PDO::PARAM_INT);
    }

    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

//---------------------------------------------FUNCION OBTENER SORTEOS POR DIA Y SEMANA PANTALLA 3-----------------------------------//

//--------------------------------------------FNCION OBTENER TOP LINEAS GANADORES PANTALLA 4-----------------------------------------//
function obtenerTopLineasGanadoras(PDO $conn, int $anio, int $mes = 0): array {

    $sql = "
        SELECT
            linea,
            COUNT(*) AS total
        FROM (
            SELECT
                FLOOR(TRY_CAST(resultado_ganador AS INT) / 10) AS linea
            FROM numeros_ganadores_sorteos
            WHERE nombre_juego = 'La Diaria'
              AND YEAR(fecha_larga_sorteo) = :anio
              AND (:mes1 = 0 OR MONTH(fecha_larga_sorteo) = :mes2)
              AND TRY_CAST(resultado_ganador AS INT) IS NOT NULL
        ) t
        GROUP BY linea
        ORDER BY total DESC;
    ";

    $stmt = $conn->prepare($sql);

    $stmt->bindValue(':anio', $anio, PDO::PARAM_INT);
    $stmt->bindValue(':mes1', $mes, PDO::PARAM_INT);
    $stmt->bindValue(':mes2', $mes, PDO::PARAM_INT);

    $stmt->execute();

    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}
//--------------------------------------------FNCION OBTENER TOP LINEAS GANADORES PANTALLA 4-----------------------------------------//

//--------------------------------------------FUNCION OBTENER top 10 numeros duros PANTALLA 5----------------------------------------//
//----------------------------------- INICIO OBTENER TOP NUMEROS DUROS (PANTALLA 5) ----------------------------------------------//
function obtenerTopNumerosDuros(PDO $conn, int $anio, int $mes = 0): array {

    $sql = "
        DECLARE @anio INT = :anio;
        DECLARE @mes  INT = :mes;

        DECLARE @fechaInicio DATE =
            CASE
                WHEN @mes = 0
                    THEN DATEFROMPARTS(@anio, 1, 1)
                ELSE
                    DATEFROMPARTS(@anio, @mes, 1)
            END;

        DECLARE @fechaFin DATE =
            CASE
                WHEN @mes = 0
                    THEN DATEFROMPARTS(@anio, 12, 31)
                ELSE
                    EOMONTH(DATEFROMPARTS(@anio, @mes, 1))
            END;

        SELECT TOP 10
            CAST(resultado_ganador AS INT) AS numero,
            MAX(fecha_larga_sorteo) AS ultima_fecha,
            DATEDIFF(DAY, MAX(fecha_larga_sorteo), @fechaFin) AS dias_sin_jugar
        FROM numeros_ganadores_sorteos
        WHERE nombre_juego = 'La Diaria'
          AND descripcion_premio = 'Numeros Sorteados'
          AND TRY_CAST(resultado_ganador AS INT) IS NOT NULL
          AND fecha_larga_sorteo BETWEEN @fechaInicio AND @fechaFin
        GROUP BY CAST(resultado_ganador AS INT)
        ORDER BY dias_sin_jugar DESC, numero ASC;
    ";

    $stmt = $conn->prepare($sql);
    $stmt->bindValue(':anio', $anio, PDO::PARAM_INT);
    $stmt->bindValue(':mes',  $mes,  PDO::PARAM_INT);
    $stmt->execute();

    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

//--------------------------------------------FUNCION OBTENER top 10 numeros duros PANTALLA 5----------------------------------------// 

//--------------------------------------------FUNCION OBTENER TOP 10 NUEMEROS GANADORES POR AÑO PANTALLA 6---------------------------//

function obtenerTop10NumerosGanadoresPorAnio($conn, $anio)
{
    $sql = "
        WITH numeros AS (
            SELECT
                LTRIM(RTRIM(value)) AS numero,
                MONTH(fecha) AS mes
            FROM numeros_ganadores_sorteos
            CROSS APPLY STRING_SPLIT(resultado_ganador, ' ')
            WHERE nombre_juego = 'La Diaria'
              AND descripcion_premio = 'Numeros Sorteados'
              AND YEAR(fecha) = :anio
              AND value NOT LIKE '%[^0-9]%'
        )
        SELECT TOP 10
            numero,

            SUM(CASE WHEN mes = 1  THEN 1 ELSE 0 END) AS ene,
            SUM(CASE WHEN mes = 2  THEN 1 ELSE 0 END) AS feb,
            SUM(CASE WHEN mes = 3  THEN 1 ELSE 0 END) AS mar,
            SUM(CASE WHEN mes = 4  THEN 1 ELSE 0 END) AS abr,
            SUM(CASE WHEN mes = 5  THEN 1 ELSE 0 END) AS may,
            SUM(CASE WHEN mes = 6  THEN 1 ELSE 0 END) AS jun,
            SUM(CASE WHEN mes = 7  THEN 1 ELSE 0 END) AS jul,
            SUM(CASE WHEN mes = 8  THEN 1 ELSE 0 END) AS ago,
            SUM(CASE WHEN mes = 9  THEN 1 ELSE 0 END) AS sep,
            SUM(CASE WHEN mes = 10 THEN 1 ELSE 0 END) AS oct,
            SUM(CASE WHEN mes = 11 THEN 1 ELSE 0 END) AS nov,
            SUM(CASE WHEN mes = 12 THEN 1 ELSE 0 END) AS dic,

            COUNT(*) AS total
        FROM numeros
        GROUP BY numero
        ORDER BY total DESC
    ";

    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':anio', $anio, PDO::PARAM_INT);
    $stmt->execute();

    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}


//--------------------------------------------FUNCION OBTENER TOP 10 NUEMEROS GANADORES POR AÑO PANTALLA 6---------------------------//
/////////////////////////////////////////////// INICIO FUNCIONES //////////////////////////////////////////////////////////////////////
?>
