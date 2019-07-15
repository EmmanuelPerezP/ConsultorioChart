var ctx = document.getElementById('chart0').getContext('2d');
var ctx1 = document.getElementById('chart1').getContext('2d');
var ctx2 = document.getElementById('chart2').getContext('2d');
var ctx3 = document.getElementById('chart3').getContext('2d');

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


function createGradient(){
      grd = ctx.createLinearGradient(0.000, 150.000, 1700.000, 150.000);
      
      // Add colors
      grd.addColorStop(0.000, 'rgba(255, 0, 0, 0.500)');
      grd.addColorStop(0.150, 'rgba(255, 0, 255, 0.500)');
      grd.addColorStop(0.330, 'rgba(0, 0, 255, 0.500)');
      grd.addColorStop(0.490, 'rgba(0, 255, 255, 0.500)');
      grd.addColorStop(0.670, 'rgba(0, 255, 0, 0.500)');
      grd.addColorStop(0.840, 'rgba(255, 255, 0, 0.500)');
      grd.addColorStop(1.000, 'rgba(255, 0, 0, 0.500)');
      return grd;
}

function parseData(results) {
    /**
     * @param {data} results the results from papa.parse
     * @return {data} the data parsed
     */

    let fillColor = createGradient();
    let datasetsPerYear = [];
    let year = new Array(12).fill(0);
    // results["data"][index] = ["860363", "SEDIMEC", "Dictámenes Licencia", "273823", "V8KAF156270", "MED4581", "2019-07-09 15:40:10.0", "0", "3", "3", "5800.00", "19428.00", "GREENPAY"]
    let currentYear = 2016;  // first year
    for (let index = 1; index < results["data"].length; index++) {
        const dateString = results["data"][index][6];   // time string
        var date = new Date(dateString);
        if (currentYear != date.getFullYear()) {    // this algorithm asumes dataset is ordered by date
            dataset = {
                label: currentYear,
                data: year,
                backgroundColor: getRandomColor(),
            }
            datasetsPerYear.push(dataset);
            year = new Array(12).fill(0);
            currentYear = date.getFullYear();
        }
        year[date.getMonth()] += parseInt(results["data"][index][8]);
    }
    // push last year
    dataset = {
        label: currentYear,
        data: year,
        backgroundColor: getRandomColor(),
    }
    datasetsPerYear.push(dataset);

    return datasetsPerYear;
}


function createChart(data, fillColor, context) {
    /**
     * @param data create a chart from the parsed data
     * @param context the html element to draw the canvas on
     * @param fillColor  CanvasGradient object the color or gradient to color the object
     */
    let chart = new Chart(context, {
        // The type of chart we want to create
        type: 'bar',

        // The data for our dataset
        data: {
            labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre","Octubre", "Noviembre", "Diciembre"],
            datasets: data
        },

        // Configuration options go here
        options: {
            responsive: true,
            aspectRatio: 1.5,
        }
    });
    return chart;
}

Papa.parse("Reporte.csv", {
	download: true,
	complete: function(results) {
        let datasets = parseData(results);
        console.log(datasets);
        let fillColor = createGradient();
        let chart = createChart(datasets, fillColor, ctx);
        let chart1 = createChart([datasets[1]], fillColor, ctx1);
        let chart2 = createChart([datasets[2]], fillColor, ctx2);
        let chart3 = createChart([datasets[3]], fillColor, ctx3);
        // let chart = createChart(datasets, fillColor, ctx);
	}
});




