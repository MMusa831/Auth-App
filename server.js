const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require('dotenv').config();
const port = process.env.PORT

// Set up express

const app = express();
app.use(express.json());
app.use(cors());

// Database Connection
const db = process.env.MONGO_DB_URI

mongoose
    .connect(db, { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(() => console.log("Database is connected!"))
    .catch((err) => console.log(err));
// Set up routes
app.use('/users', require('./routes/userRoute'))

app.listen(port, ()=>{
    console.log(`Server start on Port: ${port}`)
})
