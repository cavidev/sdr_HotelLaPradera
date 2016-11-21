<?php

if(function_exists($_REQUEST['Funcion'])){
    $_REQUEST['Funcion']();
}
else
{
    echo 'La funcion no ha sido creada: Comuniquese';
}


        
function modificarCliente()
{
    include("./Config.php");//Lea los datos de la bd
    $objDatos = json_decode(file_get_contents("php://input"));
    
    $strconn = "host= $host port=$port dbname=$dbname user=$user password=$password";
    $conn = pg_connect($strconn) or die("'estado':0");
    
    $query = "SELECT ModificarCliente('$objDatos->nombre','$objDatos->cedula','$objDatos->direccion',"
            . "'$objDatos->nacionalidad','$objDatos->telefono','$objDatos->correo')";
    
    $result = pg_query($conn,$query) or die ("'estado': 1");
    
    $contesto = json_encode($result);
    
    pg_close($conn);
    
    echo $contesto;
    
}
