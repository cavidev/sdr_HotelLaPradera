/*Desarrollador: Desarrollador: Carlos Villafuerte, Esteban Blanco, Lady Chacon, Roberto Salazar.
    Version: 1.0
    Module AngularJS: HotelLaPredera
    Año: 2016
    Descripción: route, para la navegación de las paginas en AngularJS.
*/
angular.module('HotelLaPradera')
.factory('aUsuarioFactory', function($http){
     
    var ActualizaFoto=function ActualizaFoto(data,callback){
        var url = "http://localhost/Hotel_La_Pradera/Logica/conexion.php?Funcion=ActualizaFoto";
        $http.post(url,data).success(function(response){
            console.log(response);
            callback(response);
        });
    };
    
    var insertarUsuario= function insertarUsuario(data,callback){
        console.log(data);
        var url = "http://localhost/Hotel_La_Pradera/Logica/InsertarDB.php?Funcion=InsertarUsuario";
        $http.post(url,data).success(function(response){
 
            callback(response);
        });  
    };
    

return {

        ActualizaFoto: ActualizaFoto,
        insertarUsuario:insertarUsuario
        
    };
});
