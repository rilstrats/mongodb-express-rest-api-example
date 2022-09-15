const { MongoClient } = require("mongodb");
const connectionString = process.env.ATLAS_URI;
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbConnection;

module.exports = {
  connectToServer: function(callback) {
    client.connect(function(err, db) {
      if (err || !db) {
        return callback(err);
      }

      dbConnection = db.db("sample_airbnb");
      console.log("Successfully connected to MongoDB.");

      return callback();
    });
  },

  getDb: function() {
    return dbConnection;
  },
};

const express = require("express");
const recordRoutes = express.Router();

recordRoutes.route("/listings").get(async function(req, res) {
  const dbConnect = dbo.getDb();

  dbConnect
    .collection("listingsAndReviews")
    .find({}).limit(50)
    .toArray(function(err, result) {
      if (err) {
        res.status(400).send("Error fetching listings!");
      } else {
        res.json(result);
      }
    });
});

