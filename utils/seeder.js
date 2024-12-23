// This is disposable code to populate the database with dummy data. DO NOT USE IN PRODUCTION. DO NOT TEST
const dotenv = require('dotenv');
dotenv.config();
const Database = require('../services/database');
database = new Database();
const Redirection = require('../models/redirection');

database.connect();

Redirection.deleteMany({});

// SCHEDULE
const redirection1 = new Redirection({
    redirectionID: 'SignUp01',
    locationDescription: 'Bryan\'s mobile sign up qr code',
    urlRedirection: 'https://member.life/thewoodlandslatindance/register',
});
redirection1.save();


const redirection2 = new Redirection({
    redirectionID: 'GoogleReviews01',
    locationDescription: 'Bryan\'s mobile google review qr code',
    urlRedirection: 'https://g.page/r/CZjClEn1PQilEBM/review',
});
redirection2.save();

//process.exit(0);