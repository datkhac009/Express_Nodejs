// const express = require("express");
import express from 'express';
import cors from 'cors';
import { PORT } from './utils/secrets.js'
import connectDatabase from './config/dbConnect.js';
import dotEnv from 'dotenv';
import routerContact from './router/contact.js';
import routerProduct from './router/products.js';
import routerCart from './router/cart.js';
import errorHandler from './middleware/errorHandler.js';




dotEnv.config({ path: './.env' });//tải các biến môi trường từ một tệp .env vào process.env
const app = express();
const port = process.env.PORT || PORT;
//Kết nối thành công
const res = await connectDatabase();
if (res.success === true)
    //cors sẽ gửi dữ liệu cho FE
    app.use(cors({
        origin: 'http://localhost:3200/',//Chấp nhận các yêu cầu từ http://localhost:3200/
        methods: ['GET', 'POST'],//sử dụng các phương thức GET hoặc POST
        allowedHeaders: ['Content-Type', 'Authorization']//Chỉ chấp nhận các header 'Content-Type', 'Authorization'
    }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    //setHeader để cho phép trang web khác truy cập vào API của ứng dụng của bạn
    res.setHeader('Access-Control-Allow-Origin', '*');// * có nghĩa là trang web khác có thể truy cập vào API của bạn
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');// Các trang web khác có thể gửi Header Origin, X-Requested-With, Content-Type, Accept 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');//các trang web có thể gửi theo phương thức 'GET, POST, PATCH, DELETE'
    next();
});
//use đến errorHandler trong file ./middleware/errorHandler.js 
// app.use(errorHandler);

//Định nghĩa các Router trong API
app.use("/api", routerContact);
app.use("/api", routerProduct);
app.use("/api", routerCart);

//lấy các thuộc tính của đối tượng lỗi bao gồm statusCode,message,data
//Xử lý các lỗi 400,404
app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
          
    next();
})
//Nếu vào thành công thì nó sẽ ra 1 message từ res gửi lên 
app.get('/', function (req, res, next) {
    res.send({ message: 'Welcome to authentication api' });

    next();
});

app.listen(port, () => {
    console.log(`Connected to listen ${port}`);
})