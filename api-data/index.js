const express = require('express');
const cors = require('cors');
const morgan  = require('morgan');
const app = express();
const multiLineChartData = require('./json/multi-line-chart.json');

app.use(cors());
app.use(morgan('combined'));

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
