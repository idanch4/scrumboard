(function (){
    'use strict';

    angular
        .module('scrumboard.demo')
        .service('Login', ['$http', '$location', Login]);

    function Login($http, $location){
        this.login = login;
        this.isLoggedIn = isLoggedIn;
        this.logout = logout;
        this.redirectIfNotLoggedIn = redirectIfNotLoggedIn;

        function login(credentials){
            var url = '/auth_api/login/';
            return $http.post(url, credentials)
                .then(function(response) {
                    localStorage.currentUser = JSON.stringify(response.data);
                });
        }

        function isLoggedIn(){
            // returns true if currentUser is not empty
            return !! localStorage.currentUser;
        }

        function logout(){
            delete localStorage.currentUser;
            var url = '/auth_api/logout/';
            $http.get(url)
                .then(function() {
                    $location.url('/login');
                });
        }

        function redirectIfNotLoggedIn(){
            if(!isLoggedIn()){
                $location.url('/login');
            }
        }
    }
}) ();