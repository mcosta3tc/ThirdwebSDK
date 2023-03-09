import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { Pool } from "pg";
import cors from 'cors';


dotenv.config(); //Reads .env file and makes it accessible via process.env
const app = express();
app.use(express.json());

const allowedOrigins = ['http://localhost:3000'];

const options: cors.CorsOptions = {
    origin: allowedOrigins
};

app.use(cors(options))

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || "5432")
});

const connectToDB = async () => {
    try {
        await pool.connect();
    } catch (err) {
        console.log(err);
    }
};
connectToDB();

app.get("/test", (req: Request, res: Response, next: NextFunction) => {
    res.send("hi");
});

app.post('/create-drop', (req: Request, res:Response, next:NextFunction) => {
    res.send("in req")
    console.log(req.body)
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running at ${process.env.PORT}`);
});

