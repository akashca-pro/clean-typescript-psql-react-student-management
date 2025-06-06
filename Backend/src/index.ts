import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import studentRouter from '@/presentation/routes/student_routes'
import { connectDB } from '@/infrastructure/database/index';
import { errorHandler, notFound } from './presentation/middlewares/errorHandling';

connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended : true}));

app.use('/api', studentRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT || 3000,()=>{
    console.log(`Server running on http://localhost:${process.env.PORT}`)
})