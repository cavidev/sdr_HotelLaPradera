(function () {
    'use strict';
    angular.module('HotelLaPradera').factory('AuthenticationService', Service);
 
    function Service($http, $sessionStorage) {
        var service = {};
 
        service.Login = Login;
        service.Logout = Logout;
 
        return service;
 
        function Login(username, password, callback) {
            var url = "http://localhost/Hotel_La_Pradera/Logica/conexion.php?Funcion=credenciales";
            $http.post(url,{ username: username, password: password })
                .success(function (response) {
                    console.log(response);
                    // Inicio de sesión exitoso si hay un token en la respuesta
                    if (response.token) {
                        // Guardar nombre de usuario y token en almacenamiento local
                        // para guardar usuario conectado entre actualizaciones de la página
                        //$localStorage.currentUser = { username: username, token: response.token, typeUser: response.typeUser};//Cambia el almacenamiento.
                        $sessionStorage.currentUser = { username: username, token: response.token, typeUser: response.typeUser};
 
                        // Añadir ficha de jwt a encabezado de autenticación para todas las solicitudes a través del servicio $http
                        $http.defaults.headers.common.Authorization = 'Bearer ' + response.token;
 
                        //ejecutar la devolución de llamada con true para indicar éxito inicio de sesión
                        //response.token = 'Logeado';
                        callback(response);
                    } else {
                        // Inicio fallido.
                        callback(response);
                    }
                });
        }
        function Logout() {
            // quitar usuario de almacenamiento local y encabezado de autenticación de http claro
            //delete $localStorage.currentUser;
            delete $sessionStorage.currentUser;
            $http.defaults.headers.common.Authorization = '';
        }
    }
})();