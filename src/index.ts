import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import router from './routers/index.router' ;

const app = express();

const MONGO_URL = process.env.MONGO_URL;

app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

app.use('/',router());


mongoose.Promise = Promise;
mongoose.connect(MONGO_URL)
.then(() => {
    console.log('connected to db');
    server.listen(8080, () => {
        console.log("server is running on http://localhost:8080/");
    });

}).catch((error) => {
    console.log(error);
});

