function query1Ctrl($scope, Restangular) {
	Restangular.all('api/categories').getList().then(function(res) {
		$scope.categories = res;
	});
	var q1 = Restangular.all("api/q1")
	$scope.categories = ["Something", "Blah", "Youtube", "Twitter"];
	var body = {};
	$scope.rating = function() {
		body = {"category": $scope.selectedCat };
		console.log("Rating");
		q1.get('rating', body).then(function(res){
			$scope.businesses = res;
		});
	}
	$scope.review = function() {
		console.log("review");
		body = {"category": $scope.selectedCat };
		q1.get('review', body).then(function(res){
			$scope.businesses = res;
		})
	}
	$scope.geo = function() {
		console.log("geo");
		body = {"category": $scope.selectedCat, "lat": $scope.lat, "long": $scope.long};
		q1.get('geo', body).then(function(res){
			$scope.businesses = res;
		})
	}
}

function query2ctrl($scope) {
	$scope.june = function() {
		Restangular.all('api/q2/june').getList().then(function(res){
			$scope.businesses = res;
		})
	}
	$scope.steady = function() {
		Restangular.all('api/q2/steady').getList().then(function(res){
			$scope.businesses = res;
		})
	}
}

function query3Ctrl($scope) {
	Restangular.all('api/businesses').getList().then(function(res) {
		$scope.businesses = res;
	});
	var body = {"businesses": $scope.selectedBus };
	Restangular.all('api/q3').get(body).then(function(res) {
		$scope.reviews = res;	
	})	
}

function query4Ctrl($scope) {
	Restangular.all('api/categories').getList().then(function(res) {
		$scope.categories = res;
	});
	var body = {"category": $scope.selectedCat };
	Restangular.all('api/q4').get(body).then(function(res) {
		$scope.businesses = res;
	});
	
}
function query5Ctrl() {
	Restangular.all('api/q5').getList().then(function(res) {
		$scope.reviews = res;
	});
}
