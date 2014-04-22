function query1Ctrl($scope, Restangular) {
	Restangular.all('api/categories').getList().then(function(res) {
		$scope.categories = res;
	});
	var q1 = Restangular.all("api/q1")
	//$scope.categories = ["Something", "Blah", "Youtube", "Twitter"];
	var body = {};
	$scope.rating = function() {
		body = {"category": $scope.selectedCat };
		console.log("Rating");
		Restangular.one('api/q1/rating', $scope.selectedCat.categoryName).get().then(function(res){
			$scope.businesses = res;
			console.log("res: " + res);
		});
	}
	$scope.review = function() {
		console.log("review");
		body = {"param": $scope.selectedCat };
		console.log("body: " + body);
		Restangular.one('api/q1/review', $scope.selectedCat.categoryName).get().then(function(res){
			$scope.businesses = res;
		})
	}
	$scope.geo = function() {
		console.log("geo");
		Restangular.one("api/q1/geo", $scope.selectedCat.categoryName).one("lat", $scope.lat).one("long", $scope.long).get().then(function(res){
			$scope.businesses = res;
		})
		//Modify results to fully filter by 10 mile radius
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
