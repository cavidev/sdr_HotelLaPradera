/*Desarrollador: Desarrollador: Carlos Villafuerte, Esteban Blanco, Lady Chacon, Roberto Salazar.
    Version: 1.0
    Module AngularJS: HotelLaPredera
    Año: 2016
    Descripción: route, para la navegación de las paginas en AngularJS.
*/
angular.module('HotelLaPradera')
.factory('agendaReservasFactory', function($http){
   console.log("Hola desde el servicio"); 
    var getTipoHabitaciones = function getTipoHabitaciones(data,callback){
        var url = "http://localhost/Hotel_La_Pradera/Logica/conexion.php?Funcion=getHabitacionesDisponible";
        $http.post(url,data).success(function(response){
            console.log(response);
            callback([{tipo:'Nomal'},{tipo: "Bungalo"}]);
        });
    };
    
    //Retorna el json con todas las funciones necesarias.
    return {       
        getTipoHabitaciones: getTipoHabitaciones
    };
});


