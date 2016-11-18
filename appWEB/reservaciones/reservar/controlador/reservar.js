/*Desarrollador: Desarrollador: Carlos Villafuerte, Esteban Blanco, Lady Chacon, Roberto Salazar.
    Version: 1.0
    Module AngularJS: HotelLaPredera
    Año: 2016
    Descripción: route, para la navegación de las paginas en AngularJS.
*/
/* global angular */
var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
var diasSemana = new Array("Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado");
angular.module('HotelLaPradera')
.controller("reservacionesCtrl", function($scope, $location, reservacionesFactory, notificaciones, $sessionStorage)
{
    var fEntrada, hEntrada, fSalida, hSalida; 
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
    
    $scope.confirmarDatos = function confirmarDatos(fechaEntrada,horaEntrada,fechaSalida,horaSalida){
        hEntrada = horaEntrada.getHours() + ':'+ horaEntrada.getMinutes();
        hSalida = horaSalida.getHours() + ':'+ horaSalida.getMinutes();
        $scope.entrada = diasSemana[fechaEntrada.getDay()] + ", " + fechaEntrada.getDate() + " de " + 
            meses[fechaEntrada.getMonth()] + " del " + fechaEntrada.getFullYear()+" a las "+hEntrada;
        
        $scope.salida = diasSemana[fechaSalida.getDay()] + ", " + fechaSalida.getDate() + " de " + 
            meses[fechaSalida.getMonth()] + " del " + fechaSalida.getFullYear() +" a las "+hSalida;
            
        
    };
    
    $scope.insertarNuevaReserva = function insertarNuevaReserva(fechaEntrada,horaEntrada,fechaSalida,horaSalida,
    nHabitacion,cCliente,nombreCliente,aconpanantes,tipoPago,nTarjeta,
    cedulaJuridica,cantidadRespaldo,nombreBanco,numeroCuenta){
        if(fechaEntrada === undefined || fechaSalida === undefined){
            notificaciones.notificacion2("REVISAR FECHAS", "Parece que las fechas estan mal, revisalas","info");return;
        }
        if(horaEntrada === undefined || horaSalida === undefined){
            notificaciones.notificacion2("REVISAR HORAS", "No se escribieron bien las Horas, revisalas","info");return;
        }
        
        fEntrada = fechaEntrada.getFullYear()+'/'+(fechaEntrada.getMonth()+1)+'/'+fechaEntrada.getDate();
        hEntrada = horaEntrada.getHours() + ':'+ horaEntrada.getMinutes(); 
        fSalida = fechaSalida.getFullYear()+'/'+(fechaSalida.getMonth()+1)+'/'+fechaSalida.getDate();
        hSalida = horaSalida.getHours() + ':'+ horaSalida.getMinutes();
        console.log(fEntrada);
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
    $scope.regresar = function regresar(){
        if($sessionStorage.currentUser.typeUser === 1){
            $location.path('/superUsuario')
        }else{
            notificaciones.notifySuccess("Algo salio mal, vuelve a entrar al sistema")
        }
        
    };
    
    $scope.getDatosCliente = function getDatosCliente(cedulaCliente){
        var datos = {cedulaCliente: cedulaCliente};
        reservacionesFactory.getDatosCliente(datos,function(respuesta){
            if(respuesta.sucess){
                $scope.nombreCliente = respuesta.Nombre;
                $scope.correoCliente = respuesta.Correo;
                $scope.telefonoCliente = respuesta.Telefono;
                $scope.direcionCliente = respuesta.Direccion; 
            }else{
                notificaciones.notificacion2("No encontrado!!","Revisa el numero de cedula o agrega un nuevo cliente al sistema","error");
            }
        });
    };
});