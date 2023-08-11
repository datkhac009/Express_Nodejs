// const express = require("express");
import express from 'express';
import cors from 'cors';
import { PORT } from './utils/secrets.js'

import connectDatabase from './config/dbConnect.js';
import dotEnv from 'dotenv';

import routerContact from './router/contact.js';
import routerProduct from './router/products.js';
import errorHandler from './middleware/errorHandler.js';

dotEnv.config({ path: './.env' });

const app = express();

const port = process.env.PORT || PORT;
//Kết nối thành công
const res = await connectDatabase();

if (res.success === true)
//cors sẽ gửi dữ liệu cho FE
app.use(cors({
    origin: 'http://localhost:3200/',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();   
});

app.use(errorHandler);


app.use("/api", routerContact);
app.use("/api", routerProduct);

app.use ((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
    
    next();
})

app.get('/', function(req, res, next){
    res.send({ message: 'Welcome to authentication api' });

    next();
});

app.listen(port, () => {
    console.log(`Connected to listen ${port}`);
})
