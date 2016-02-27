//document.getElementById("postcodeLauncher").onclick = doTheThing();


var app = angular.module('myApp', []).controller('customersCtrl', function($scope, $http){

	var rests = this;

	rests.showValues = false;
	rests.setRests = function(){

		if(rests.yourPostcode == undefined){
			alert("You must enter a postcode")
		} else {
			$http.defaults.headers.common['Authorization'] = 'Basic VGVjaFRlc3RBUEk6dXNlcjI=';
			$http.defaults.headers.common['Accept-Tenant'] = 'uk';
			$http.defaults.headers.common['Accept-Version'] = '2';

			$http.get("http://public.je-apis.com/restaurants?q=" + rests.yourPostcode).then(function(response) {
				$scope.restNames = [];
				$scope.restCuisines = [];
				angular.forEach(response, function(value, key) {
					angular.forEach(value.Restaurants, function(restaurant, key) {
						this.push(restaurant);
					
						angular.forEach(restaurant.CuisineTypes, function(cuisine, key){
							var cuisineName = cuisine.Name;
							 
							if(this.indexOf(cuisineName) == -1){
								this.push(cuisineName);
							}
						},$scope.restCuisines);
					}, $scope.restNames);
				});	
			});
			rests.showValues = true;
		}
	};	
});
