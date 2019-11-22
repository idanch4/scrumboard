(function () {
    'use strict';

     angular.module('scrumboard.demo')
         .directive('scrumboardCard', CardDirective);

     function CardDirective()
     {
         return {
             templateUrl: '/static/scrumboard/scrumboardCard.html',
             restrict: 'E',
             controller: ['$scope', '$http', function($scope, $http){
                 var url = '/scrumboard/cards/' + $scope.card.id + '/';
                 $scope.update = function() {
                     $http.put(url, $scope.card)
                         .then(function (response) {
                             $scope.card = response.data;
                         }, function() {
                             alert("could not update card");
                         });
                 };

                 $scope.deleteCard = function() {
                     url = '/scrumboard/cards/' + $scope.card.id + '/';
                     $http.delete(url).then(function() {
                         // on success we remove the card from the $scope
                         var cards = $scope.list.cards;
                         cards.splice(cards.indexOf($scope.card), 1);
                     });
                 }
             }]

         }
     }
}) ();