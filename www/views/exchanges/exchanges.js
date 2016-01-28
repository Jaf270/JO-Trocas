'Use Strict';
angular.module('RioTrocasApp').controller('exchangesController', function ($scope, $state,$cordovaOauth, $localStorage, $location,$http,$ionicPopup, $firebaseObject, Auth, FURL, FirebaseService, Utils,ionicMaterialMotion) {
    $scope.tickets = [];
    $scope.sports = [];

    // var ref = new Firebase(FURL+"/sports");
    // $scope.sports = $firebaseObject(ref);

    $scope.tickets = FirebaseService.getTicketsByOwner(Auth.user.uid);
    $scope.tickets.$loaded().then(function (tickets){
        angular.forEach(tickets, function(ticket, key) {
                if($scope.idSports.indexOf(ticket.id_sport) === -1)
                    $scope.idSports.push(ticket.id_sport);
        });
    });

    $scope.filterSport = function(id) {
      return function( item ) {
         angular.forEach($scope.idSports, function(idSport, key) {
                return id === idSport;
        });
      };
    };

    $scope.accept = function (idTicket) {

    }

    $scope.refuse = function(idTicket){

    }

}
);