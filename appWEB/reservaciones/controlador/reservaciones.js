/*Desarrollador: Desarrollador: Carlos Villafuerte, Esteban Blanco, Lady Chacon, Roberto Salazar.
    Version: 1.0
    Module AngularJS: HotelLaPredera
    Año: 2016
    Descripción: route, para la navegación de las paginas en AngularJS.
*/
/* global angular */
angular.module('HotelLaPradera')
.controller("reservacionesCtrl", function($scope, $location, reservacionesFactory)
{
    $scope.getTipoHabitaciones = (function getTipoHabitaciones(){
        reservacionesFactory.getTipoHabitaciones("",function(res){
            $scope.habitaciones = res;
        });
        
    })();
    $scope.habitacionesDisponibles = [{id:"111",tipo:"Normal",costo:"2000",descripcion:"Algo AHÍ"},{id:"112",tipo:"Bungalo",costo:"3000",descripcion:"czdfsfs"},
        {id:"114",tipo:"Familiar",costo:"2500",descripcion:"sdgsd"},{id:"114",tipo:"Familiar",costo:"2500",descripcion:"sdgsd"},{id:"114",tipo:"Familiar",costo:"2500",descripcion:"sdgsd"}
    ,{id:"114",tipo:"Familiar",costo:"2500",descripcion:"sdgsd"},{id:"114",tipo:"Bungalo",costo:"2500",descripcion:"sdggdfgdsd"},{id:"114",tipo:"Familiar",costo:"2gdfgd500",descripcion:"sdgsd"}];
});