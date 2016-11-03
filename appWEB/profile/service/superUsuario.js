/*Desarrollador: Desarrollador: Carlos Villafuerte, Esteban Blanco, Lady Chacon, Roberto Salazar.
    Version: 1.0
    Module AngularJS: HotelLaPredera
    Año: 2016
    Descripción: route, para la navegación de las paginas en AngularJS.
*/
angular.module('HotelLaPradera')
.factory('superUsuarioFactory', function($http){
    //Arma la funcion y la inserta de una ves en el json.
    var getData = function getData(datosV,callback){
        console.log("Mae estoy en el factory");
        //La direccion del archivo PHP.
        var url = "http://localhost/Hotel_La_Pradera/Logica/conexion.php?Funcion=GetData";
        //Datos que vienen por parametros.
        var datos = {Nombre:"Villlafuerte"};   
        //Peticion por debajo.
        $http.post(url,datos).success(function(data){
            callback(data);
        });
    };
    
    var credencialesUsuario = function credencialesUsuario(credenciales, callback){
        var url = "http://localhost/Hotel_La_Pradera/Logica/conexion.php?Funcion=getCredenciales";
        $http.post(url,credenciales).success(function(response){
            callback(response);
        });
    };
    
    //Retorna el json con todas las funciones necesarias.
    return {
        getData: getData,
        credencialesUsuario: credencialesUsuario
    };
});



