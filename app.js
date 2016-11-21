/*Desarrollador: Desarrollador: Carlos Villafuerte, Esteban Blanco, Lady Chacon, Roberto Salazar.
    Version: 1.0
    Module AngularJS: HotelLaPredera
    Año: 2016
    Descripción: route, para la navegación de las paginas en AngularJS.
*/
angular.module('HotelLaPradera', ['ngRoute','ngStorage','jlareau.pnotify'])
.config(function($routeProvider) 
{
    $routeProvider
        .when('/', {
            templateUrl	: 'appWEB/login/login.html',
            controller 	: 'loginCtrl'          
        })        
        .when('/superUsuario', {
            templateUrl	: 'appWEB/User/usuario.html',
            controller 	: 'usuarioCtrl'          
        })
        .when('/administrador', {
            templateUrl	: 'appWEB/profile/administrador.html',
            controller 	: 'administradorCtrl'          
        })
        .when('/recepcionista', {
            templateUrl	: 'appWEB/profile/recepcionista.html',
            controller 	: 'recepcionistaCtrl'          
        })
        .when('/reservar', {
            templateUrl	: 'appWEB/reservaciones/reservar/reservar.html',
            controller 	: 'reservacionesCtrl'
        })
        .when('/reservas', {
            templateUrl	: 'appWEB/reservaciones/reservas/reservas.html',
            controller 	: 'agendaReservasCtrl'
        })
        .when('/agregarCliente', {
            templateUrl	: 'appWEB/clientes/agregarClientes.html',
            controller 	: 'clientesCtrl'
        })
        .when('/verClientes', {
            templateUrl	: 'appWEB/clientes/verClientes.html',
            controller 	: 'clientesCtrl'
        })
        .when('/aHabitacion', {
            templateUrl	: 'appWEB/habitaciones/agregarHabitacion.html',
            controller 	: 'aHabitacionCtrl'
        })
        .when('/aUsuario',{
            templateUrl:'appWEB/Usuarios/agregarUsuario.html',
            controller: 'aUsuarioCtrl' 
                    
        })
        .when('/usuario', {
            templateUrl	: 'appWEB/User/usuario.html',
            controller 	: 'usuarioCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
}).run(run);

function run($rootScope, $http, $location, $localStorage, $sessionStorage) {
    // Mantenga el usuario logueado después de actualización de la página
    /*if ($localStorage.currentUser) {
        $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.token;
    }*/
    if ($sessionStorage.currentUser) {
        $http.defaults.headers.common.Authorization = 'Bearer ' + $sessionStorage.currentUser.token;
    }

    //redirigir a la página de inicio de sesión si no ha iniciado sesión y tratar de acceder a una página restringida
    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        var publicPages = ['/'];
        var restrictedPage = publicPages.indexOf($location.path()) === -1;
        if (restrictedPage && !$sessionStorage.currentUser) {
            $location.path('/');
        }
    });
}