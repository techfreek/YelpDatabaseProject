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

function query2Ctrl($scope, Restangular) {
	$scope.june = function() {
		Restangular.all("api/q2").get("june").then(function(res){
			$scope.businesses = res;
		})
	}
	$scope.steady = function() {
		Restangular.all("api/q2").get("steady").then(function(res){
			$scope.businesses = res;
		})
	}
}

function query3Ctrl($scope, Restangular) {
	Restangular.all('api/businesses').getList().then(function(res) {
		$scope.businesses = res;
	});
	$scope.submit = function() {
		var body = {"businesses": $scope.selectedBus };
		Restangular.all('api/q3').get(body).then(function(res) {
			$scope.reviews = res;	
		})	
	}
}

function query4Ctrl($scope, Restangular) {
	Restangular.all('api/categories').getList().then(function(res) {
		$scope.categories = res;
	});
	var body = {"category": $scope.selectedCat };
	Restangular.all('api/q4').get(body).then(function(res) {
		$scope.businesses = res;
	});
	
}
function query5Ctrl($scope, Restangular) {
	Restangular.all('api/q5').getList().then(function(res) {
		$scope.reviews = res;
	});
}