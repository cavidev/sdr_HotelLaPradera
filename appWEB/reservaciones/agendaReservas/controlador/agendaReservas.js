/*Desarrollador: Desarrollador: Carlos Villafuerte, Esteban Blanco, Lady Chacon, Roberto Salazar.
    Version: 1.0
    Module AngularJS: HotelLaPredera
    Año: 2016
    Descripción: route, para la navegación de las paginas en AngularJS.
*/
/* global angular */
angular.module('HotelLaPradera')
.controller("agendaReservasCtrl", function($scope, $location, reservacionesFactory)
{
    var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
    var diasSemana = new Array("Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado");
    
    $scope.getReservasFechas = function getReservasFechas(fechaInicial, fechaFinal){
        $scope.fechaInicialModificada = diasSemana[fechaInicial.getDay()] + ", " + fechaInicial.getDate() + " de " + 
            meses[fechaInicial.getMonth()] + " del " + fechaInicial.getFullYear();
    
        $scope.fechaFinalModificada = diasSemana[fechaFinal.getDay()] + ", " + fechaFinal.getDate() + " de " + 
            meses[fechaFinal.getMonth()] + " del " + fechaFinal.getFullYear();
        $scope.totalRegistro = 1;
    };
    
    
});


