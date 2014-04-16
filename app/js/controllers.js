'use strict';
angular.module('bahmApp.controllers', []).

controller('query1Ctrl', ['$scope', '$http', 
	function() {

	}
]).
controller('query2Ctrl', ['$scope', '$http', 
	function($scope) {
		$scope.categories = ["All Categories"]
	}
]).
controller('query3Ctrl', ['$scope', '$http', 
	function() {

	}
]).
controller('query4Ctrl', ['$scope', '$http', 
	function(){
		
	}
]).
controller('query5Ctrl', ['$scope', '$http', 
	function() {

	}
]);