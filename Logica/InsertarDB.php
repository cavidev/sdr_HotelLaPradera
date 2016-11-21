<?php
if(function_exists($_REQUEST['Funcion'])){
    $_REQUEST['Funcion']();
}
else
{
    echo '..¡No la encuentro!';
}

function InsertarClienteUsuario()
{
    include("./Config.php");
    $objDatos = json_decode(file_get_contents("php://input"));
    //Coneccion con posgrest #######################################################
    $strconn = "host= $host port=$port dbname=$dbname user=$user password=$password";
    $conn = pg_connect($strconn) or die("'estado':0");
                
    $query = "insert into usuario(cedula,nombre,contraseña,tipo,foto) values ('$objDatos->cedula','$objDatos->nombre',"
            . "'$objDatos->N','$objDatos->Apellido1','$objDatos->Apellido2',"
            . "'$objDatos->TipoCliente','$objDatos->IdDistrito','$objDatos->SennasExactas',"
            . "'$objDatos->Telefono','$objDatos->Correo',null,null)";
    
    //insert into usuario (cedula,nombre,contraseña,tipo,foto) values ('2-0751-0487','Roberto Salazar','1212','administrador','4')
       //     var datos={cedula:cedula,nombre:nombre,puesto:puesto,email:email,telefono:telefono,contrasenna:contrasenna,tipoUsuario:tipoUsuario,imagen:imagen}
    $result = pg_query($conn,$query) or die ("'estado': 1");
    
    //$registros= pg_num_rows($result);
    //pg_free_result($result);
    $contesto = json_encode($result);
    
    pg_close($conn);
    
    echo $contesto;   
}


