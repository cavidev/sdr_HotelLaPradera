<?php

if(function_exists($_REQUEST['Funcion'])){
    $_REQUEST['Funcion']();
}
else
{
    echo '..¡No la encuentro!';
}

function BuscarTodosClientes()
{
    include("./config.php");
    $strconn = "host= $host port=$port dbname=$dbname user=$user password=$password";

    $conn = pg_connect($strconn) or die("'estado':0");

    $query = "SELECT c.cedula,c.nombre,tc.telefono,ec.email,c.nacionalidad,c.direccion FROM
                Cliente c 	INNER JOIN telefonoCliente tc ON c.cedula = tc.cedula
                                INNER JOIN emailCliente ec ON c.cedula = ec.cedula";

    $result = pg_query($conn,$query) or die ("'estado': 0");
    
    pg_close($conn); 
    $respuesta=  pg_fetch_all($result);
    echo json_encode($respuesta);
}

function ObtenerUsuario()
{
    include("./config.php");
    $objDatos = json_decode(file_get_contents("php://input"));
    $strconn = "host= $host port=$port dbname=$dbname user=$user password=$password";

    $conn = pg_connect($strconn) or die("'estado':0");

    $query = "SELECT u.cedula,u.nombre,u.contraseña,u.tipo,u.foto,tu.telefono,eu.email FROM 
                Usuario u LEFT OUTER JOIN telefonoUsuario tu ON (u.cedula = tu.cedula)
                INNER JOIN emailUsuario eu ON (u.cedula = eu.cedula)
                WHERE u.nombre = '$objDatos->usuario'";


    $result = pg_query($conn,$query) or die ("'estado': 0");
    
    pg_close($conn); 
    $respuesta=  pg_fetch_all($result);
    echo json_encode($respuesta[0]);
}