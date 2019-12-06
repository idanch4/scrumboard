(function () {
    'use strict';

     angular.module('scrumboard.demo')
         .directive('scrumboardCard', CardDirective);

     function CardDirective()
     {
         return {
             templateUrl: '/static/html/scrumboardCard.html',
             restrict: 'E',
             controller: ['$scope', '$http', function($scope, $http){

                 $scope.desList = $scope.list;
                 var url = '/scrumboard/cards/' + $scope.card.id + '/';

                 $scope.update = function() {
                     return $http.put(
                         url,
                         $scope.card
                     );
                 };

                 function removeFromList(card, list) {
                     var cards = list.cards;
                     cards.splice(
                         cards.indexOf(card),
                         1
                     );
                 }

                 $scope.deleteCard = function() {
                     $http.delete(url).then(function() {
                         // on success we remove the card from the $scope
                         removeFromList($scope.card, $scope.list);
                     });
                 };

                 $scope.move = function() {
                    var card = $scope.card;
                    card.list = $scope.desList.id;
                    $scope.update().then(
                        function() {
                            removeFromList($scope.card, $scope.list);
                            $scope.desList.cards.push(card);
                        }, function (){
                        alert("Could not change the list");
                    });
                 };
             }]

         }
     }
}) ();