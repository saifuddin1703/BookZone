const express = require('express');
const app = express();
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const routes = require('./routes');
const globalErrorController = require('./utils/errorHandler')

app.use(morgan('dev'));
dotenv.config({ path: './config.env' });
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', routes);

app.use(globalErrorController);

module.exports = app;
