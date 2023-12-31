import mongoose from "mongoose";

const profile = mongoose.Schema({
    fullname: {
        type: String,
        required:[true, "Please add the contact name"]
    },
    avatar: {
        name: String,
        data: Buffer,
    },
    email: {
        type: String,
        required:[true, "Please add the contact email"],
        unique: true
    },
    address: {
        type: String,
        required:[false, "Please add the contact address"]
    },
    phone: {
        type: String,
        required:[true, "Please add the contact phone"],
        unique: true
    },
    products:  {
        cart: {
            type: Array,
            default:[]
        },
        vouchers: {
            type: Array,
            default:[]
        }
    }
}, {
    timestamps:true
});

const profileModel = mongoose.model("profile", profile);
export default profileModel;