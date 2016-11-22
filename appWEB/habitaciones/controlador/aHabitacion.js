/*Desarrollador: Desarrollador: Carlos Villafuerte, Esteban Blanco, Lady Chacon, Roberto Salazar.
    Version: 1.0
    Module AngularJS: HotelLaPredera
    Año: 2016
    Descripción: route, para la navegación de las paginas en AngularJS.
*/
/* global angular */
var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
var diasSemana = new Array("Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado");
var fechaActual = new Date();
angular.module('HotelLaPradera')
.controller("aHabitacionCtrl", function($scope,$location,aHabitacionFactory,notificaciones)
{
    var temp = 'Ocupada';
    (function (){
        $scope.fechaHoy = diasSemana[fechaActual.getDay()] + ", " + fechaActual.getDate() + " de " + 
        meses[fechaActual.getMonth()] + " del " + fechaActual.getFullYear();  
        var datos = {fecha: fechaActual.getFullYear()+'/'+(fechaActual.getMonth()+1)+'/'+fechaActual.getDate()};
        aHabitacionFactory.obtenerHabitacionesDia(datos,function (res){
            console.log(res);
            if(res.success === true){
                $scope.habitaciones = res.data;
                notificaciones.notifySuccess(res.mensaje);
                
            }else{
                notificaciones.notifyError(res.mensaje);
            }     
        });
    })();
    
    var obtenerHabitacionesHoy = function obtenerHabitacionesHoy(){
        $scope.fechaHoy = diasSemana[fechaActual.getDay()] + ", " + fechaActual.getDate() + " de " + 
        meses[fechaActual.getMonth()] + " del " + fechaActual.getFullYear();  
        var datos = {fecha: fechaActual.getFullYear()+'/'+(fechaActual.getMonth()+1)+'/'+fechaActual.getDate()};
        aHabitacionFactory.obtenerHabitacionesDia(datos,function (res){
            console.log(res);
            if(res.success === true){
                $scope.habitaciones = res.data;
                notificaciones.notifySuccess(res.mensaje);
            }else{
                notificaciones.notifyError("No se pudo realizar la petición");
            }     
        });
    };
    
    $scope.detalleR = function detalleR(detalle){
        console.log(detalle);
        $scope.detalleReserva = detalle;
    };
    
    $scope.obtenerHabitacionesDia = function obtenerHabitacionesDia(diaEscogido){
        if(diaEscogido===undefined||diaEscogido===""){return ;};
        $scope.fechaHoy = diasSemana[diaEscogido.getDay()] + ", " + diaEscogido.getDate() + " de " + 
            meses[diaEscogido.getMonth()] + " del " + diaEscogido.getFullYear();
        var datos = {fecha: diaEscogido.getFullYear()+'/'+(diaEscogido.getMonth()+1)+'/'+diaEscogido.getDate()};
        aHabitacionFactory.obtenerHabitacionesDia(datos,function (res){
            if(res.success === true){
                $scope.habitaciones = res.data;
                notificaciones.notifySuccess(res.mensaje);
            }else{
                notificaciones.notifyError("No se pudo realizar la petición");
            }     
        });
    };
    
    $scope.agregarNuevaHabitacion = function agregarNuevaHabitacion(nuevaH){
        var datos = {id:nuevaH.idH,capacidad:nuevaH.capacidadH,tipo:nuevaH.tipoH,precio:nuevaH.precioH};
        aHabitacionFactory.agregarNuevaHabitacion(datos,function (res){
                console.log(res);
                if(res.success === true){
                    notificaciones.notifySuccess(res.mensaje);
                    obtenerHabitacionesHoy();
                    
                }else{
                    notificaciones.notifyError(res.mensaje);
                }
                
            });
    };
    
    $scope.modificarHabitacion = function modificarHabitacion(peticion,habitacion){
        angular.element('#linkDirecto').trigger('click');
        if(peticion === "Modificar"){
            $scope.dhModificar = {id:habitacion.idhabitacion, capacidad:habitacion.capacidad,tipo:habitacion.tipo,precio:habitacion.precio};
        }
        else if(peticion === "Confirmacion"){
            var dhModificar = {id:habitacion.id, capacidad:habitacion.capacidad,tipo:habitacion.tipo,precio:habitacion.precio};
            console.log(dhModificar);
            aHabitacionFactory.modificarHabitacion(dhModificar,function (res){
                if(res.success){
                    notificaciones.notifySuccess(res.mensaje);
                    obtenerHabitacionesHoy();
                }else{
                    notificaciones.notifyError("No se pudo realizar la petición");
                }
                
            });
        }   
    };
    
    $scope.eliminarHabitacion = function eliminarHabitacion(peticion,habitacion){      
        if(peticion === "Eliminar"){
            if(habitacion.estado === "Disponible"){
                angular.element('#linkDirectoEH').trigger('click');
                $scope.idhEliminar = {id: habitacion.idhabitacion};
            }else{
               notificaciones.notificacion("Error","La habitacion tiene que estar disponible","error") 
            }
        }
        else if(peticion === "Confirmacion"){
            var idhEliminar = {id: habitacion}
            aHabitacionFactory.eliminarHabitacion(idhEliminar,function (res){
                if(res.success){
                    notificaciones.notifySuccess(res.mensaje);
                    obtenerHabitacionesHoy();
                }else{
                    notificaciones.notifyError("No se pudo realizar la petición");
                }

            });
        }  
    };
    
    $scope.salidaH = false;
    $scope.salidaHabitacion = function salidaHabitacion(peticion,detalle){
        console.log(detalle);
        if(peticion === "salida"){
            $scope.check_out = detalle;
        }
        else if(peticion === "Confirmacion"){
            if($scope.salidaH === true){
                console.log("salida");
                console.log(detalle);
                var datos = {idHabitacion: detalle.idhabitacion,idReserva:detalle.idreserva};
                aHabitacionFactory.salidaHabitacion(datos,function (res){
                    if(res.success){
                        notificaciones.notifySuccess(res.mensaje);
                        obtenerHabitacionesHoy();
                    }else{
                        notificaciones.notifyError(res.mensaje);
                    }

                });
            }
        }  
    };
});

/*
 * <a href="" data-toggle="modal" data-target="#myModal" id="myModalShower"></a>
 * 
 */