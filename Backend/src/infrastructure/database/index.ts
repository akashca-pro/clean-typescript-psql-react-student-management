import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

export const pool = new Pool({
connectionString : process.env.POSTGRES_URI,
});


export const connectDB = () => {
    pool
    .connect()
    .then((client) => {
        console.log(' PostgreSQL connected');
        client.release(); 
    })
    .catch((err) => {
        console.error(' Failed to connect to PostgreSQL:', err);
        process.exit(1); 
    });

}



