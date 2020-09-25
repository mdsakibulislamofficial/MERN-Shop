require('dotenv').config();
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");



const authRoutes = require("./routes/auth")

const app = express();

//db connect
mongoose.connect(process.env.DATABASE,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }).then(() => {
        console.log("DB CONNECTED")
    });

// middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// routes 
app.use("/api", authRoutes);




// port 
port = process.env.PORT || 9999;

// starting server
app.listen(port, () => {
    console.log(`server is un and running on port ${port}`);
});