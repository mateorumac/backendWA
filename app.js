const express = require("express");
const bodyParser = require("body-parser");
const mongoose  = require("mongoose");
const cookieParser = require('cookie-parser');
const authRoute = require("./routes/auth");
const cors = require("cors");
const session = require("express-session");



const app = express()
const port = 3000


app.use(cookieParser());

app.use(cors({
  credentials: true,
  origin: 'http://localhost:8080'
}));

app.use(bodyParser.json())

app.use(express.urlencoded({ extended: false }));


const dbUri = 'mongodb+srv://anamanev:admin123@cluster0.mcjyxx5.mongodb.net/test'

mongoose
.connect(dbUri,{ useNewUrlParser: true, useUnifiedTopology: true, dbName: 'BeautyByAna'})
.then(() => console.log("Connected"))
.catch((err) => console.log(err))






app.use("/api/auth",authRoute)
app.listen(port, () => console.log(`Working on port ${port}`))