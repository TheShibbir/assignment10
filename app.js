
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
require("dotenv").config();

const app = express();

const cors = require("cors");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const hpp = require("hpp");
const xssClean = require("xss-clean");

const router = require("./src/router/api");

// security middleware
app.use(cors());
app.use(helmet());
app.use(hpp());
app.use(xssClean());

// request rate limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);

app.use(morgan("dev"));


app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: false }));

// mongoDB 
const uri = process.env.MONGODB_URI;
mongoose
  .connect(uri, { autoIndex: true })
  .then(() => {
    console.log("mongoDb is successfully connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api/v1", router);


app.use("*", (req, res) => {
  res.status(404).json({
    status: "fail",
    msg: "route not found",
  });
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(err.message);
});

module.exports = app;