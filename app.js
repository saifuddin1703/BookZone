const path = require('path');
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const routes = require('./routes');
const viewRoute = require('./routes/view');
const globalErrorController = require('./utils/errorHandler');
const AppError = require('./utils/AppError');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean'); 
const hpp = require('hpp'); 
const cors = require('cors');
const pug = require('pug');
const cookieParser = require('cookie-parser');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//rate limiter
const limiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour window
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after an hour'
});

if (process.env.NODE_ENV.trim() === 'development') {
    app.use(morgan('dev'));
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use(express.static(path.join(__dirname,'public'))); // serving static files
// sanitize data against NoSQL query injection
app.use(mongoSanitize());

// sanitize data against XSS
app.use(xss());

// prevent parameter pollution
app.use(hpp({
    whitelist: [
        'format',
        'book_depository_stars',
        'price',
        'category',
    ],
}));

// setting security HTTP headers
app.use(helmet(
    {
        contentSecurityPolicy: false,
    }
));

// rate limiter middleware
app.use('/api',limiter); 

app.use('/api', routes);
app.use('/', viewRoute);



// if request is not handled by any route
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorController);

module.exports = app;
