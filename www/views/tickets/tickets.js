'Use Strict';
angular.module('RioTrocasApp').controller('ticketsController', function ($scope, $state,$cordovaOauth, $localStorage, $location,$http,$ionicPopup, $firebaseObject, Auth, FURL, FirebaseService, Utils,ionicMaterialMotion) {
    $scope.tickets = [];
    $scope.idSports = [];
    $scope.sports = [];

    // var ref = new Firebase(FURL+"/sports");
    // $scope.sports = FirebaseService.getSportsArray();
    // $scope.sports.$loaded().then(function(sports){
    //     angular.forEach(sports, function(sport, key) {
    //         sport.id = key;
    //     });
    // })

    $scope.tickets = FirebaseService.getTicketsByOwner(Auth.user.uid);
    $scope.tickets.$loaded().then(function (tickets){
        angular.forEach(tickets, function(ticket, key) {
            $scope.sports = FirebaseService.getSportsArray();
            $scope.sports.$loaded().then(function(sports){
                angular.forEach(sports, function(sport, key) {
                    if(ticket.id_sport == sport.$id){
                        ticket.sport_name = sport.name;
                        ticket.icon_sport = sport.icon_directory;
                    }
                });
            });
        });
        // angular.forEach(tickets, function(ticket, key) {
        //         if($scope.idSports.indexOf(ticket.id_sport) === -1)
        //             $scope.idSports.push(ticket.id_sport);

        // });
    });

    $scope.filterSport = function(sport) {
        angular.forEach($scope.idSports, function(idSport, key) {
            return sport.id === idSport;
        });
    };
    $scope.getSportIcon = function(id){
        angular.forEach($scope.sports, function(sport, key) {
            if(id == sport.id){
                return sport.icon_directory;
            }
        });
    };

    $scope.logOut = function () {
      Auth.logout();
      $location.path("/login");
    }

    $scope.viewTicket = function(id){
        console.log(id);
        $state.go('app.ticket',{id:id});
    }

}
);