const express = require('express');
const cors = require('cors');
const morgan  = require('morgan');
const app = express();
const routes = require('./routes');

app.use(cors());
app.use(morgan('combined'));

// mount routes
app.use('/api/v1', routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
  console.log('Working on port ' + PORT);
});
