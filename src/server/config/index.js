const dotenv = require('dotenv');

dotenv.config({ path: './../../config.env' });

module.exports = {
  local_url: process.env.APP_URL_LOCAL || 'http://localhost:3000',
  hosted_url: process.env.APP_URL_HOSTED || 'http://localhost:3000',
  environment: process.env.NODE_ENV || 'development',
  development: process.env.NODE_ENV === 'development',
  production: process.env.NODE_ENV === 'production',
  test: process.env.NODE_ENV === 'test',
  port: process.env.PORT || 3020
};
