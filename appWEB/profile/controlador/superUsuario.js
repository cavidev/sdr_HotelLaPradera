/*Desarrollador: Desarrollador: Carlos Villafuerte, Esteban Blanco, Lady Chacon, Roberto Salazar.
    Version: 1.0
    Module AngularJS: HotelLaPredera
    Año: 2016
    Descripción: route, para la navegación de las paginas en AngularJS.
*/
angular.module('HotelLaPradera')
.controller("superUsuarioCtrl", function($scope,$location,loginFactory)
{
    $scope.visibleNav = false;
    $scope.superUsuario = "Hola";
});


