/*Desarrollador: Desarrollador: Carlos Villafuerte, Esteban Blanco, Leidy Chacon, Roberto Salazar.
    Version: 1.0
    Module AngularJS: HotelLaPredera
    Año: 2016
    Descripción: route, para la navegación de las paginas en AngularJS.
*/
    /* global angular */

var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
var diasSemana = new Array("Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado");
var fechaActual = new Date();
angular.module('HotelLaPradera')
.controller("usuarioCtrl", function($scope,$location,AuthenticationService,notificaciones)
{
    
    (function actualizarFecha(){
        $scope.fechaActual = diasSemana[fechaActual.getDay()] + ", " + fechaActual.getDate() + " de " + 
            meses[fechaActual.getMonth()] + " del " + fechaActual.getFullYear();
            console.log(fechaActual);

        
    })(0);
    
    var reloj = function reloj(){ 
        var momentoActual = new Date(); 
        var hora = momentoActual.getHours(); 
        var minuto = momentoActual.getMinutes(); 
        var segundo = momentoActual.getSeconds(); 

        $scope.horaImprimible = hora + " : " + minuto + " : " + segundo; 
        
    };
    setTimeout('reloj()',1000);
    reloj();
    
    
    $scope.Logout = function Logout(){
        notificaciones.notifySuccess('Cerrando Sesión');
        AuthenticationService.Logout();
         $location.path("/"); 
    };
    
    $scope.ActualizaContrasenna = function ActualizaContrasenna(contrasenna,nuevaContrasenna){
      var datos = {nuevaContrasenna: nuevaContrasenna};
        usuarioFactory.ActualizaContrasenna(datos,function(respuesta){
            if(respuesta.sucess){
                notificaciones.notificacion2("Exito!!","Contrasenna Cambiada","exito");
            }else{
                notificaciones.notificacion2("Error!!","No se ha actualizado","error");
            }
        }); 
    };
    
    $scope.ActualizaFoto = function ActualizaFoto(nuevaFoto){
        var file = $scope.imagen;
        var fd = new FormData();
        fd.append('file', file);
        
        console.log(file);
        console.log(fd);
        
        var algo = getBase64(file,function (imagen){
            $scope.imagen2 = imagen;
        });
        /*
        var imageData=$base64.encode(nuevaFoto);
        console.log(imageData);
        
        var datos = {cedula: cedula, nuevaFoto: nuevaFoto};
        */
    };
    
    
    $scope.visibleNav = false;
    $scope.superUsuario = "Hola";
}).directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
 
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

function getBase64(file,callback) {
   var reader = new FileReader();
   reader.readAsDataURL(file);
   reader.onload = function () {
        //console.log(reader.result);
        callback(reader.result);
   };
   reader.onerror = function (error) {
     console.log('Error: ', error);
   };
}
