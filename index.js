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
				
				var curRotate = 0;

				var dataToPlot = scope.restCuisines;
				var coloursToPlot = [];

				var padding = 20;
				var pathClass = "path";

				var d3 = $window.d3;
				var rawSvg = elem.find("svg")[0];
				var colour = d3.scale.category20();
				var arc = d3.svg.arc().outerRadius(radius - 20);
				var pie = d3.layout.pie().sort(null).value(function(d) { return 1;} );
				var svg = d3.select("body").append("svg")
						.attr("width", width)
						.attr("height", height)
						.append("g")
						.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
				var g;		
			/*	var g = svg.selectAll (".arc")
					.data(pie(dataToPlot))
					.enter().append("g")
					.attr("class", "arc")
					.on("click", function(d) { removeData(d);})*/
					
			

				function removeData(dataToRemove){
					var index = dataToPlot.indexOf(dataToRemove.data);
					if(index > -1){
						dataToPlot.splice(index, 1);
						coloursToPlot.splice(index,1);
						createChart(false);
					}
				}

				function createChart(firstTime) {
					g = svg.selectAll (".arc")
						.data(pie(dataToPlot))
						.enter().append("g")
						.attr("class", "arc")
						.on("click", function(d) {removeData(d);});


					if(firstTime){

					g.append("path")
						.attr("d", arc)
						.style("fill", function(d, i) { 		
							coloursToPlot.push(colour(i));
							return coloursToPlot[i]; })
						.transition()
							.ease("bounce")
							.duration(2000)
							.attrTween("d", tweenPie)
						.transition()
							.ease("elastic")
							.delay(function(d, i) {return 2000 + i * 50; })
							.duration(750)
							.attrTween("d", tweenDonut)

						
						/*.transition()
							.delay(5000)
							.duration(2000)
							.attrTween("d", tweenArc(function(d,i) {
								var angleStart = d.endAngle;
								    angleDiff = d.startAngle - d.endAngle;
								
								return {
									startAngle: angleStart,
 									endAngle: angleStart - angleDiff
								};
							}));*/

		
	

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
						.text(function(d) {return d.data; })


					} else {
					g.select("path")
						.attr("d", arc)
						.style("fill", function(d, i) {
							return coloursToPlot[i];
						})
						.transition()
							.duration(0)
							.attrTween("d", tweenDonut)			

					g.select("text")
						.attr("transform", function(d) {
							d.outerRadius = radius;
							d.innerRadius = radius/2;
							return "translate(" + arc.centroid(d) + ")rotate(" + angle(d) + ")";
						})
						.attr("dy", ".35em")
						.attr("text-anchor", "middle")
						.text(function(d) {alert(d.data); return d.data; });

					}

						
					setTimeout(function() { rotateChart(); }, (2750 + (dataToPlot.length * 50)));


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

				function tweenArc(b) {
					return function(a, i) {
						var d = b.call(this, a, i), i = d3.interpolate(a, d);
						for (var k in d) a[k] = d[k];
						return function(t) { return arc(i(t)); };
					};
				}

			
				function rotateChart() {
					g.attr("transform", function(d) {
						return "rotate(" + curRotate + ")";
					})

					if(curRotate == 360){
						curRotate = 0.1;
					} else {
						curRotate+= 0.1;
					}
					
					setTimeout(function() { rotateChart(); }, 25);

				}
			
				createChart(true);

			}
		}
		
	};
});


function angle(d){
	var a = (d.startAngle + d.endAngle) * 90 / Math.PI - 90;

	return a;
}

