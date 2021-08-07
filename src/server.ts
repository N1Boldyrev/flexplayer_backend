import express from "express";
import cors from "cors";
import dotenv from "dotenv";

export const app = express();
dotenv.config();
const port = process.env.PORT || 5001;

app.use(
    cors({
        origin: "*",
    })
);

app.get('/', (req, res) => res.send('Hello world'))

app.listen(port, () => console.log(`Running on port ${port}`));

