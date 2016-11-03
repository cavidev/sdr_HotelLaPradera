/*Desarrollador: Desarrollador: Carlos Villafuerte, Esteban Blanco, Lady Chacon, Roberto Salazar.
    Version: 1.0
    Module AngularJS: HotelLaPredera
    Año: 2016
    Descripción: route, para la navegación de las paginas en AngularJS.
*/
/* global angular */
angular.module('HotelLaPradera')
.controller("loginCtrl", function($scope, $location, loginFactory)
{
    $scope.visibleNav = false;
    $scope.VerificarUsuario = function VerificarUsuario(usuario,contrasenna){
        var credenciales = {Usuario: usuario, Contrasenna: contrasenna};
        console.log(loginFactory.credencialesUsuario);
        loginFactory.credencialesUsuario(credenciales,function(res){
            if(res.sucess === true){
                switch(res.tipoUsuario) {
                    case 1:
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
                alert("Verifique usuario o contraseña");
            } 
        });  
    };
});