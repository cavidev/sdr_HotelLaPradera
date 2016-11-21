
angular.module('HotelLaPradera')
.factory('clientesFactory', function($http){
    
    var url = "http://localhost/Hotel_La_Pradera/Logica/";
   function insertarNuevoCliente(cedula,nombre,telefono,correo,nacionalidad,descripcion, callback) {  
            
            $http.post(url+"InsertarDB.php?Funcion=insertarNuevoCliente",{ cedula: cedula, nombre: nombre, telefono: telefono, correo: correo, nacionalidad: nacionalidad, direccion: descripcion}).success(function(response){
                console.log(response);
                callback(response);
            });
    }
    
    function modificarCliente(cedula,nombre,telefono,correo,nacionalidad,descripcion, callback) {  
            var url = "http://localhost/Hotel_La_Pradera/Logica/conexion.php?Funcion=modificarCliente";
            $http.post(url,{nombre: nombre, cedula: cedula, telefono: telefono, correo: correo, nacionalidad: nacionalidad, direccion: descripcion}).success(function(response){
                console.log(response);
                callback(response);
            });
    }
    
    function eliminarCliente(cedula, callback) {  
            $http.post(url+"EliminarDB.php?Funcion=eliminarCliente",{cedula: cedula}).success(function(response){
                console.log(response);
                callback(response);
            });
    }
    
    return {insertarNuevoCliente:insertarNuevoCliente,
            modificarCliente:modificarCliente,
            eliminarCliente:eliminarCliente}
        
    
});
