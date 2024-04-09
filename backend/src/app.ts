import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import userRouter from "./routes/users";
import {CORS_ALLOWED_ORIGIN} from "./settings";
import cors from "cors";
import cookieParser from "cookie-parser"
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use(
    cors({
        origin: CORS_ALLOWED_ORIGIN,
        credentials: true
    })
);

app.use('/users', userRouter);

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.sendStatus(500);
});



export { app };