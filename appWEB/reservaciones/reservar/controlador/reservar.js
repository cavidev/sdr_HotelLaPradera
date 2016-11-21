/*Desarrollador: Desarrollador: Carlos Villafuerte, Esteban Blanco, Lady Chacon, Roberto Salazar.
    Version: 1.0
    Module AngularJS: HotelLaPredera
    Año: 2016
    Descripción: route, para la navegación de las paginas en AngularJS.
*/
/* global angular */
var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
var diasSemana = new Array("Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado");
var hoy = new Date();
angular.module('HotelLaPradera')
.controller("reservacionesCtrl", function($scope, $location, reservacionesFactory, notificaciones, $sessionStorage)
{
    var fEntrada, hEntrada, fSalida, hSalida; 
    $scope.obtenerReservasDisponiblesRango = function obtenerReservasDisponiblesRango(pfEntrada,pfSalida){
        fEntrada = pfEntrada.getFullYear()+'/'+(pfEntrada.getMonth()+1)+'/'+pfEntrada.getDate();
        fSalida = pfSalida.getFullYear()+'/'+(pfSalida.getMonth()+1)+'/'+pfSalida.getDate();
        var datos = {fechaEntrada: fEntrada,fechaSalida:fSalida};
        console.log(datos);
        reservacionesFactory.obtenerReservasDisponiblesRango(datos,function(res){
            $scope.habitacionesDisponibles = res;
        });  
    };
    
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
    
    $scope.obtenerDatosCliente = function obtenerDatosCliente(cedulaCliente){
        var datos = {cedulaCliente: cedulaCliente};
        if(datos.cedulaCliente===undefined){datos.cedulaCliente="";};
        console.log(datos);
        reservacionesFactory.obtenerDatosCliente(datos,function(respuesta){
            if(respuesta.success){
                $scope.nombreCliente = respuesta.Nombre;
                $scope.correoCliente = respuesta.Correo;
                $scope.telefonoCliente = respuesta.Telefono;
                $scope.direcionCliente = respuesta.Direccion;
                $scope.nacionalidadCliente = respuesta.Nacionalidad;
            }else{
                $scope.nombreCliente = undefined;
                $scope.correoCliente = undefined;
                $scope.telefonoCliente = undefined;
                $scope.direcionCliente = undefined;
                $scope.nacionalidadCliente = undefined;
                notificaciones.notificacion2("ERROR!",respuesta.mensaje,"error");
            }
        });
    };
    
    $scope.confirmarDatos = function confirmarDatos(fechaEntrada,horaEntrada,fechaSalida,horaSalida){
        console.log(hoy);
        if(fechaEntrada === undefined || fechaEntrada === null || fechaSalida === undefined || fechaSalida === null){
            notificaciones.notificacion2("REVISAR FECHAS", "Parece que las fechas estan mal, revisalas","info");return;
        }
        if(horaEntrada === undefined || horaSalida === undefined || horaEntrada === null || horaSalida === null){
            notificaciones.notificacion2("REVISAR HORAS", "No se escribieron bien las Horas, revisalas","info");return;
        }
        if(fechaEntrada < hoy){
            notificaciones.notificacion2("REVISAR FECHAS", "La fecha de entrada, ya ocurrio","info");return;
        }
        else{
            angular.element('#linkDCR').trigger('click');
            hEntrada = horaEntrada.getHours() + ':'+ horaEntrada.getMinutes();
            hSalida = horaSalida.getHours() + ':'+ horaSalida.getMinutes();
            $scope.entrada = diasSemana[fechaEntrada.getDay()] + ", " + fechaEntrada.getDate() + " de " + 
                meses[fechaEntrada.getMonth()] + " del " + fechaEntrada.getFullYear()+" a las "+hEntrada;

            $scope.salida = diasSemana[fechaSalida.getDay()] + ", " + fechaSalida.getDate() + " de " + 
                meses[fechaSalida.getMonth()] + " del " + fechaSalida.getFullYear() +" a las "+hSalida;
            $scope.usuario = $sessionStorage.currentUser.username; 
        }     
    };
    
    $scope.insertarNuevaReserva = function insertarNuevaReserva(fechaEntrada,horaEntrada,fechaSalida,horaSalida,
    nHabitacion,cCliente,aconpanantes,tipoPago,nTarjeta,
    cedulaJuridica,cantidadRespaldo,nombreBanco,numeroCuenta){
        
        fEntrada = fechaEntrada.getFullYear()+'/'+(fechaEntrada.getMonth()+1)+'/'+fechaEntrada.getDate();
        hEntrada = horaEntrada.getHours() + ':'+ horaEntrada.getMinutes(); 
        fSalida = fechaSalida.getFullYear()+'/'+(fechaSalida.getMonth()+1)+'/'+fechaSalida.getDate();
        hSalida = horaSalida.getHours() + ':'+ horaSalida.getMinutes();
        
        var datosNuevaReserva;
        if($scope.infoTipoTarjeta === true){
            datosNuevaReserva = {fechaEntrada: fEntrada,horaEntrada:hEntrada,fechaSalida:fSalida,horaSalida:hSalida,
                                habitacion: nHabitacion, cedula: cCliente,acompanantes: aconpanantes,
                                tipoPago: tipoPago, nTarjeta:nTarjeta};
        }
        else if($scope.infoTipoAgencia === true){
            datosNuevaReserva = {fechaEntrada: fEntrada,horaEntrada:hEntrada,fechaSalida:fSalida,horaSalida:hSalida,
                                habitacion: nHabitacion, cedula: cCliente,acompanantes: aconpanantes,
                                tipoPago: tipoPago, cedulaJuridica:cedulaJuridica};
        }
        else if($scope.infoTipoEfectivo === true){
            datosNuevaReserva = {fechaEntrada: fEntrada,horaEntrada:hEntrada,fechaSalida:fSalida,horaSalida:hSalida,
                                habitacion: nHabitacion, cedula: cCliente,acompanantes: aconpanantes,
                                tipoPago: tipoPago, cantidadRespaldo: cantidadRespaldo};
        }
        else if($scope.infoTipoDepositoBancario === true){
            datosNuevaReserva = {fechaEntrada: fEntrada,horaEntrada:hEntrada,fechaSalida:fSalida,horaSalida:hSalida,
                                habitacion: nHabitacion, cedula: cCliente,acompanantes: aconpanantes,
                                tipoPago: tipoPago, nombreBanco:nombreBanco,numeroCuenta: numeroCuenta};
        };
        reservacionesFactory.insertarNuevaReserva(datosNuevaReserva,function (res){
            if(res.success){
                $location.path("/reservar");
                notificaciones.notificacion2("Exito",res.mensaje,"success");  
            }else{
                notificaciones.notificacion2("ERROR",res.mensaje,"error");
            }  
        });    
    };
    
    $scope.regresar = function regresar(){
        if($sessionStorage.currentUser.typeUser === 1){
            $location.path('/superUsuario')
        }else{
            notificaciones.notifySuccess("Algo salio mal, vuelve a entrar al sistema")
        } 
    };
    
});