import express from 'express';
import dotenv from 'dotenv'
import { connectDB } from './config/db-config';
import productRoutes from "./routes/productRoutes"
import  errorHandler from "./middleware/errorHandler"

dotenv.config();



const app = express();
app.use(express.json())
app.use("/api/products",productRoutes)
app.use(errorHandler);

app.listen(3000, () => {

  connectDB();
  console.log("Server started at http://localhost:3000")
})