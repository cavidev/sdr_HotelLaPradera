/*Desarrollador: Desarrollador: Carlos Villafuerte, Esteban Blanco, Leidy Chacon, Roberto Salazar.
    Version: 1.0
    Module AngularJS: HotelLaPredera
    Año: 2016
    Descripción: route, para la navegación de las paginas en AngularJS.
*/
    /* global angular */

angular.module('HotelLaPradera')
.controller("aUsuarioCtrl", function($scope,$location,AuthenticationService,aUsuarioFactory,notificaciones)
{
    $scope.image;
    $scope.ActualizaFoto = function ActualizaFoto(){
        var file = $scope.imagen;
        console.log(file);
        $scope.imagen2;
        var algo = getBase64(file,function (imagen){
            $scope.imagen2 = imagen;
            $scope.image=imagen;
            var datos = {foto: imagen};
            aUsuarioFactory.ActualizaFoto(datos,function(respuesta){
                if(respuesta.sucess){
                    notificaciones.notificacion2("Exito!!","La foto fue cambiada","exito");
                }else{
                   
                }
            });
        });
        
        
    };
    $scope.insertarUsuario=function insertarUsuario(cedula,nombre,puesto,email,telefono,contrasenna,tipoUsuario,imagen){
        var datos={cedula:cedula,nombre:nombre,email:email,telefono:telefono,contrasenna:contrasenna,tipoUsuario:tipoUsuario,imagen:imagen}
        aUsuarioFactory.insertarUsuario(datos,function(respuesta){
            if(!respuesta.sucess){
                notificaciones.notificacion2("Error"," "," ");
            }
            
        });
        
    }
    
    
    
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
        //console.log(reader.result);
        callback(reader.result);
   };
   reader.onerror = function (error) {
     console.log('Error: ', error);
   };
}
