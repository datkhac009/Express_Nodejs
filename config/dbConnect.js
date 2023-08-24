/* eslint-disable no-async-promise-executor */
import User from '../models/contact.js';
import mongoose from "mongoose";
import logger from "../utils/logger.js"
import { MONGO_DATABASE, MONGO_URL } from "../utils/secrets.js";

const mongoConnection = () => {
    //Hàm mongoConnection() trả về một  Promise để xác định xem kết nối đến cơ sở dữ liệu có thành công hay không.
    return new Promise(async (resolve, reject) => {
        const url = `${MONGO_URL}/${MONGO_DATABASE}`;//Đường dẫn kết nối đến database
        try {
            //mongoose.connect() để kết nối đến database
            await mongoose.connect(url, {
                useNewUrlParser: true,//là một thuộc tính để xác định xem có nên sử dụng parser mới để phân tích URL khi kết nối đến database hay không.
                useUnifiedTopology: true//là một thuộc tính để xác định xem có nên sử dụng giao thức mới để quản lý các kết nối đến database hay không.
            })
            .then(() => {//Sau khi kết nối thành công thì nó sẽ trả về resolve({ success: true })
                console.log('Connected successfully to the database');
                console.log(`Your current table name is ${mongoose.connection.name}`);
                console.log(`Your current model name is ${User.modelName} \n`);
            
                resolve({ success: true });//Thành công
            })
            .catch((err) => {//Nếu kết nối thất bại thì nó sẽ trả về reject({ error: err });
                logger.error('Error connecting to the database:', err);
                
                reject({ error: err });//Thất bại
            })
        } catch (error) {
            logger.error(error)//ghi lại thông tin lỗi vào file có tên là error.log.
            process.exit(1)//được sử dụng để dừng chương trình và trả về giá trị thành công cho biến dòng lệnh
        }
    })
}
export default mongoConnection;