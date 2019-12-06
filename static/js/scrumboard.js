(function(){
    'use strict';

    angular.module('scrumboard.demo', ['ngRoute'])
        .controller('ScrumboardController',
            ['$scope', '$http', '$location', ScrumboardController]);

    function ScrumboardController($scope, $http, $location)
    {
        $scope.add = function (
            list, card_title, card_description, story_points, business_value) {

            var card = {
              list: list.id,
              title: card_title,
              description: card_description,
              story_points: story_points,
              business_value: business_value
            };

            // end url with '/' in angular!
            $http.post('/scrumboard/cards/', card)
                .then(function(response) {
                    list.cards.push(response.data);
                }, function () {
                    alert("could not add card.");
                }
            );
        };

        $scope.logout = function() {
          $http.get('/auth_api/logout/').then(
              function() {
                  $location.url('/login');
              }
          );
        };

        $scope.data = [];
        $http.get('/scrumboard/lists/').then(function(response){
            $scope.data = response.data;
        });

        $scope.sortBy = 'story_points';
        $scope.reverse = true;
        $scope.showFilter = false;
    }
})();