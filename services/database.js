const mongoose = require('mongoose');

class Database {
    connect() {
        mongoose.set('runValidators', true);
        mongoose.connect(process.env.DATABASE_URL);
    };
};

module.exports = Database;