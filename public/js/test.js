let ctx = document.getElementById("chart0").getContext("2d");
let ctx1 = document.getElementById("chart1").getContext("2d");
let ctx2 = document.getElementById("chart2").getContext("2d");
let ctx3 = document.getElementById("chart3").getContext("2d");

function getRandomColor() {
  let letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function createGradient() {
  grd = ctx.createLinearGradient(0.0, 150.0, 1700.0, 150.0);

  // Add colors
  grd.addColorStop(0.0, "rgba(255, 0, 0, 0.500)");
  grd.addColorStop(0.15, "rgba(255, 0, 255, 0.500)");
  grd.addColorStop(0.33, "rgba(0, 0, 255, 0.500)");
  grd.addColorStop(0.49, "rgba(0, 255, 255, 0.500)");
  grd.addColorStop(0.67, "rgba(0, 255, 0, 0.500)");
  grd.addColorStop(0.84, "rgba(255, 255, 0, 0.500)");
  grd.addColorStop(1.0, "rgba(255, 0, 0, 0.500)");
  return grd;
}

function createChart(data, labels, fillColor, context) {
  /**
   * @param data array of datasets
   * @param context the html element to draw the canvas on
   * @param fillColor  CanvasGradient object the color or gradient to color the object
   */
  let chart = new Chart(context, {
    // The type of chart we want to create
    type: "bar",

    // The data for our dataset
    data: {
      labels: labels,
      datasets: data
    },

    // Configuration options go here
    options: {
      responsive: true,
      aspectRatio: 1.5
    }
  });
  return chart;
}

fetch('/api/dictamenes-por-mes/2019')
.then(function(response) {
  return response.json();
})
.then(function(myJson) {

  console.log(myJson);

  let datasets = [];
  let label = "2019";
  const data = myJson["data"].map(x => x.Total);
  const labels = myJson["data"].map(x => x.Month);

  dataset = {
    label: label,
    data: data,
    backgroundColor: getRandomColor()
  };
  datasets.push(dataset);


  console.log(datasets);
  let fillColor = createGradient();
  let chart = createChart(datasets, labels, fillColor, ctx);
  // let chart1 = createChart([dataset], fillColor, ctx1);
  // let chart2 = createChart([datasets[2]], fillColor, ctx2);
  // let chart3 = createChart([datasets[3]], fillColor, ctx3);
  // let chart = createChart(datasets, fillColor, ctx);
});