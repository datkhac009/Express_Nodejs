// const mongoose = require("mongoose");

import mongoose from "mongoose";

const contactSchema = mongoose.Schema({
    fullname: {
        type: String,
        required:[true, "Please add the contact name"]
    },
    password: {
        type: String,
        min: 6,
        max: 1024,
        required:[true, "Please add the contact password"]
    },
    email: {
        type: String,
        required:[true, "Please add the contact email"],
        unique: true
    },
    phone: {
        type: Number,
        required:[true, "Please add the contact phone"],
        unique: true
    },
}, {
    timestamps:true
});

const user = mongoose.model("users", contactSchema);

export default user;

// module.exports = mongoose.model("Contact",contactSchema);


