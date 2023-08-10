import dotenv from 'dotenv';
import logger from '../utils/logger.js';

dotenv.config({ path: './.env' });

export const {
    PORT,
    MONGO_URL,
    MONGO_WHITERSUN_PASSWORD,
} = process.env;

const requiredCredentials = [
    'PORT',
    'MONGO_URL',
];
//Kiểm tra env xem trong env có biến hay không 
for (const credential of requiredCredentials) {
    if (!process.env[credential]) {
        logger.error(`Missing ${credential} environment variable.`);
        process.exit(1);
    }
}