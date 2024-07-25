const express = require('express');
const mongoose = require('mongoose');
const port = 4000;
const app = express();

app.use(express.json());

const restRouter = require('./routes/rest');
app.use("/api/rest", restRouter);

const uri ="mongodb://localhost:27017"
mongoose.connect(uri).then(result => {
    console.log("Database connected");
}).catch(err => {
    console.log(err);
})

app.listen(port, async (err) => {
    if(err)
        return console.log("server connection error",err)
    else{
        console.log("server in onn on port",port)
    }
});