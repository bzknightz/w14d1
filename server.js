const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

const storeController = require("./controller/store.js");

const app = express();

// PORT
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// use controllers and routes
app.use("/store", storeController);

// connect to database
mongoose.connect(process.env.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
});

mongoose.connection.once("open", () => {
  console.log("connected to mongo");
});

// Server to listen on port
app.listen(PORT, () => {
  console.log("listening");
});
