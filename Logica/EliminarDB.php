<?php
if(function_exists($_REQUEST['Funcion'])){
    $_REQUEST['Funcion']();
}
else
{
    echo '..¡No la encuentro!';
}

function eliminarCliente()
{
    include("./config.php");
    $objDatos = json_decode(file_get_contents("php://input"));
    //Coneccion con posgrest #######################################################
    $strconn = "host= $host port=$port dbname=$dbname user=$user password=$password";
    $conn = pg_connect($strconn) or die("'estado':0");
                
    $query = "SELECT eliminarCliente('$objDatos->cedula')";
    
    $result = pg_query($conn,$query) or die ("'estado': 1");
    
    $contesto = json_encode($result);
    
    pg_close($conn);
    
    echo $contesto;
}
