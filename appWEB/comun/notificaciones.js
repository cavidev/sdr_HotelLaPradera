/* global angular */

'use strict';

angular.module('HotelLaPradera')
.factory('notificaciones', function (notificationService){

  return {
    notificacion2: function (titulo,mensaje,tipo){
        notificationService.notifyWithDefaults({
          title: titulo,
          text: mensaje,
          delay: 4000,
          type: tipo
        });  
    },
    notificacion: function(titulo,mensaje,tipo){
      new PNotify({ title: titulo, text: mensaje, type: tipo, delay: 3000});  
    }, 
    
    notifySuccess: function(message){notificationService.success(message);},

    notifyInfo: function(message){notificationService.info(message); },

    notifyError: function(message) {notificationService.error(message); }
  };
});

