const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const port = process.env.PORT || 8080;
const path = require("path");

// Set up express

const app = express();
app.use(cors());


// Database Connection
const db = process.env.MONGO_DB_URI || process.env.MONGODB_URI;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Database is connected!"))
  .catch((err) => console.log(err));


if (process.env.NODE_ENV === "production") { 
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
// Set up routes

require("./models/postModel");
require("./models/userModel");

app.use(express.json());

app.use("/users", require("./routes/userRoute"));
app.use("/posts", require("./routes/postRoute"));

app.listen(port, () => {
  console.log(`Server start on Port: ${port}`);
});
