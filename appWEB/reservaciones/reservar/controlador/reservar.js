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
    var fEntrada, hEntrada, fSalida, hSalida; 
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
    
    $scope.insertarNuevaReserva = function insertarNuevaReserva(fechaEntrada,horaEntrada,fechaSalida,horaSalida,
    nHabitacion,cCliente,nombreCliente,aconpanantes,tipoPago,nTarjeta,
    cedulaJuridica,cantidadRespaldo,nombreBanco,numeroCuenta){
        fEntrada = fechaEntrada.getFullYear()+'/'+(fechaEntrada.getMonth()+1)+'/'+fechaEntrada.getDate();
        hEntrada = horaEntrada.getHours() + ':'+ horaEntrada.getMinutes(); 
        fSalida = fechaSalida.getFullYear()+'/'+(fechaSalida.getMonth()+1)+'/'+fechaSalida.getDate();
        hSalida = horaSalida.getHours() + ':'+ horaSalida.getMinutes();
        
            if($scope.infoTipoTarjeta === true){
                var datosReserva = {fEntrada: fEntrada,hEntrada:hEntrada,fSalida:fSalida,hSalida:hSalida,
                                    nHabitacion:nHabitacion,cedula:cCliente,acompanantes:aconpanantes,
                                    nTarjeta:nTarjeta};
                
            }
            else if($scope.infoTipoAgencia === true){
                
            }
            else if($scope.infoTipoEfectivo === true){
                
            }
            else if($scope.infoTipoDepositoBancario === true){
                
            };
        
        
    };
});