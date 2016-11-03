<!DOCTYPE html>
<!--Desarrollador: Carlos Villafuerte, Esteban Blanco, Lady Chacon, Roberto Salazar.
    Version: 1.0
    Module AngularJS: HotelLaPredera
    Año: 2016 
-->
<html>
    <head>
        <meta charset="utf-8">
        <title>Hotel la Pradera</title>
        <!--Carga el css de bootstrap..-->
        <link rel="stylesheet" href="lib/Bootstrap/css/bootstrap.min.css"><!--Boostrap..-->
        <link rel="stylesheet" href="style/style.css"><!--CSS personalizado..-->
        <link rel="stylesheet" href="lib/Icons/css/font-awesome.min.css"><!--Iconos..-->
    </head>
    <body ng-app="HotelLaPradera"> <!-- -->
        <!-- Nav lateral, la imagen le cae encima, asi que no se ve..-->
        <header>
            <nav class="navbar navbar-inverse colorBlanco"  role="navigation">
                <!-- Brand and toggle get grouped for better mobile display -->
                <div>
                    <h3 style="text-align: center">Hotel La Pradera</h3>
                    <hr style="height: 20px; width: 70%; align: center;" size="3" >
                </div>
                <!-- Collect the nav links, forms, and other content for toggling --> 
                <div class="collapse navbar-collapse navbar-ex1-collapse">
                    <ul class="nav navbar-nav">
                        <li><a href="#superUsuario"><i class="fa fa-user"></i> Mi Perfil</a></li>
                        <li class="dropdown">
                            <a class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-plus-circle"></i> Reservaciones</a>
                            <ul class="dropdown-menu">
                                <li class="dropdown-header">Opciones de las reservas</li>
                                <li><a href="#">Filtrar Reservas</a></li>
                                <li><a href="#reservar">Reservar</a></li>
                                <li><a href="#">Modificar</a></li>
                                <li><a href="#">Eliminar</a></li>
                            </ul>
                        </li>
                        <li class="dropdown">
                            <a class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-bed"></i> Habitaciones</a>
                            <ul class="dropdown-menu">
                                <li><a href="#">Ver Habitaciones</a></li>
                                <li><a href="#superUsuario/reservaciones">Agregar</a></li>
                                <li><a href="#">Modificar</a></li>
                                <li><a href="#">Eliminar</a></li>
                            </ul>
                        </li>
                        <li class="dropdown">
                            <a class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-money"></i> Facturacion</a>
                            <ul class="dropdown-menu">
                                <li><a href="#">Ver Habitaciones</a></li>
                                <li><a href="#superUsuario/reservaciones">Agregar</a></li>
                                <li><a href="#">Modificar</a></li>
                                <li><a href="#">Eliminar</a></li>
                            </ul>
                        </li>
                         <li class="dropdown">
                            <a class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-users"></i> Clientes</a>
                            <ul class="dropdown-menu">
                                <li><a href="#">Ver Habitaciones</a></li>
                                <li><a href="#superUsuario/reservaciones">Agregar</a></li>
                                <li><a href="#">Modificar</a></li>
                                <li><a href="#">Eliminar</a></li>
                            </ul>
                        </li>
                    </ul>
                </div><!-- /.navbar-collapse -->
            </nav>
        </header>
        <!--Carga los templates -->
    	<div>
            <div ng-view=""></div>
        </div>
        
        <!-- Carga libreria AngularJS.-->
        <script type="text/javascript" src="lib/AngularJS/angular.min.js" ></script>
        <script type="text/javascript" src="lib/AngularJS/angular-route.min.js"></script> 
        <!-- Carga libreria jQuery.--> 
        <script src="lib/jQuery/dist/jquery.min.js"></script>
        <!-- Carga libreria Bootstrap.-->
        <script src="lib/Bootstrap/js/bootstrap.min.js"></script>
        
        <!--Carga las rutas (templates)-->
        <script src="app.js"></script> 
        
        <!--Carga de jQuery events-->
        <script type="text/javascript" src="lib/jQuery/dist/jquery.min.js"></script>
        
        <!--Carga de service-->
        <script type="text/javascript" src="appWEB/login/service/login.js"></script>
        <script type="text/javascript" src="appWEB/profile/service/superUsuario.js"></script>
        <script type="text/javascript" src="appWEB/reservaciones/servicio/reservaciones.js"></script>
        
        <!-- Carga de controladores.-->
        <script type="text/javascript" src="appWEB/login/controlador/login.js"></script>
        <script type="text/javascript" src="appWEB/profile/controlador/superUsuario.js"></script>
        <script type="text/javascript" src="appWEB/reservaciones/controlador/reservaciones.js"></script>
    </body>
</html>