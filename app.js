/*Desarrollador: Desarrollador: Carlos Villafuerte, Esteban Blanco, Lady Chacon, Roberto Salazar.
    Version: 1.0
    Module AngularJS: HotelLaPredera
    Año: 2016
    Descripción: route, para la navegación de las paginas en AngularJS.
*/
angular.module('HotelLaPredera', ['ngRoute'])
.config(function($routeProvider) 
{
    $routeProvider
        .when('/', {
            templateUrl	: 'appWEB/login/login.html',
            controller 	: 'loginCtrl'          
        })        
        .when('/superUsuario', {
            templateUrl	: 'appWEB/profile/superUsuario.html',
            controller 	: 'superUsuarioCtrl'          
        })
        .when('/administrador', {
            templateUrl	: 'appWEB/profile/administrador.html',
            controller 	: 'administradorCtrl'          
        })
        .when('/recepcionista', {
            templateUrl	: 'appWEB/profile/recepcionista.html',
            controller 	: 'recepcionistaCtrl'          
        })
        .otherwise({
            redirectTo: '/'
        });
});
