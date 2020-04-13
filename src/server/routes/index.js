const { Router } = require('express');

const {
  jsonController,
  xmlController,
  logsController
} = require('../controllers');

const router = Router();

router.get('/', (req, res) => res.send('Home Route'));

router.post('/on-covid-19/', jsonController);

router.post('/on-covid-19/json', jsonController);

router.post('/on-covid-19/xml', xmlController);

router.get('/on-covid-19/logs', logsController);

module.exports = router;
