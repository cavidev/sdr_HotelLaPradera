<?php
if(function_exists($_REQUEST['Funcion'])){
    $_REQUEST['Funcion']();
}
else
{
    echo '..¡No la encuentro!';
}

function GetData(){
    $objDatos = json_decode(file_get_contents("php://input"));
    echo $objDatos->Nombre;
}

function getCredenciales(){
    $objDatos = json_decode(file_get_contents("php://input"));
    $res = new stdClass();
    
    if($objDatos->Usuario == 'Carlos' && $objDatos->Contrasenna == '1234'){    
        $res->sucess = true;
        $res->tipoUsuario = 1;
        echo (json_encode($res));
    }
    else{
        $res->sucess = true;
        $res->tipoUsuario = 2;
        echo json_encode($res);
    }
}

function credenciales(){
    $objDatos = json_decode(file_get_contents("php://input"));
    
    $res = new stdClass();
    
    if($objDatos->username == 'Carlos' && $objDatos->password == '1234'){    
        $res->sucess = true;
        $res->token = 'fake-jwt-token';
        $res->typeUser = 1;
        echo json_encode($res);
    }
    else if($objDatos->username == 'Lady' && $objDatos->password == '1234'){    
        $res->sucess = true;
        $res->token = 'fake-jwt-token';
        $res->typeUser = 2;
        echo json_encode($res);
    }
    else{
        $res->sucess = false;
        echo json_encode($res);
    }
}
///----------------------RESERVAR
function getHabitacionesDisponible(){
    $res = new stdClass();
    $res->tipo="Normal";
    
    $res2 = new stdClass();
    $res2->tipo="Bungalow";
    
    $lista = array();
    $lista[] = $res;
    $lista[] = $res2;
    echo json_encode($lista);
}

function obtenerDatosCliente(){
    $objDatos = json_decode(file_get_contents("php://input"));
    $res = new stdClass();
    if($objDatos->cedulaCliente == "504080112"){
        $res->success = true;
        $res->mensaje = "Se obtuvieron los datos del cliente";
        $res->Nombre="Carlos Mario Villafuerte Díaz";
        $res->Cedula="504080112";
        $res->Correo="carlosmario.villafuerted66@gmail.com";
        $res->Direccion="Los Chiles, Centro";
        $res->Telefono="87200620";
        $res->Nacionalidad="Costarricense";
    }else{
        $res->success = false;
        $res->mensaje = "No se encontro ningun cliente, revise la cedula o agrege uno nuevo";
    }
    echo json_encode($res);
}

function insertarNuevaReserva(){
    $objDatos = json_decode(file_get_contents("php://input"));
    $res = new stdClass();
    $res->success = true;
    $res->mensaje = "Se realizo la inserción correctamente";
    echo json_encode($res);
}
///----------------------RESERVAR
///----------------------HABITACIONES


function agregarNuevaHabitacion(){
    $objDatos = json_decode(file_get_contents("php://input"));
    $res = new stdClass();
    $res->success = true;
    $res->mensaje = "Se agrego la habitacion";
    echo json_encode($res);
}

function modificarHabitacion(){
    $objDatos = json_decode(file_get_contents("php://input"));
    $res = new stdClass();
    $res->success = true;
    $res->mensaje = "Se modifico la habitacion";
    echo json_encode($res);
}

function eliminarHabitacion(){
    $objDatos = json_decode(file_get_contents("php://input"));
    $res = new stdClass();
    $res->success = true;
    $res->mensaje = "Se elimino la habitacion";
    echo json_encode($res);
}

function salidaHabitacion(){
    $objDatos = json_decode(file_get_contents("php://input"));
    $res = new stdClass();
    $res->success = true;
    $res->mensaje = "Se realizo la salida";
    echo json_encode($res);
}
///----------------------HABITACIONES