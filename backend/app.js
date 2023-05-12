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
const MONGODB_URI = "mongodb+srv://student:student@cluster0.nb7rtyi.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
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


app.use("/api/student", studentRouter);
app.use("/api/dorm", dormRouter);



