const dotenv = require('dotenv')
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const orderRoutes = require('./routes/order');
const productRoutes = require('./routes/product');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user')

const cors = require('cors');
const cookieParser = require('cookie-parser');


mongoose.connect(process.env.MONGO_URI).then(()=>console.log('Mongo DB connected')).catch(()=>console.log('DB not connected'));

const app = express();
const port = process.env.PORT || 8000;
app.use(cors({
  origin: "https://e-commerce-frontend-delta-rose.vercel.app", // your deployed frontend URL
  credentials: true, // if you use cookies or auth headers
}));
app.use(express.json());
app.use(cookieParser());

app.use('/order',orderRoutes);
app.use('/product',productRoutes);
app.use('/api', authRoutes);
app.use('/user', userRoutes);



app.listen(port,()=>{
    console.log(`Server listening to port ${port}`);
})