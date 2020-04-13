const chalk = require('chalk');
const config = require('./config');
const app = require('./app');

app.listen(config.port, () => {
  console.log(`${chalk.yellowBright(
    `👉👉   Project running on http://localhost:${config.port}`
  )}
  `);
});
