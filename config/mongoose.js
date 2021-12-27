const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/OJ');
const db = mongoose.connection;


db.on("error", console.error.bind(console, "error connecting to the MongoDB"));

db.once("open", function () {
  console.log("Connected to the database successfully!");
});

module.exports = db;
