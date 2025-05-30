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


const allowedOrigins = [
  "https://e-commerce-frontend-delta-rose.vercel.app", // deployed frontend
  "http://localhost:5173" // Vite default dev server port
];

app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin (like Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `The CORS policy for this site does not allow access from the origin ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
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