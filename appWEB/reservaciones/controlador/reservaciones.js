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
    var fechaActual = new Date();
    $scope.fechaActual = fechaActual.getDate();
    $scope.getTipoHabitaciones = (function getTipoHabitaciones(){
        reservacionesFactory.getTipoHabitaciones("",function(res){
            $scope.habitaciones = res;
        });
        
    })();
    $scope.infoTipoTarjeta = false;
    $scope.infoTipoAgencia = false;
    $scope.infoTipoEfectivo = false;
    $scope.infoTipoDepositoBancario = false;
    $scope.tipoInfoTipoPago = function tipoInfoTipoPago(tipoPago){
        console.log(tipoPago);
        if(tipoPago === "Tarjeta"){
            $scope.infoTipoTarjeta = true;
            $scope.infoTipoAgencia = false;
            $scope.infoTipoEfectivo = false;
            $scope.infoTipoDepositoBancario = false;
        }
        else if(tipoPago === "Agencia"){
            $scope.infoTipoTarjeta = false;
            $scope.infoTipoAgencia = true;
            $scope.infoTipoEfectivo = false;
            $scope.infoTipoDepositoBancario = false;
        }
        else if(tipoPago === "Efectivo"){
            $scope.infoTipoTarjeta = false;
            $scope.infoTipoAgencia = false;
            $scope.infoTipoEfectivo = true;
            $scope.infoTipoDepositoBancario = false;
        }
        else if(tipoPago === "Deposito Bancario"){
            $scope.infoTipoTarjeta = false;
            $scope.infoTipoAgencia = false;
            $scope.infoTipoEfectivo = false;
            $scope.infoTipoDepositoBancario = true;
        }
    };
});