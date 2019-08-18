const express = require('express');
const cors = require('cors');
const morgan  = require('morgan');
const app = express();
const multiLineChartData = require('./json/multi-line-chart.json');
const MockTimeSeries = require('./lib/mockTimeSeries');

app.use(cors());
app.use(morgan('combined'));

app.get('/api', function (req, res) {
  res.end('api data');
});

app.get('/api/multi-line-chart-data', function (req, res) {
  res.json(multiLineChartData);
});

app.get('/api/mock-time-series', function (req, res) {
  const mockTimeSeries = new MockTimeSeries();
  const numberOfMapping = 5;
  let mockSerriesData = [];
  for (let index = 0; index < numberOfMapping; index++) {
    const mockData = mockTimeSeries.sampleData({ methodType: 'gaussian' });
    mockSerriesData.push(mockData);
  }
  const result = mockSerriesData[0].map((data, objIndex) => {
    const arrItem = [data.timestamp, data.value];
    for (let index = 1; index < mockSerriesData.length; index++) {
      arrItem.push(mockSerriesData[index][objIndex].value);
    }
    return arrItem;
  });
  res.json({
    data: result
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
  console.log('Working on port ' + PORT);
});
