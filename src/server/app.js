const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const routes = require('./routes');

const app = express();

// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  { flags: 'a' }
);

// setup the logger
app.use(
  morgan(':method :url :status :response-time ms', {
    stream: {
      write: (str) => {
        const methodToStatus = str.split(' ').slice(0, 3).join(' ');
        let time = Math.trunc(Number(str.split(' ')[3]));
        if (time < 10) time = `0${time.toString()}`;
        const logStr = `${methodToStatus} ${time}${str.split(' ')[4]}`;
        accessLogStream.write(logStr);
      }
    }
  })
);

app.use(express.json());

//  configure cors
app.use(cors());
app.options('*', cors());

app.use('/api/v1', routes);

app.get('*', (req, res) => res.send('Route Undefined'));

module.exports = app;
