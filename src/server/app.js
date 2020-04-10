const express = require('express');

const routes = require('./routes');

const app = express();

app.use(express.json());

app.use('/api/v1', routes);

app.get('/', (req, res) => res.send('Index'));

module.exports = app;
