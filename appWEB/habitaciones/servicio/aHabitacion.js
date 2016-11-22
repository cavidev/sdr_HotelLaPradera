/*Desarrollador: Desarrollador: Carlos Villafuerte, Esteban Blanco, Lady Chacon, Roberto Salazar.
    Version: 1.0
    Module AngularJS: HotelLaPredera
    Año: 2016
    Descripción: route, para la navegación de las paginas en AngularJS.
*/
/* global angular */
var url = "http://localhost/Hotel_La_Pradera/Logica/";
angular.module('HotelLaPradera')
.factory('aHabitacionFactory', function($http){
    //Arma la funcion y la inserta de una ves en el json.
    
    var obtenerHabitacionesDia = function obtenerHabitacionesDia(data, callback){
        var urlF = url+"ObtenerDB.php?Funcion=obtenerHabitacionesDia";
        $http.post(urlF,data).success(function(response){
            callback(response);
        });
    };
    
    var agregarNuevaHabitacion = function agregarNuevaHabitacion(data, callback){
        var urlF = url+"InsertarDB.php?Funcion=agregarNuevaHabitacion";
        $http.post(urlF,data).success(function(response){
            callback(response);
        });
    };
    
    var modificarHabitacion = function modificarHabitacion(data, callback){
        var urlF = url+"ModificarDB.php?Funcion=modificarHabitacion";
        $http.post(urlF,data).success(function(response){
            callback(response);
        });
    };
    
    var eliminarHabitacion = function eliminarHabitacion(data, callback){
        var urlF = url+"EliminarDB.php?Funcion=eliminarHabitacion";
        $http.post(urlF,data).success(function(response){
            callback(response);
        });
    };
    
    var salidaHabitacion = function salidaHabitacion(data, callback){
        var urlF = url+"ModificarDB.php?Funcion=salidaHabitacion";
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


