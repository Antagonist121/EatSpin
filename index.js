//document.getElementById("postcodeLauncher").onclick = doTheThing();


function doTheThing(){
	var app = angular.module('myApp', []);
	app.controller('customersCtrl', function($scope, $http){
			
		$http.defaults.headers.common['Authorization'] = 'Basic VGVjaFRlc3RBUEk6dXNlcjI=';
		$http.defaults.headers.common['Accept-Tenant'] = 'uk';
		$http.defaults.headers.common['Accept-Version'] = '2';

		$http.get("http://public.je-apis.com/restaurants?q=ng13gy").then(function(response) {
			$scope.myData = [];
			angular.forEach(response, function(value, key) {
				angular.forEach(value.Restaurants, function(restaurant, key) {
					this.push(restaurant);
				}, $scope.myData);
			});	
		});
	});
	var myString = 
		["<ul>",
		"	<li ng-repeat=\"x in myData\">",
		"		{{ x.Name }}",
		"	</li>",
		"</ul>"].join('\n');

	document.getElementById("theCode").innerHTML = myString;
	alert("dun");
}
