'Use Strict';
angular.module('RioTrocasApp').controller('exchangeProcessController', function ($scope, $state,$cordovaOauth, $localStorage, $location,$http,$ionicPopup, $firebaseObject, Auth, FURL, FirebaseService, Utils,ionicMaterialMotion) {

    $scope.tickets = FirebaseService.getTicketsByOwner(Auth.user.uid);
    $scope.tickets.$loaded().then(function (tickets){
        angular.forEach(tickets, function(ticket, key) {
                if($scope.idSports.indexOf(ticket.id_sport) === -1)
                    $scope.idSports.push(ticket.id_sport);

        });
    });
    $scope.sports = FirebaseService.getSports();

    $scope.getTicketsToExchange = function (idSport){
        $scope.ticketsToExchange = FirebaseService.getTicketsBySport(idSport);
    }

}
);