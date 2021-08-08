import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { fsService } from "./services/fs-service";
import { videoService } from "./services/video-service";

export const app = express();
dotenv.config();
const port = process.env.PORT || 5001;

app.use(
  cors({
    origin: "*",
  })
);

app.use(fsService);
app.use(videoService);

app.listen(port, () => console.log(`Running on port ${port}`));
