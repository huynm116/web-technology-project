require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

//middleware
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4040;

app.listen(PORT, () => {
  console.log("Server is running on port ", PORT) ;
});

module.exports = app;

const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
//configure mongoose
const MONGODB_URI = "mongodb+srv://it4409:it4409-soict@lamdb-crud.qd3s7vv.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to database');
  })
  .catch((error) => {
    console.error('Error connecting to database', error);
  });

const blogRouter = require("./routes/BlogRoutes");
app.use("/api/blogs", blogRouter);

