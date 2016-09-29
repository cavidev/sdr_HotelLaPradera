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

