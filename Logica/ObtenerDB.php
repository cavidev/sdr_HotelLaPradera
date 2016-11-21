<?php
include("./Config.php");
// json_encode(Lo que quiere convertir a jason);
if(function_exists($_REQUEST['Funcion'])){
    $_REQUEST['Funcion']();
}
else
{
    echo 'La funcion no ha sido creada: Hágala';
}

