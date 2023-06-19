const express = require("express");
const cors = require("cors");
const app = express();
let bodyParser = require('body-parser');
let dbConfig = require('./database/db');

//middleware
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
  console.log("Server is running on port ", PORT) ;
});

module.exports = app;

const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
//configure mongoose
const MONGODB_URI = "";

mongoose.connect(dbConfig.db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to database');
  })
  .catch((error) => {
    console.error('Error connecting to database', error);
  });

// configure routes
const studentRouter = require("./routes/StudentRoutes");
const dormRouter = require("./routes/DormRoutes");
const roomRouter = require("./routes/RoomRoutes");
const authRouter = require("./routes/AuthRoutes");


app.use("/api/student", studentRouter);
app.use("/api/dorm", dormRouter);
app.use("/api/room",roomRouter);
app.use("/api/auth", authRouter);

app.use((req, res, next) => {
  res.status(404).send('Error 404!')
});
  
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});


