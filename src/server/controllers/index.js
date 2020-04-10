const xml = require('object-to-xml');
const fs = require('fs');
const path = require('path');


const estimator = require('../../estimator');

exports.jsonController = (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res
      .status(400)
      .json({ status: 'Fail', error: 'Please provide input data' });
  }

  return res.status(200).json({ status: 'Success', ...estimator(req.body) });
};

exports.xmlController = (req, res) => {
  res.set('Content-Type', 'text/xml');

  if (Object.keys(req.body).length === 0) {
    res.status(400);
    return res.send(
      xml({
        '?xml version="1.0" encoding="utf-8"?': null,
        error: { status: 'fail', error: 'Please provide input data' }
      })
    );
  }

  return res
    .type('application/xml')
    .status(200)
    .send(
      xml({
        '?xml version="1.0" encoding="utf-8"?': null,
        response: estimator(req.body)
      })
    );
};

exports.logsController = (req, res) => {
  fs.readFile(path.join(__dirname, '../access.log'), 'utf8', (err, data) => {
    if (err) return res.status(404).json({ status: 'fail', error: 'Log files not found' });

    return res.type('text/plain').status(200).send(data);
  });
};
