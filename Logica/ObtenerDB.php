<?php


/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function ObtenerReservasRango()
{
    include("./Config.php");
    //Coneccion con posgrest #######################################################
    $strconn = "host= $host port=$port dbname=$dbname user=$user password=$password";

    $conn = pg_connect($strconn) or die("'estado':0");

    $query = "Select * from personas";

    $result = pg_query($conn,$query) or die ("'estado': 0");

    $registros= pg_num_rows($result);
    
    $i=1; 
    $outp = ""; 
    while($campo = @pg_fetch_object($result)) 
    {       
        if ($outp != "") 
            {
                $outp .= ",";
            }     
        $outp .= '{"numero":"' . $i . '",';     
        $outp .= '"Nombre":"'. utf8_encode($campo->nombre)  . '",';    
        $outp .= '"Apellido1":"'. utf8_encode($campo->apellido1). '",';     
        $outp .= '"Apellido2":"'. utf8_encode($campo->apellido2). '"}';     
    $i++; 

    } 
    $outp ='{"records":['.$outp.']}';

    pg_free_result($result);

    pg_close($conn);

    echo($outp);
}


