<?php
define("DSN", "sqlsrv:Server=tcp:srvdbcacdev.database.windows.net,1433;Database=dblotocacdev;Encrypt=yes;TrustServerCertificate=no");
define('USUARIO', 'LotoAdmin'); 
define('CONTRA', 'LotAdmin1.');

try {
    $conn = new PDO(DSN, USUARIO, CONTRA);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo '
        <div class="alert alert-danger alert-icon" role="alert">
            <button class="btn-close" type="button" data-bs-dismiss="alert" aria-label="Close"></button>
            <div class="alert-icon-aside">
                <i data-feather="alert-triangle"></i>
            </div>
            <div class="alert-icon-content">
                <h6 class="alert-heading">¡Ocurrió un error de conexión!</h6>
                <p>' . $e->getMessage() . '</p>
            </div>
        </div>
    ';
}
?>