if(process.env.NODE_ENV !== 'production') require('dotenv').config();
const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const flash = require('connect-flash');
const { ExpressError, errorHandler } = require('./utils/ErrorHandler');

const Database = require('./services/database');

const homepageRouter = require('./routes/homepage');
const newsletterRouter = require('./routes/newsletter');
const studentResourcesRouter = require('./routes/studentResources');

const db = new Database();
db.connect();

const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, './public')));

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride('_method'));

app.use('/', homepageRouter);
app.use('/newsletter', newsletterRouter);
app.use('/studentResources', studentResourcesRouter);

app.all('*', (req, res, next) => {
    next(new ExpressError('Page not found', 404));
});

app.use(errorHandler);

module.exports = app;