const cookieParser = require('cookie-parser');
const express = require('express');
const app = express(); 
const cors = require('cors'); 
const PORT = 8080;
const db = require('./config/db');  
const ProductsRoutes = require('./Routes/ProductsRoutes');
const UserRoutes = require('./Routes/UsersRoutes');
const CartRoutes = require('./Routes/CartsRoutes');

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,  
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use("/api",ProductsRoutes);
app.use("/api/users",UserRoutes);
app.use("/api/cart",CartRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
 
