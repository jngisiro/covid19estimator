const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const routes = require('./routes');

const app = express();

// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

// setup the logger
app.use(morgan('combined', { stream: accessLogStream }));

app.use(express.json());

app.use('/api/v1', routes);

app.get('/', (req, res) => res.send('Index'));

module.exports = app;
