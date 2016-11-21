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
    (function actualizarFecha(){
    $scope.fechaHoy = diasSemana[fechaActual.getDay()] + ", " + fechaActual.getDate() + " de " + 
        meses[fechaActual.getMonth()] + " del " + fechaActual.getFullYear();
    })();
    
    $scope.detalleReserva = {id:"001",usuario: "Usuario", fEntrada: "08/11/2016", fSalida: "10/11/2016",
    habitacion: "02",acompannantes: 2, cedula:"05-0408-0112",nombre: "Carlos Mario Villafuerte Diaz",correo:"carlosmario.villafuerted66@gmail.com"
    , telefono: "87200620",direccion: "Los Chiles, centro; Alajuela, Costa Rica"};
    
    $scope.habitaciones =[{id: '01',capacidad: 2,tipo:'Normal',precio: 2000, estado: "Disponible"},
        {id: '02',capacidad: 2,tipo:'Normal', precio: 2000, estado: 'Reservada'},
        {id: '03',capacidad: 2,tipo:'Normal', precio: 2000, estado: 'Ocupada'}];
    
    $scope.getHabitacionesDia = function getHabitacionesDia(diaEscogido){
        $scope.fechaHoy = diasSemana[diaEscogido.getDay()] + ", " + diaEscogido.getDate() + " de " + 
        meses[diaEscogido.getMonth()] + " del " + diaEscogido.getFullYear();

        $scope.habitaciones =[{id: '01',capacidad: 2,tipo:'Normal',precio: 4000, estado: 'Reservada'},
        {id: '02',capacidad: 2,tipo:'Normal', precio: 1500, estado: 'Disponible'},
        {id: '03',capacidad: 2,tipo:'Normal', precio: 2780, estado: 'Ocupada'}];
    };
    
    $scope.modificarHabitacion = function modificarHabitacion(peticion,capacidad,tipo,precio){
        angular.element('#linkDirecto').trigger('click');
        if(peticion === "Modificar"){
            $scope.dhModificar = {capacidad:capacidad,tipo:tipo,precio:precio};
        }
        else if(peticion === "Confirmacion"){
            var dhModificar = {capacidad:capacidad,tipo:tipo,precio:precio};
            aHabitacionFactory.modificarHabitacion(dhModificar,function (res){
                if(res.sucess === true){
                    notificaciones.notifySuccess("Se modifico la habitacion");
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