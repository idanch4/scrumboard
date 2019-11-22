(function(){
    'use strict';

    angular.module('scrumboard.demo', [])
        .controller('ScrumboardController', ['$scope', '$http', ScrumboardController]);

    function ScrumboardController($scope, $http)
    {
        $scope.add = function (list, card_title, card_description) {

            var card = {
              list: list.id,
              title: card_title,
              description: card_description
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

        $scope.login = function(){
            $http.post('/auth_api/login/', {
                username: 'idanch4',
                password: '13243214i'
            })
        };

        $scope.data = [];
        $http.get('/scrumboard/lists/').then(function(response){
            $scope.data = response.data;
        });
    }
})();