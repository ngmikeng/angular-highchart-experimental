const express = require('express');
const cors = require('cors');
const app = express();
const multiLineChartData = require('./json/multi-line-chart.json');

app.use(cors());

app.get('/api', function (req, res) {
  res.end('api data');
});

app.get('/api/multi-line-chart-data', function (req, res) {
  res.json(multiLineChartData);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
  console.log('Working on port ' + PORT);
});
