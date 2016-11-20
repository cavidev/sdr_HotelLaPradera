angular.module('HotelLaPradera')
.controller("clientesCtrl", function($scope, $location, clientesFactory, notificaciones, $sessionStorage)
{
    
        $scope.regresar = function regresar(){
        if($sessionStorage.currentUser.typeUser === 1){
            $location.path('/superUsuario')
        }else{
            notificaciones.notifySuccess("Algo salio mal, vuelve a entrar al sistema")
        } 
    };
    
    $scope.insertarNuevoCliente = function insertarNuevoCliente(cedula,nombre,telefono,correo,nacionalidad,direccion){
         clientesFactory.Login(cedula,nombre,telefono,correo,nacionalidad,direccion, function (result) {
            console.log(result);
            if(result.sucess === true){
                //notificacion de exito
            }
            else{
                //notificaciones.notificacion('Oh No!','No se encontraron coincidencias, intenta nuevamente','error');
                //notificacion de fracaso
            }
        });
    }
    
});