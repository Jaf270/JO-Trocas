'Use Strict';
angular.module('RioTrocasApp').controller('ticketController', function ($scope, $state,$cordovaOauth, $localStorage,$ionicTabsDelegate,$ionicPopup, $location,$http,$stateParams,$ionicModal,FirebaseService,$firebase, $firebaseObject, Auth, FURL, Utils,ionicMaterialMotion) {
    var ticketId = $stateParams.id;
    $scope.uid = Auth.user.uid;
    FirebaseService.getTicket(ticketId).$bindTo($scope,'ticket');
    FirebaseService.getTicket(ticketId).$loaded().then(function(){
        $scope.sport =FirebaseService.getSport($scope.ticket.id_sport);
        $scope.sport.$loaded().then(function(sport){
        });
    });

    // $scope.ticket.$on('change', function(){
        // console.log("hayaa ",  $scope.ticket);
        // $scope.ticket.$save();
    // })
    $ionicModal.fromTemplateUrl('views/exchange-process/exchange-process.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });

    // Cleanup the modal when we're done with it
    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });
    $scope.$on('modal.shown', function() {
        $ionicTabsDelegate.select(1);
    });

    $scope.cancel = function(){
        $scope.modal.hide();
    }
    $scope.trocarAgora = function(id) {
        $scope.selectedTicket = $scope.ticket;
        $scope.modal.show();
    };



    /*** FOR MODAL CONTROLLER **/
    // First step
    $scope.tickets = FirebaseService.getTicketsByOwner(Auth.user.uid);
    // list of sports to select in tab 1 (Modalidade)
    $scope.sports = FirebaseService.getSports();
    // list of owner tickets to select in tab 0 (Meu ingresso)
    $scope.tickets.$loaded().then(function (tickets){
        angular.forEach(tickets, function(ticket, key) {
            $scope.sports.$loaded().then(function(sports){
                angular.forEach(sports, function(sport, key) {
                    if(ticket.id_sport == key)
                        ticket.icon_sport = sport.icon_directory;
                });
            });
        });
    });

    // Second step
    $scope.selectedSport = false;
    $scope.ticketsToExchange = [];
    $scope.getListTicketsToExchange = function (idSport){
        $scope.selectedSport = FirebaseService.getSport(idSport);
        //Go to tab Ingresso
        $ionicTabsDelegate.select(2);
        // Load list of ticket to exchange
        $scope.ticketsToExchange = FirebaseService.getTicketsExchangeableBySport(idSport);
    }

    // Third step
    $scope.selectedTicketToExchange = false;
    $scope.resumeExchange = function (idTicket){
        $scope.selectedTicketToExchange = FirebaseService.getTicket(idTicket);
        $scope.selectedTicketToExchange.$loaded().then(function(){
            var myPopup = $ionicPopup.show({
                template: '<p class="im-wrapper"> Você confirma que quer trocar seu ingresso <strong class="balanced">'+$scope.selectedTicket.description+'</strong> para <strong  class="balanced">'+$scope.selectedTicketToExchange.description+'</strong> ??? </p>',
                title: 'Resumo troca',
                scope: $scope,
                buttons: [
                    { text: 'NÃO' ,
                      type: 'button-light'
                    },
                    {
                      text: '<b>SIM</b>',
                      type: 'button-balanced',
                      onTap: function(e) {
                        //don't allow the user to close unless he enters wifi password
                        e.preventDefault();
                        return true;
                      }
                    }
                ]
            });
        });
    }
}
);
