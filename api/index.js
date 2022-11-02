const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");

dotenv.config();

const app = express();

//DB CONEECTION
mongoose.connect(process.env.DB_CONNECTION).then(()=> console.log('Connected to DB')).catch((err)=>{
    console.log(err);
})

//JSON
app.use(express.json());

//Routes
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);


//PORT
app.listen(process.env.PORT || 8080, () => {
    console.log('Back-end is working');
});