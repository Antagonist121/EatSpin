/*var ctx = document.getElementById("myChart").getContext("2d");
var data = [
	{
		value: 300,
		color:"#F7464A",
		highlight: "#FF5A5E",
		label: "Red"
	},
	{
		value: 50,
		color:"#46BFBD",
		highlight: "#5AD3D1",
		label: "Green"
	},
	{
		value: 10,
		color: "#FDB45C",
		highlight: "#FFC870",
		label: "Yellow"
	}
]

var myDoughnutChart = new Chart(ctx).Doughnut(data, {
				animateScale: true
				});
var i = 1;
      // Load the Visualization API and the corechart package.
      google.charts.load('current', {'packages':['corechart']});

      // Set a callback to run when the Google Visualization API is loaded.
      google.charts.setOnLoadCallback(drawChart);

      // Callback that creates and populates a data table,
      // instantiates the pie chart, passes in the data and
      // draws it.
      function drawChart() {

      	// Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Topping');
        data.addColumn('number', 'Slices');
        data.addRows([
          ['Mushrooms', 1],
          ['Onions', 1],
          ['Olives', 1],
          ['Zucchini', 1],
          ['Pepperoni', 1]
        ]);

        // Set chart options
        var options = { 'title':'How Much Pizza I Ate Last Night',
                        'width':400,
                        'height':300,
			'pieHole':0.4,
			'enableInteractivity':false
	};

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
        chart.draw(data, options);
      }


function loadNewChart(){


	// Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Topping');
        data.addColumn('number', 'Slices');
        data.addRows([
          ['Mushrooms', 1],
          ['Onions', 1],
          ['Olives', 1],
          ['Zucchini', 1],
          ['Pepperoni', 1]
        ])
	var options = { 'title':'How Much Pizza I Ate Last Night',
        	        	'width':400,
                	        'height':300,
				'pieHole':0.4,
				'enableInteractivity':false,
				'pieStartAngle':i
	       				};
       	var chart = new google.visualization.PieChart(document.getElementById('chart_div'));		
	chart.draw(data,options);
	i++;
}
*/
function loadNewChart(){

	d3.select("helloworld").append("p").text("yay");
}