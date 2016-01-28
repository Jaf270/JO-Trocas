'Use Strict';
angular.module('RioTrocasApp').controller('ticketsController', function ($scope, $state,$cordovaOauth, $localStorage, $location,$http,$ionicPopup, $firebaseObject, Auth, FURL, FirebaseService, Utils,ionicMaterialMotion) {
    $scope.tickets = [];
    $scope.idSports = [];
    $scope.sports = [];

    var ref = new Firebase(FURL+"/sports");
    $scope.sports = $firebaseObject(ref);
    $scope.uid = Auth.user.uid;
    $scope.tickets = FirebaseService(Auth.user.uid);
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
    // var refTickets = FirebaseService("tickets");
    // $scope.tickets.$loaded().then(function (tickets){
    //     // console.log(Auth.user);
    //     angular.forEach(tickets, function(ticket, key) {
    //         if(ticket.id_owner == Auth.user.uid){
    //             ticket.sport =[];
    //             if($scope.idSports.indexOf(ticket.id_sport) === -1)
    //                 $scope.idSports.push(ticket.id_sport);
    //             $scope.tickets.push(ticket);
    //         }
    //     });
    // }).then(function(){
    //     angular.forEach($scope.idSports,function(idSport){

    //     var refSports = FirebaseService('sports/'+idSport);
    //         refSports.$loaded().then(function (sport){
    //             $scope.sports.push(sport);
    //         });
    //     });
    // });

    $scope.logOut = function () {
      Auth.logout();
      $location.path("/login");
    }

    $scope.viewTicket = function(ticketId){
        $state.go('app.ticket',{id:ticketId});
    }

}
);