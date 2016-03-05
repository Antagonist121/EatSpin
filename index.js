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
				//The names of all restaurants given a postcode
				$scope.restNames = [];
				//The names of all cuisines for the restaurants provided
				$scope.restCuisines = [];
				//A map. Key = cusisine names, Value = Array of restaurant names with that cuisine
				$scope.restCuisineNames = new Object();
				angular.forEach(response, function(value, key) {
					angular.forEach(value.Restaurants, function(restaurant, key) {
						angular.forEach(restaurant.CuisineTypes, function(cuisine, key){
							var cuisineName = cuisine.Name;
							 
							if(this.indexOf(cuisineName) == -1){
								this.push(cuisineName);
							}
							if($scope.restCuisineNames[cuisineName] != undefined){
								$scope.restCuisineNames[cuisineName].push(restaurant.Name);
							} else {
								$scope.restCuisineNames[cuisineName] = [restaurant.Name];
							}
						},$scope.restCuisines);
						this.push(restaurant);

					}, $scope.restNames);
				});	
			});
			rests.showValues = true;
		}
	};
});


app.directive("linearChart", function($window) {
	return{
		restrict: "EA",
	//	template: "<svg width='850' height = '200'></svg>",
		link: function(scope, elem, attrs){
			scope.clickityClick = function(){
				var width = 2000;
				var height = 1000;
				var radius = Math.min(width, height) / 2;
				
				var salesDataToPlot=scope.restCuisines;
				var padding = 20;
				var pathClass = "path";
				var colour, arc, pie, svg, g;

				var d3 = $window.d3;
				var rawSvg = elem.find("svg")[0];
				var svg = d3.select(rawSvg);
				

				function createChart() {
					colour = d3.scale.category20(); 

					arc = d3.svg.arc().outerRadius(radius - 20)
						

					pie = d3.layout.pie().sort(null).value(function(d) { return 1; });

					svg = d3.select("body").append("svg")
						.attr("width", width)
						.attr("height", height)
						.append("g")
						.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

					g = svg.selectAll (".arc")
						.data(pie(salesDataToPlot))
						.enter().append("g")
						.attr("class", "arc");

					g.append("path")
						.attr("d", arc)
						.style("fill", function(d, i) { return colour(i); })
						.transition()
							.ease("bounce")
							.duration(2000)
							.attrTween("d", tweenPie)
						.transition()
							.ease("elastic")
							.delay(function(d, i) {return 2000 + i * 50; })
							.duration(750)
							.attrTween("d", tweenDonut);

		
	

					g.append("text")
						.attr("transform", function(d) { 
							d.outerRadius = radius;
							d.innerRadius = radius/2;
							return "translate(" + arc.centroid(d) + ")rotate(" + angle(d) + ")";
						})
						
						.attr("dy", ".35em")
						.attr("text-anchor", "middle")
						.transition()
							.ease("bounce")
							.delay(function(d, i) {return 2000 + i * 51; })
							.duration(500)
						.text(function(d) {return d.data; });
						
													
							
							


				};

				function tweenPie(b) {
					b.innerRadius = 0;
					var i = d3.interpolate({startAngle: 0, endAngle: 0}, b);
					return function(t) { return arc(i(t)); };
				}

				function tweenDonut(b) {
					b.innerRadius = radius * .4;
					var i = d3.interpolate({innerRadius: 0}, b);
					return function(t) { return arc(i(t)); };
				}
				createChart();

			}
		}
		
	};
});


function angle(d){
	var a = (d.startAngle + d.endAngle) * 90 / Math.PI - 90;

	return a;
}
