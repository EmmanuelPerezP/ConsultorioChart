let ctx = document.getElementById("chart0").getContext("2d");
let ctx1 = document.getElementById("chart1").getContext("2d");
let ctx2 = document.getElementById("chart2").getContext("2d");
let ctx3 = document.getElementById("chart3").getContext("2d");
let ctx4 = document.getElementById("chart4").getContext("2d");
let ctx5 = document.getElementById("chart5").getContext("2d");

const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre","Octubre", "Noviembre", "Diciembre"];
const daysOfWeek = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];


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

function parseData(myJson, label) {
  /**
   * @param array json array returned from api with format { data: [{Year: 2017, Month: 2, Total: 8}, {Year: 2017, Month: 2, Total: 8}]}
   * @param label the label for the dataset str
   */
  // make a 12 element array for the months
  let data = new Array(12).fill(0);
  // make each element of the array correspond to a month and their value according to data
  for (let obj of myJson["data"]) {
    // -1 because the first month is at index 0
    data[obj.Month-1] = obj.Total;
  }
  dataset = {
    label: label,
    data: data,
    backgroundColor: getRandomColor()
  };
  return dataset;
}


async function mainChart() {
  let datasets = [];

  let response = await fetch('/api/dictamenes-por-mes/2017')
  let myJson = await response.json();
  let label = "2017";
  datasets.push(parseData(myJson, label))

  response = await fetch('/api/dictamenes-por-mes/2018')
  myJson = await response.json();
  label = "2018";
  datasets.push(parseData(myJson, label))

  response = await fetch('/api/dictamenes-por-mes/2019')
  myJson = await response.json();
  label = "2019";
  datasets.push(parseData(myJson, label));

  let fillColor = createGradient();
  let chart = createChart(datasets, months, fillColor, ctx);
}
mainChart();


fetch('/api/dictamenes-por-mes/2019')
.then(function(response) {
  return response.json();
})
.then(function(myJson) {
  let datasets = [];
  let label = "2019";
  datasets.push(parseData(myJson, label));
  let fillColor = createGradient();
  let chart = createChart(datasets, months, fillColor, ctx1);
});

fetch('/api/dictamenes-por-mes/2017')
.then(function(response) {
  return response.json();
})
.then(function(myJson) {
  let datasets = [];
  let label = "2017";
  datasets.push(parseData(myJson, label));
  let fillColor = createGradient();
  let chart = createChart(datasets, months, fillColor, ctx2);
});

fetch('/api/dictamenes-por-mes/2018')
.then(function(response) {
  return response.json();
})
.then(function(myJson) {
  let datasets = [];
  let label = "2018";
  datasets.push(parseData(myJson, label));
  let fillColor = createGradient();
  let chart = createChart(datasets, months, fillColor, ctx3);
});

async function diasSemana() {
  let datasets = [];

  let response = await fetch('/api/dictamenes-por-dia-semana/');
  let myJson = await response.json();
  let label = "Dias de la semana";
  myJson.data.shift();

  let data = myJson.data.map(x => x.Total);

  dataset = {
    label: label,
    data: data,
    backgroundColor: getRandomColor()
  }

  datasets.push(dataset);

  let fillColor = createGradient();
  let chart = createChart(datasets, daysOfWeek, fillColor, ctx4);
}
diasSemana();

async function diasMes() {
  let datasets = [];

  let response = await fetch('/api/dictamenes-por-dia-mes/');
  let myJson = await response.json();
  let label = "Dias del mes";
  console.log(myJson);
  myJson.data.shift();

  let data = myJson.data.map(x => x.Total);
  let labels = myJson.data.map(x => x.DayOfMonth);

  dataset = {
    label: label,
    data: data,
    backgroundColor: getRandomColor()
  }

  datasets.push(dataset);

  console.log(datasets);

  let fillColor = createGradient();
  let chart = createChart(datasets, labels, fillColor, ctx5);
}
diasMes();