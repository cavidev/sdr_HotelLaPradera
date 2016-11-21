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
    $scope.detalleReserva = {id:"001",usuario: "Usuario", fEntrada: "08/11/2016", fSalida: "10/11/2016",
    habitacion: "02",acompannantes: 2, cedula:"05-0408-0112",nombre: "Carlos Mario Villafuerte Diaz",correo:"carlosmario.villafuerted66@gmail.com"
    , telefono: "87200620",direccion: "Los Chiles, centro; Alajuela, Costa Rica"};
    
    (function obtenerHabitacionesHoy(){
        $scope.fechaHoy = diasSemana[fechaActual.getDay()] + ", " + fechaActual.getDate() + " de " + 
        meses[fechaActual.getMonth()] + " del " + fechaActual.getFullYear();  
        var datos = {fecha: fechaActual.getFullYear()+'/'+(fechaActual.getMonth()+1)+'/'+fechaActual.getDate()};
        aHabitacionFactory.obtenerHabitacionesDia(datos,function (res){
            if(res.success === true){
                //$scope.habitaciones = res.data;
                notificaciones.notifySuccess(res.mensaje);
                $scope.habitaciones =[{id: '01',capacidad: 2,tipo:'Normal',precio: 2000, estado: "Disponible"},
                        {id: '02',capacidad: 3,tipo:'Otra', precio: 3000, estado: 'Reservada'},
                        {id: '03',capacidad: 4,tipo:'Bungalo', precio: 4000, estado: 'Ocupada'}];
            }else{
                notificaciones.notifyError("No se pudo realizar la petición");
            }     
        });
    })();

    
    $scope.obtenerHabitacionesDia = function obtenerHabitacionesDia(diaEscogido){
        $scope.fechaHoy = diasSemana[diaEscogido.getDay()] + ", " + diaEscogido.getDate() + " de " + 
            meses[diaEscogido.getMonth()] + " del " + diaEscogido.getFullYear();
        var datos = {fecha: diaEscogido.getFullYear()+'/'+(diaEscogido.getMonth()+1)+'/'+diaEscogido.getDate()};
        console.log(datos);
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
                if(res.success === true){
                    notificaciones.notifySuccess(res.mensaje);
                }else{
                    notificaciones.notifyError(res.mensaje);
                }
                
            });
    };
    
    $scope.modificarHabitacion = function modificarHabitacion(peticion,habitacion){
        angular.element('#linkDirecto').trigger('click');
        if(peticion === "Modificar"){
            $scope.dhModificar = {id:habitacion.id, capacidad:habitacion.capacidad,tipo:habitacion.tipo,precio:habitacion.precio};
        }
        else if(peticion === "Confirmacion"){
            var dhModificar = {id:habitacion.id, capacidad:habitacion.capacidad,tipo:habitacion.tipo,precio:habitacion.precio};
            console.log(dhModificar);
            aHabitacionFactory.modificarHabitacion(dhModificar,function (res){
                if(res.success){
                    notificaciones.notifySuccess(res.mensaje);
                }else{
                    notificaciones.notifyError("No se pudo realizar la petición");
                }
                
            });
        }
        
    };
    
});

/*
 * <a href="" data-toggle="modal" data-target="#myModal" id="myModalShower"></a>
 * 
 */