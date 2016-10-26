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
