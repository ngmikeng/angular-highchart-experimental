const Series = require("time-series-data-generator");

class MockTimeSeries {

  constructor() {}

  sampleData(options) {
    options = options ? options : {};
    const opts = {};
    opts.interval = options.interval || 60;

    const series = new Series(opts);
    let result = series.sin();
    if (options.methodType === 'gaussian') {
      result = series.gaussian();
    } else if (options.methodType === 'cos') {
      result = series.cos();
    }
    return result;
  }
}

module.exports = MockTimeSeries;
