
angular.module('HotelLaPradera')
.factory('clientesFactory', function($http){
    
   function insertarNuevoCliente(cedula,nombre,telefono,correo,nacionalidad,descripcion, callback) {  
            var url = "http://localhost/Hotel_La_Pradera/Logica/conexion.php?Funcion=insertarNuevoCliente";
            $http.post(url,{ cedula: cedula, nombre: nombre, telefono: telefono, correo: correo, nacionalidad: nacionalidad, descripcion: descripcion}).success(function(response){
                console.log(response);
                callback(response);
            });
    }
        
    
});
