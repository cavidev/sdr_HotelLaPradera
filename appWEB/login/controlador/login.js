/*Desarrollador: Desarrollador: Carlos Villafuerte, Esteban Blanco, Lady Chacon, Roberto Salazar.
    Version: 1.0
    Module AngularJS: HotelLaPredera
    Año: 2016
    Descripción: route, para la navegación de las paginas en AngularJS.
*/
/* global angular */
angular.module('HotelLaPradera')
.controller("loginCtrl", function($scope, $location, AuthenticationService, notificaciones)
{	
 
    $scope.Hola="ALfi";
    $scope.visibleNav = false;

    $scope.Login = function Login(usuario,contrasenna) {
        $scope.loading = true;
        AuthenticationService.Login(usuario, contrasenna, function (result) {
            console.log(result);
            if(result.sucess === true){
                switch(result.typeUser) {
                    case 1:
                        notificaciones.notificacion2('Bienvenido!','Sesion iniciada normalmente','sucess');
                        $location.path("/superUsuario");
                        break;
                    case 2:
                        $location.path("/recepcionista");
                        break;
                    case 2:
                        $location.path("/profileView");
                        break;
                    }
            }
            else{
                notificaciones.notificacion('Oh No!','No se encontraron coincidencias, intenta nuevamente','error');
            }
        });
    };
    
    $scope.Logout = function Logout(){
        AuthenticationService.Logout();
    };
});

angular.module('HotelLaPradera')
    .config(['notificationServiceProvider', function(notificationServiceProvider) {

        // Configure a stack named 'top_left' that append a call 'stack-topleft'
        notificationServiceProvider.setStack('top_left', 'stack-topleft', {
            dir1: 'down',
            dir2: 'right',
            push: 'top'
        });

    }])
;