/*Desarrollador: Desarrollador: Carlos Villafuerte, Esteban Blanco, Lady Chacon, Roberto Salazar.
    Version: 1.0
    Module AngularJS: HotelLaPredera
    Año: 2016
    Descripción: route, para la navegación de las paginas en AngularJS.
*/
/* global angular */
var url = "http://localhost/Hotel_La_Pradera/Logica/conexion.php?Funcion=";

angular.module('HotelLaPradera')
.factory('reservacionesFactory', function($http){
    
    var obtenerReservasDisponiblesRango = function obtenerReservasDisponiblesRango(data,callback){
        var urlF = url+"obtenerReservasDisponiblesRango";
        $http.post(urlF,data).success(function(response){
            callback(response);
        });
    };
    
    var obtenerDatosCliente = function obtenerDatosCliente(data,callback){
        var urlF = url+"obtenerDatosCliente";
        $http.post(urlF,data).success(function(response){
            console.log(response);
            callback(response);
        });
    };
    
    var insertarNuevaReserva = function insertarNuevaReserva(data,callback){
        var urlF = url+"insertarNuevaReserva";
        $http.post(urlF,data).success(function(response){
            callback(response);
        });
    };

    return {       
        obtenerReservasDisponiblesRango: obtenerReservasDisponiblesRango,
        obtenerDatosCliente: obtenerDatosCliente,
        insertarNuevaReserva: insertarNuevaReserva
    };
});

