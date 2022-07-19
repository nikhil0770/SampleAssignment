const express = require("express");
const app = express();
const { MONGOURI } = require("./keys");
const fs = require("fs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const cors = require("cors");

// app.use(cors());
app.use(express.json());
app.use(bodyParser({ extended: false }));
require("./models/Event");

const { addToDatebase } = require("./routes/PushEventsToDB");
const { getAllEvents, searchResults, sortBy } = require("./routes/EventsRoute");

mongoose.connect(MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Mongoose Connected");
});

const fileData = JSON.parse(fs.readFileSync(__dirname + "/assignment.json"));

//Used this function to add events to Database
// addToDatebase(fileData.EventsList);

//getAllEvents
app.get("/getAllEvents", (req, res) => {
  getAllEvents()
    .then((result) => {
      res.json({ message: result });
    })
    .catch((err) => {
      console.log(err);
      res.json({ status: -1, errorMessage: err });
    });
});

app.post("/searchResults", (req, res) => {
  searchResults(req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/sortBy", (req, res) => {
  sortBy(req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(5000, () => {
  console.log("Server Running at 5000");
});
