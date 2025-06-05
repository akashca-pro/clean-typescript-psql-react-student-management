import express from 'express';
import dotenv from 'dotenv/config';
import studentRouter from '@/presentation/routes/student_routes'

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use('/api/students', studentRouter);

app.listen(process.env.PORT || 3000,()=>{
    console.log(`Server running on http://localhost:${process.env.PORT}`)
})