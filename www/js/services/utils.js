angular.module('RioTrocasApp').factory('Utils', function($ionicLoading,$ionicPopup) {

	var Utils = {

    show: function() {
     /* $ionicLoading.show({
        animation: 'fade-in',
        showBackdrop: false,
        maxWidth: 200,
        showDelay: 500,
        template: '<p class="item-icon-left">Loading...<ion-spinner icon="lines"/></p>'
      });*/
      $ionicLoading.show({
  	    animation: 'fade-in',
  	    showBackdrop: false,
        template: '<div class="loader"><svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>'
      });
    },

    hide: function(){
      $ionicLoading.hide();
    },

		alertshow: function(tit,msg){
			var alertPopup = $ionicPopup.alert({
				title: tit,
				template: msg
			});
			alertPopup.then(function(res) {
				//console.log('Registrado correctamente.');
			});
		},

		errMessage: function(err) {

	    var msg = "Unknown Error...";

	    if(err && err.code) {
	      switch (err.code) {
	        case "EMAIL_TAKEN":
	          msg = "Este e-mail foi tomada."; break;
	        case "INVALID_EMAIL":
	          msg = "Email Inválido."; break;
          case "NETWORK_ERROR":
	          msg = "Erro rede."; break;
	        case "INVALID_PASSWORD":
	          msg = "Senha Inválida."; break;
	        case "INVALID_USER":
	          msg = "Usuário Inválido."; break;
	      }
	    }
			Utils.alertshow("Error",msg);
	},


  };

	return Utils;

});
