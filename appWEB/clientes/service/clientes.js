
angular.module('HotelLaPradera')
.factory('clientesFactory', function($http){
    
    var url = "http://localhost/Hotel_La_Pradera/Logica/";
   function insertarNuevoCliente(cedula,nombre,telefono,correo,nacionalidad,direccion, callback) {  
            
            $http.post(url+"InsertarDB.php?Funcion=insertarNuevoCliente",{ cedula: cedula, nombre: nombre, telefono: telefono, correo: correo, nacionalidad: nacionalidad, direccion: direccion}).success(function(response){
                console.log(response);
                callback(response);
            });
    }
    
    function modificarCliente(cedula,nombre,telefono,correo,nacionalidad,direccion, callback) {  
            $http.post(url+"ModificarDB.php?Funcion=modificarCliente",{nombre: nombre, cedula: cedula, telefono: telefono, correo: correo, nacionalidad: nacionalidad, direccion: direccion}).success(function(response){
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
    
    function obtenerClientes(callback){
        $http.post(url+"ObtenerDB.php?Funcion=BuscarTodosClientes").success(function(response){
                console.log(response);
                callback(response);
            });
    }
    
    return {insertarNuevoCliente:insertarNuevoCliente,
            modificarCliente:modificarCliente,
            eliminarCliente:eliminarCliente,
            obtenerClientes:obtenerClientes}
        
    
});
