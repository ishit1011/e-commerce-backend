const dotenv = require('dotenv')
const express = require('express');
const mongoose = require('mongoose');
const orderRoutes = require('./routes/order');
const productRoutes = require('./routes/product');
const cors = require('cors');
const cookieParser = require('cookie-parser');

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(()=>console.log('Mongo DB connected')).catch(()=>console.log('DB not connected'));

const app = express();
const port = process.env.PORT;
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/order',orderRoutes);
app.use('/product',productRoutes);


app.listen(port,()=>{
    console.log(`Server listening to port ${port}`);
})