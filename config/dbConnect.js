import User from '../models/contactModel.js';
import mongoose from "mongoose";
import logger from "../utils/logger.js"
import { MONGO_URL } from "../utils/secrets.js";

const mongoConnection = () => {
    return new Promise(async (resolve, reject) => {
        const url = MONGO_URL;

        try {
            await mongoose.connect(url, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }).then(() => {
                console.log('Connected successfully to the database');

                console.log(`Your current database URL is ${mongoose.connection.host}`);
                console.log(`Your current table name is ${mongoose.connection.name}`);
                console.log(`Your current model name is ${User.modelName} \n`);
                resolve({ success: true });
            }).catch((err) => {
                logger.error('Error connecting to the database:', err);

                reject({ error: err });
            })
        } catch (error) {
            logger.error(error)
            process.exit(1)
        }
    })
}

export default mongoConnection;