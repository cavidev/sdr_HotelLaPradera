<?php

if(function_exists($_REQUEST['Funcion'])){
    $_REQUEST['Funcion']();
}
else
{
    echo '..¡No la encuentro!';
}


function credenciales(){
    include("./config.php");
    $objDatos = json_decode(file_get_contents("php://input"));  
    $strconn = "host= $host port=$port dbname=$dbname user=$user password=$password";
    $conn = pg_connect($strconn) or die("'estado':0");
    $query = "SELECT cedula, tipo FROM Usuario WHERE nombre = '$objDatos->username' and contraseña = '$objDatos->password'";
    $result = pg_query($conn,$query) or die ("'estado': 0");
    pg_close($conn);
    $res = new stdClass();
    if(pg_num_rows($result)>0){
        $res->success = true;
        $res->mensaje = "Inicio de sesion correcto";
        $res->data = pg_fetch_all($result)[0];
        $res->token = 'fake-jwt-token';
    }else{
        $res->success = false;
        $res->mensaje = "No se pudo recuperar la información";
    }   
    echo json_encode($res);
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
        $res = new stdClass();
    if(pg_num_rows($result)>0){
        $res->success = true;
        $res->mensaje = "Inicio de sesion correcto";
        $res->data = pg_fetch_all($result);
    }else{
        $res->success = false;
        $res->mensaje = "No se pudo recuperar la información";
    }   
    echo json_encode($res);
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

function obtenerHabitacionesDia(){
    $objDatos = json_decode(file_get_contents("php://input"));
    include("./config.php");
    $strconn = "host= $host port=$port dbname=$dbname user=$user password=$password";
    $conn = pg_connect($strconn) or die("'estado':0");
    $query = "SELECT habs.idHabitacion,habs.capacidad,habs.tipo,habs.precio,habs.estado,consulta2.idReserva,consulta2.fechaEntrada,consulta2.fechaSalida,consulta2.cantidad as acompannantes,consulta2.usuario,
	consulta2.cedulaCliente,consulta2.email,consulta2.telefono,consulta2.nombre,consulta2.direccion FROM
	(SELECT h.idHabitacion, h.capacidad,h.tipo, h.precio, hr.estado 
	FROM Habitacion h INNER JOIN HabitacionReserva hr
	ON h.idHabitacion = hr.idHabitacion
	WHERE hr.fechaEntrada <= '$objDatos->fecha'and hr.fechaSalida >= '$objDatos->fecha'
	UNION
	SELECT h1.idHabitacion, h1.capacidad,h1.tipo, h1.precio, 'Disponible' as estado
	FROM Habitacion h1 WHERE h1.idHabitacion NOT IN(
	SELECT h2.idHabitacion FROM Habitacion h2 INNER JOIN HabitacionReserva hr2 ON h2.idHabitacion = hr2.idHabitacion)) as habs
	LEFT OUTER JOIN 
	(SELECT hr.idHabitacion,r.idreserva,hr.fechaEntrada,hr.fechaSalida,hr.cantidad,u.nombre as usuario,r.cedulaCliente,ec.email,tc.telefono,c.nombre,c.direccion
		FROM Reserva r INNER JOIN HabitacionReserva hr ON r.idReserva = hr.idReserva
		INNER JOIN Cliente c ON r.cedulaCliente = c.cedula
		INNER JOIN telefonoCliente tc ON tc.cedula = c.cedula
		INNER JOIN emailCliente ec ON ec.cedula = c.cedula
		INNER JOIN Usuario u ON u.cedula = r.cedulaUser
	WHERE hr.fechaEntrada <= '$objDatos->fecha' and hr.fechaSalida >= '$objDatos->fecha'
	) as consulta2
	ON habs.idHabitacion = consulta2.idHabitacion";


    $result = pg_query($conn,$query) or die ("'estado': 0");
    pg_close($conn);  
    $res = new stdClass();
    if ($result){
        if(pg_num_rows($result)>0){
            $res->success = true;
            $res->mensaje = "Se obtuvieron todas las habitaciones";
            $res->data = pg_fetch_all($result);
        }else{
            $res->success = false;
            $res->mensaje = "No hay habitaciones para ese dia";
        }   
    }else{
        $res->success = false;
        $res->mensaje = "Problemas de conexion con la base de datos";
    }
    echo json_encode($res);
}

	


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


