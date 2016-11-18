/*Desarrollador: Desarrollador: Carlos Villafuerte, Esteban Blanco, Lady Chacon, Roberto Salazar.
    Version: 1.0
    Module AngularJS: HotelLaPredera
    Año: 2016
    Descripción: route, para la navegación de las paginas en AngularJS.
*/
/* global angular */

angular.module('HotelLaPradera')
.factory('reservacionesFactory', function($http){
    
    var getTipoHabitaciones = function getTipoHabitaciones(data,callback){
        var url = "http://localhost/Hotel_La_Pradera/Logica/conexion.php?Funcion=getHabitacionesDisponible";
        $http.post(url,data).success(function(response){
            console.log(response);
            callback([{tipo:'Nomal'},{tipo: "Bungalo"}]);
        });
    };
    
    var getDatosCliente = function getDatosCliente(data,callback){
        var url = "http://localhost/Hotel_La_Pradera/Logica/conexion.php?Funcion=getDatosCliente";
        $http.post(url,data).success(function(response){
            console.log(response);
            callback(response);
        });
    };
    //Retorna el json con todas las funciones necesarias.
    return {       
        getTipoHabitaciones: getTipoHabitaciones,
        getDatosCliente: getDatosCliente
    };
});

