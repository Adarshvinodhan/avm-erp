import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/dbConfig.js';
import { authRouter } from './routes/authRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());    

app.use('/',authRouter);

const PORT = process.env.PORT || 3000
app.listen(PORT,
     () => {
        connectDB();
        console.log(`Server running on port ${PORT}`);
     });