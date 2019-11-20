(function () {
    'use strict';

     angular.module('scrumboard.demo')
         .directive('scrumboardCard', CardDirective);

     function CardDirective()
     {
         return {
             templateUrl: '/static/scrumboard/scrumboardCard.html',
             restrict: 'E'
         }
     }

}) ();