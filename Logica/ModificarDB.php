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
    include("./config.php");//Lea los datos de la bd
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

function modificarHabitacion()
{
    include("./config.php");//Lea los datos de la bd
    $objDatos = json_decode(file_get_contents("php://input"));
    
    $strconn = "host= $host port=$port dbname=$dbname user=$user password=$password";
    $conn = pg_connect($strconn) or die("'estado':0");
    
    $query = "UPDATE Habitacion SET tipo = '$objDatos->tipo',precio = $objDatos->precio,capacidad = $objDatos->capacidad where idhabitacion = $objDatos->id";
    
    $result = pg_query($conn,$query) or die ("'estado': 1");
    
    pg_close($conn);
    
    $res = new stdClass();
    if(pg_affected_rows($result)>0){
        $res->success = true;
        $res->mensaje = "Se modifico la habitacion " + $objDatos->id;
    }else{
        $res->success = false;
        $res->mensaje = "no se pudo realizar la modificacion";
    }
    echo json_encode($res); 
    
}

function salidaHabitacion()
{
    include("./config.php");//Lea los datos de la bd
    $objDatos = json_decode(file_get_contents("php://input"));
    
    $strconn = "host= $host port=$port dbname=$dbname user=$user password=$password";
    $conn = pg_connect($strconn) or die("'estado':0");
    
    $query = "UPDATE Habitacion SET tipo = '$objDatos->tipo',precio = $objDatos->precio,capacidad = $objDatos->capacidad where idhabitacion = $objDatos->id";
    
    $result = pg_query($conn,$query) or die ("'estado': 1");
    
    pg_close($conn);
    
    $res = new stdClass();
    if(pg_affected_rows($result)>0){
        $res->success = true;
        $res->mensaje = "Se realizo el check out de la habitacion " + $objDatos->id;
    }else{
        $res->success = false;
        $res->mensaje = "no se pudo realizar el check out";
    }
    echo json_encode($res); 
    
}


