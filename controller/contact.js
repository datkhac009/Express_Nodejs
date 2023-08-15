import User from "../models/contact.js";
import UserProfile from "../models/profile.js";
import expressAsyncHandler from "express-async-handler";
import { hashPassword } from "../utils/password.js";
import profileModel from "../models/profile.js";

const getContacts  = expressAsyncHandler(async (req, res, next) => {
    const user = await UserProfile.find({}).select('-password').lean();

    if (user.length === 0) {
        res.status(404);
        const error = new Error("User not found");

        next(error);
    } else {
        res.status (200).json(user);
    }
});


const createContact = expressAsyncHandler (async (req,res) => {
    const { fullname, password, email, phone } = req.body;

    try {
        if (!fullname || !password || !email || !phone) {
            res.status(400);
            throw new Error("Error create!");
        }

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

        await newProfile.save();

        const hashPass = await hashPassword(password);
        console.log('hashPassword: ', hashPass);

        console.log(3);

        const user = await User.create({ 
            fullname, 
            password: hashPass, 
            email, 
            phone,
            profile: newProfile._id,
        });

        await user.save();

        // const formattedUser = await User.findOne({ _id: user._id })
        //     .populate('profile')
        //     .select('-password')
        //     .lean();
        const formattedUser = await User.findOne({ _id: user._id })
            .populate({ path: 'profile', strictPopulate: false })
            .select('-password')
            .lean();

        const UserId = formattedUser.profile._id;
        delete formattedUser.profile._id;
        
        console.log('formattedUser: ', formattedUser.profile);
        return res.status(202)
            .json({ id: UserId, ...formattedUser.profile });

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
    
    const user = await User.findById(id).select('-password').lean();

    const findReferenceProfile = await User.findById(id).populate({ path: 'profile', strictPopulate: false }).lean();
    console.log('findReferenceProfile: ', findReferenceProfile.profile);


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