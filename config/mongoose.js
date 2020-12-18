const keys = require('./keys');
//------- Connecting to MongoDB -----------//
const mongoose = require('mongoose');
mongoose.connect(keys.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Database Connected !!!");
});

module.exports = db;