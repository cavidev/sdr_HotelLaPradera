angular.module('HotelLaPradera')
.controller("clientesCtrl", function($scope, $location, clientesFactory, notificaciones, $sessionStorage)
{
    /*
        $scope.listaClientes =[{cedula:"20000000",nombre:"Esteban Blanco",telefono:"88888888",correo:"esteban@gmail.com",nacionalidad:"Costarricense",direccion:"La Victoria RF"},
        {cedula:"30000000",nombre:"Sejo Herrera",telefono:"88888888",correo:"sejo@gmail.com",nacionalidad:"Costarricense",direccion:"La Fortuna"},
        {cedula:"40000000",nombre:"Erwin Salas",telefono:"88888888",correo:"rope@gmail.com",nacionalidad:"Costarricense",direccion:"Aguas Zarcas"},
        {cedula:"4-0123-0123",nombre:"Erwin Salas",telefono:"88888888",correo:"rope@gmail.com",nacionalidad:"Costarricense",direccion:"Aguas Zarcas"}];
    */   
    $scope.regresar = function regresar(){
        if($sessionStorage.currentUser.typeUser === 1){
            $location.path('/superUsuario');
        }else{
            notificaciones.notifySuccess("Algo salio mal, vuelve a entrar al sistema")
        }
    };
    
    $scope.insertarNuevoCliente = function insertarNuevoCliente(cedula,nombre,telefono,correo,nacionalidad,direccion){
         clientesFactory.insertarNuevoCliente(cedula,nombre,telefono,correo,nacionalidad,direccion, function (result) {
            console.log(result);
            if(result.success === true){
                notificaciones.notifySuccess(result.mensaje);
                limpiar();
            }
            else{
              notificaciones.notifySuccess(result.mensaje);  
            }
        });
    };
    
    $scope.guardarDatos = function guardarDatos(cedula,nombre,telefono,correo,nacionalidad,direccion){
        $scope.cedulaCliente = cedula;
        $scope.nombreCliente = nombre;
        $scope.telefonoCliente = telefono;
        $scope.correoCliente = correo;
        $scope.nacionalidadCliente = nacionalidad;
        $scope.direccionCliente = direccion;
    };
    
    var limpiar = function limpiar(){
        $scope.cedulaCliente = undefined;
        $scope.nombreCliente = undefined;
        $scope.telefonoCliente = undefined;
        $scope.correoCliente = undefined;
        $scope.nacionalidadCliente = undefined;
        $scope.direccionCliente = undefined;
    };
    
    $scope.guardarCedula = function guardarCedula(cedula){
        $scope.cedulaCliente = cedula;
    };
    
    
    $scope.modificarCliente = function modificarCliente(){
         clientesFactory.modificarCliente($scope.cedulaCliente,$scope.nombreCliente,$scope.telefonoCliente,$scope.correoCliente,
         $scope.nacionalidadCliente,$scope.direccionCliente, function (result) {
            console.log(result);
            if(result.success === true){
                //notificacion de exito
            }
            else{
                //notificaciones.notificacion('Oh No!','No se encontraron coincidencias, intenta nuevamente','error');
                //notificacion de fracaso
            }
        });
    };
    
    $scope.eliminarCliente = function eliminarCliente(){
         clientesFactory.eliminarCliente($scope.cedulaCliente, function (result) {
            console.log(result);
            if(result.success === true){
                //notificacion de exito
            }
            else{
                //notificaciones.notificacion('Oh No!','No se encontraron coincidencias, intenta nuevamente','error');
                //notificacion de fracaso
            }
        });
    };
    
    $scope.obtenerClientes = function obtenerClientes(){
         clientesFactory.obtenerClientes(function (result) {
            if(result.success === true){
                $scope.listaClientes = result.data;
            }
            else{
                notificaciones.notificacion('Oh No!','No se encontraron coincidencias, intenta nuevamente','error');
            }
        });
    };
    
    $scope.obtenerClientes();
});