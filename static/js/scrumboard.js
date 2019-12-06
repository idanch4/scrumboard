(function(){
    'use strict';

    angular.module('scrumboard.demo', ['ngRoute'])
        .controller('ScrumboardController',
            ['$scope', '$http', 'Login', ScrumboardController]);

    function ScrumboardController($scope, $http, Login)
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

            $http.post('/scrumboard/cards/', card)
                .then(function(response) {
                    list.cards.push(response.data);
                }, function () {
                    alert("could not add card.");
                }
            );
        };

        Login.redirectIfNotLoggedIn();

        $scope.logout = Login.logout;
        $scope.data = [];
        $scope.sortBy = 'story_points';
        $scope.reverse = true;
        $scope.showFilter = false;

        $http.get('/scrumboard/lists/').then(function(response){
            $scope.data = response.data;
        });
    }
})();