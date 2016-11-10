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


function getHabitacionesDisponible(){
    $res = new stdClass();
    $res->tipo="Normal";
    
    $res2 = new stdClass();
    $res2->tipo="Bungalo";
    
    $lista = array();
    $lista[] = $res;
    $lista[] = $res2;
    echo json_encode($lista);
}