toRad = function(num) {
    return num * Math.PI / 180;
 }

function query1Ctrl($scope, Restangular) {
	Restangular.all('api/categories').getList().then(function(res) {
		$scope.categories = res;
	});
	var q1 = Restangular.all("api/q1")
	$scope.lat = "33.666585";
	$scope.long = "-112.196462";
	$scope.orderBy = '';
	$scope.rating = function() {
		if($scope.selectedCat != undefined){
			Restangular.one("api/q1/rating", $scope.selectedCat.categoryName).one("lat", $scope.lat).one("long", $scope.long).get().then(function(res){
				$scope.businesses = res;
				var tBus = [];
				for(var i = 0, len = $scope.businesses.length; i < len; i++)
				{
					$scope.businesses[i].distance = calcDistance($scope.businesses[i].latitude, $scope.businesses[i].longitude, $scope.lat, $scope.long);
					if($scope.businesses[i].distance <= 10)
					{
						tBus.push($scope.businesses[i]);
					}
				}
				console.log("Res: " + JSON.stringify(res));
				$scope.businesses = tBus;
			});
		}
	}
	$scope.review = function() {
		if($scope.selectedCat != undefined){
			Restangular.one("api/q1/review", $scope.selectedCat.categoryName).one("lat", $scope.lat).one("long", $scope.long).get().then(function(res){
				$scope.businesses = res;
				var tBus = [];
				for(var i = 0, len = $scope.businesses.length; i < len; i++)
				{
					$scope.businesses[i].distance = calcDistance($scope.businesses[i].latitude, $scope.businesses[i].longitude, $scope.lat, $scope.long);
					if($scope.businesses[i].distance <= 10)
					{
						tBus.push($scope.businesses[i]);
					}
				}
				$scope.businesses = tBus;
			});
		}
	}
	$scope.geo = function() {
		if($scope.selectedCat != undefined){
			Restangular.one("api/q1/geo", $scope.selectedCat.categoryName).one("lat", $scope.lat).one("long", $scope.long).get().then(function(res){
				$scope.businesses = res;
				var tBus = [];
				for(var i = 0, len = $scope.businesses.length; i < len; i++)
				{
					$scope.businesses[i].distance = calcDistance($scope.businesses[i].latitude, $scope.businesses[i].longitude, $scope.lat, $scope.long);
					if($scope.businesses[i].distance <= 10)
					{
						tBus.push($scope.businesses[i]);
					}
				}
				$scope.businesses = tBus;

			});
		}
		//Modify results to fully filter by 10 mile radius
	}
}

function calcDistance(lat1, long1, lat2, long2){
	var R = 3958.7546411; // conversion factor
	var deltaLat = toRad(lat2-lat1);
	var deltalong = toRad(lat2-lat1);
	var lat1 = toRad(lat1);
	var lat2 = toRad(lat2);

	var a = Math.sin(deltaLat/2) * Math.sin(deltaLat/2) + Math.sin(deltalong/2) * Math.sin(deltalong/2) * Math.cos(lat1) * Math.cos(lat2); 
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	var Dist = R * c ;
	return Dist;
}

function query2Ctrl($scope, Restangular) {
	$scope.june = function() {
		$scope.steadyQuery = false;
		Restangular.all("api/q2").get("june").then(function(res){
			$scope.businesses = res;
		})
	}
	$scope.steady = function() {
		$scope.steadyQuery = true;
		Restangular.all("api/q2").get("steady").then(function(res){
			$scope.businesses = res;

		})
	}
}

function query3Ctrl($scope, Restangular) {
	Restangular.all('api/businesses').getList().then(function(res) {
		/*$scope.businesses = [];
		for(var i = 0, len = res.length; i < len; i++)
		{
			$scope.businesses[i] = JSON.stringify(res[i]);
		}*/

		$scope.businesses = res;
	});
	$scope.submit = function() {
		if($scope.selectedCat != undefined){
			console.log("Bus: " + JSON.stringify($scope.selectedCat));
			Restangular.one('api/q3', $scope.selectedCat.business_id).get().then(function(res){
				$scope.reviews = res;	
			})	
		}
	}
}

function query4Ctrl($scope, Restangular) {
	Restangular.all('api/categories').getList().then(function(res) {
		$scope.categories = res;
	});
	var body = {"category": $scope.selectedCat };
	$scope.submit = function() {
		if($scope.selectedCat != undefined){
			Restangular.one('api/q4', $scope.selectedCat.categoryName).get().then(function(res){
				$scope.businesses = res;
			});
		}
	}
	
}
function query5Ctrl($scope, Restangular) {
	Restangular.all('api/q5').getList().then(function(res) {
		$scope.reviews = res;
	});
}