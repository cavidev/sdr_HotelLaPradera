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
.controller("usuarioCtrl", function($scope,$location,AuthenticationService,usuarioFactory,notificaciones)
{
    (function actualizarFecha(){
        $scope.fechaActual = diasSemana[fechaActual.getDay()] + ", " + fechaActual.getDate() + " de " + 
            meses[fechaActual.getMonth()] + " del " + fechaActual.getFullYear();
            console.log(fechaActual); 
    })();
     
    $scope.Logout = function Logout(){
        notificaciones.notifySuccess('Cerrando Sesión');
        AuthenticationService.Logout();
         $location.path("/"); 
    };
    
    $scope.ObtenerUsuario = function ObtenerUsuario(){
        usuarioFactory.ObtenerUsuario(function(respuesta){
            $scope.fotoU = respuesta.foto;
            $scope.cedulaU = respuesta.cedula;
            $scope.nombreU = respuesta.nombre;
            $scope.tipoU = respuesta.tipo;
            $scope.telefonoU = respuesta.telefono;
            $scope.emailU = respuesta.email;
            if(respuesta.sucess){
                notificaciones.notificacion2("Exito!!","Se recuperaron los datos","success");
            }else{
                notificaciones.notificacion2("Error!!","No se ha actualizado","error");
            }
        }); 
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
    
    $scope.ActualizaFoto = function ActualizaFoto(){
        var file = $scope.imagen;
        console.log(file);
        $scope.imagen2;
        var algo = getBase64(file,function (imagen){
            $scope.imagen2 = imagen;
            var datos = {foto:imagen}
            
            usuarioFactory.ActualizaFoto($scope.imagen2,function(respuesta){
                if(respuesta.sucess){
                    notificaciones.notificacion2("Exito!!","La foto fue cambiada","exito");
                }else{
                    notificaciones.notificacion2("Error!!","No se ha actualizado ","error");
                }
            });
        });
    };
    
    $scope.ObtenerUsuario();
    $scope.visibleNav = false;


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
        callback(reader.result);
   };
   reader.onerror = function (error) {
     console.log('Error: ', error);
   };
}
