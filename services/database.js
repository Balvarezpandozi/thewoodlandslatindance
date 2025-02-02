const mongoose = require("mongoose");
const MongoDBStore = require("connect-mongo");

class Database {
  connect() {
    mongoose.set("runValidators", true);
    mongoose.connect(process.env.DATABASE_URL);
  }

  createMongoStore() {
    const mongoStore = MongoDBStore.create({
      mongoUrl: process.env.DATABASE_URL,
      crypto: {
        secret: process.env.SESSION_SECRET,
      },
      touchAfter: 24 * 60 * 60, //Time period in seconds
    });
    return mongoStore;
  }
}

module.exports = Database;
