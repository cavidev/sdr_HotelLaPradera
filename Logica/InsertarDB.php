<?php

if(function_exists($_REQUEST['Funcion'])){
    $_REQUEST['Funcion']();
}
else
{
    echo '..¡No la encuentro!';
}

function insertarNuevoCliente()
{
    include("./config.php");
    $objDatos = json_decode(file_get_contents("php://input"));
    //Coneccion con posgrest #######################################################
    $strconn = "host= $host port=$port dbname=$dbname user=$user password=$password";
    $conn = pg_connect($strconn) or die("'estado':0");
                
    $query = "SELECT InsertarCliente('$objDatos->nombre','$objDatos->cedula','$objDatos->direccion',"
            . "'$objDatos->nacionalidad','$objDatos->telefono','$objDatos->correo')";
  
    $result = pg_query($conn,$query) or die ("'estado': 1");
    
    //$registros= pg_num_rows($result);
    //pg_free_result($result);
    $contesto = json_encode($result);
    
    pg_close($conn);
    
    echo $contesto;   
}
