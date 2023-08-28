/* eslint-disable no-useless-escape */
import User from "../models/contact.js";
import UserProfile from "../models/profile.js";
import expressAsyncHandler from "express-async-handler";
import { hashPassword } from "../utils/password.js";
import profileModel from "../models/profile.js";

const getContacts  = expressAsyncHandler(async (req, res, next) => {
    const user = await User.find({}).select('-password').lean();//( Ví dụ khi find({}).select(“-password”) về thì nó sẽ find ra hết data User trừ password)

    if (user.length === 0) {
        res.status(404);
        const error = new Error("User not found");

        next(error);
    } else {
        res.status (200).json(user);
    }
});


const createContact = expressAsyncHandler (async (req,res) => {
    const { fullname, password, email, phone } = req.body;//lấy fullname, password, email, phone bên phía client
    
    try {
        //validate xem có fullname, password, email, phone hay không
        if (!fullname || !password || !email || !phone) {
            res.status(400);
            throw new Error("Error create!");
        }
        //Tạo mới 1 đối tượng trong bảng profileModel (là bảng profile trong database) 
        const newProfile = new profileModel({
            fullname, 
            avatar: '',
            email,
            address: '', 
            phone,
            products: {
                cart: [],
                vouchers: [],
            }
        });
        await newProfile.save();//sau khi tạo mới xong thì sẽ lưu vào bảng profile 

        const hashPass = await hashPassword(password);//Mã hóa pass giúp tăng bảo mật của người dùng
        console.log('hashPassword: ', hashPass);

        //Tạo mới 1 đối tượng trong bảng contactModel (là bảng user trong database) 
        const user = await User.create({ 
            fullname, 
            password: hashPass, 
            email, 
            phone,
            profile: newProfile._id,//id của profile vủa mới tạo ở trên
        });

        await user.save();//sau khi tạo mới xong thì sẽ lưu vào bảng user
        
        const formattedUser = await User.findOne({ _id: user._id })//Lấy id của user bằng cách dùng finOne()
            .populate({ path: 'profile', strictPopulate: false })//vì trong user có ref của bảng profile trong DB nên có thể lấy dữ liệu của bảng profile trong DB bằng cách dùng populate() muốn path đến bảng profile để lấy dữ liệu thì phải tắt bảo mật bằng cách dùng strictPopulate: false 
            .select('-password')
            .lean();//lean()giúp tìm và đọc nhanh hơn
        
        const UserId = formattedUser._id;
        const ProfileID = formattedUser.profile._id
        const newID = {UserId,ProfileID}
        delete formattedUser._id;
        delete formattedUser.profile._id;
        
        console.log('formattedUser: ', formattedUser);
        return res.status(202).json({ id: newID , ...formattedUser });
        //return res.status(202).json(formattedUser);
            
        
    } catch (error) {
        // throw new Error(error.message);
        console.log(error.message);
        return res.status(400).json({
            status: 'fail',
            message: error.message.replace(/\"/g, "")
        });
    }
});


const getContact = expressAsyncHandler (async (req,res) => {
    const id = req.params.id;
    console.log("🚀 ~ file: contactController.js:42 ~ getContact ~ id:", id)
    
    const user = await UserProfile.findById(id).lean();
    console.log('user: ', user);
    if (!user) {
        res.status(404).json({ error: 'User not found' });
    } else {
        res.status(201).json(user);
    }

});

const updateContact = expressAsyncHandler (async (req,res) => {
    const userId = req.params.id;
    const { fullname, email, phone } = req.body;
    const update = { fullname, email, phone };
    const user = await User.findByIdAndUpdate(userId,  update,  { new: true });
    try {
        if (!user) {
            res.status(404).json({ error: 'User not found' });
        } else {
            res.status(201).json(user);
        }
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }

});

const deleteContact = expressAsyncHandler(async (req,res) => {
    const id = req.params.id;
    const user = await User.findByIdAndDelete(id);
    console.log('user: ', user);

    res.status(201).json({message:`Delete user: ${user.fullname} by ID ${req.params.id}}`});
});

export {
    getContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact
}