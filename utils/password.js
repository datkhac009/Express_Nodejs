import bcrypt from 'bcryptjs';
//mã hóa 10 kí tự
export const hashPassword = async (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

export const comparePassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
}
//Tự động tạo pass
export const generateRandomPassword = async (length) => {

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=';

    let generatedPassword = '';

    for (let i = 0; i < length; i++) {
        generatedPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return generatedPassword;
}