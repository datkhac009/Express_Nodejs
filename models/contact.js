// const mongoose = require("mongoose");

import mongoose from "mongoose";

const contactSchema = mongoose.Schema({
    fullname: {
        type: String,
        required:[true, "Please add the contact name"]//được đánh dấu là bắt buộc và không được để trống
    },
    password: {
        type: String,
        min: 6,
        max: 1024,
        required:[true, "Please add the contact password"]//được đánh dấu là bắt buộc và không được để trống
    },
    email: {
        type: String,
        required:[true, "Please add the contact email"],//được đánh dấu là bắt buộc và không được để trống
        unique: true//unique là được đánh dấu là duy nhất(duy nhất 1 email)
    },
    phone: {
        type: String,
        required:[true, "Please add the contact phone"],//được đánh dấu là bắt buộc và không được để trống
        unique: true//unique là được đánh dấu là duy nhất(duy nhất 1 phone)
    },
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "profile" //một tham chiếu đến dữ liệu "profile" trong MongoDB
    }
}, {
    timestamps:true
});

const user = mongoose.model("users", contactSchema);

export default user;

// module.exports = mongoose.model("Contact",contactSchema);


