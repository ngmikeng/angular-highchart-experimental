const router = require('express').Router();
const mockRoute = require('./mock');

router.use('/mock', mockRoute);

module.exports = router;
