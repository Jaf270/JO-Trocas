angular.module('RioTrocasApp').factory('FirebaseService', function(FURL, $firebaseArray, $firebaseObject, Utils) {

    var ref = new Firebase(FURL);
    var base = {
      getTicketsByOwner : function (uid){
        return $firebaseObject(ref.child("tickets").orderByChild("id_owner").equalTo(uid));
      },
      getTicketsExchangeRequest : function (uid){
        return true;
      },
      getTicketsExchangeableBySport : function (idSport){
        return $firebaseArray(ref.child("tickets").orderByChild("id_sport").equalTo(idSport));
      },
      getTicket : function(id){
        return $firebaseObject(ref.child("tickets").child(id));
      },
      getSport : function(id){
        return $firebaseObject(ref.child("sports").child(id).orderByChild("name"));
      },
      getSports : function(id){
        return $firebaseObject(ref.child("sports"));
      },
      getSportsArray : function(id){
        return $firebaseArray(ref.child("sports"));
      }
    }

    return base;

});
