/*Desarrollador: Desarrollador: Carlos Villafuerte, Esteban Blanco, Lady Chacon, Roberto Salazar.
    Version: 1.0
    Module AngularJS: HotelLaPredera
    Año: 2016
    Descripción: route, para la navegación de las paginas en AngularJS.
*/
/* global angular */
var url = "http://localhost/Hotel_La_Pradera/Logica/conexion.php?Funcion=";
angular.module('HotelLaPradera')
.factory('aHabitacionFactory', function($http){
    
    var obtenerHabitacionesDia = function obtenerHabitacionesDia(data, callback){
        var urlF = url+"obtenerHabitacionesDia";
        $http.post(urlF,data).success(function(response){
            callback(response);
        });
    };
    
    var agregarNuevaHabitacion = function agregarNuevaHabitacion(data, callback){
        var urlF = url+"agregarNuevaHabitacion";
        console.log("Hola");
        $http.post(urlF,data).success(function(response){
            callback(response);
        });
    };
    
    var modificarHabitacion = function modificarHabitacion(data, callback){
        var urlF = url+"modificarHabitacion";
        $http.post(urlF,data).success(function(response){
            callback(response);
        });
    };
    
    var eliminarHabitacion = function eliminarHabitacion(data, callback){
        var urlF = url+"eliminarHabitacion";
        $http.post(urlF,data).success(function(response){
            callback(response);
        });
    };
    
    var salidaHabitacion = function salidaHabitacion(data, callback){
        var urlF = url+"salidaHabitacion";
        $http.post(urlF,data).success(function(response){
            console.log(response);
            callback(response);
        });
    };
    
    return {
        obtenerHabitacionesDia: obtenerHabitacionesDia,
        agregarNuevaHabitacion: agregarNuevaHabitacion,
        modificarHabitacion: modificarHabitacion,
        eliminarHabitacion: eliminarHabitacion,
        salidaHabitacion: salidaHabitacion
    };
});


