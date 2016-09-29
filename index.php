<!DOCTYPE html>
<!--Desarrollador: Carlos Villafuerte, Esteban Blanco, Lady Chacon, Roberto Salazar.
    Version: 1.0
    Module AngularJS: HotelLaPredera
    Año: 2016 
-->
<html>
    <head>
        <meta charset="utf-8">
        <title>Hotel la Predera</title>
        <!--Carga el css de bootstrap..-->
        <link rel="stylesheet" href="lib/Bootstrap/css/bootstrap.min.css">
        <!--CSS personalizado..-->
        <link rel="stylesheet" href="style/style.css">
    </head>
    <body ng-app="HotelLaPredera"> <!-- -->
        <!--Carga los templates -->
    	<div>
            <div ng-view></div>
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
        
        <!-- Carga de controladores.-->
        <script type="text/javascript" src="appWEB/login/controlador/login.js"></script>
                  
    </body>
</html>