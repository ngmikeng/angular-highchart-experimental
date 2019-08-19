const router = require('express').Router();
const multiLineChartData = require('../json/multi-line-chart.json');
const MockTimeSeries = require('../lib/mockTimeSeries');

router.get('/', function (req, res) {
  res.end('mock data api');
});

router.get('/multi-line-chart-data', function (req, res) {
  res.json(multiLineChartData);
});

router.get('/mock-time-series', function (req, res) {
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

module.exports = router;
