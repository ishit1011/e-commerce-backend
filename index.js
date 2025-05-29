const dotenv = require('dotenv')
const express = require('express');
const mongoose = require('mongoose');

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const app = express();
const port = process.env.PORT;

app.get('/',(req,res)=>{
    res.json('Hello World');
})



app.listen(port,()=>{
    console.log(`Server listening to port ${port}`);
})