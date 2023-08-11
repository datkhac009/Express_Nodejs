import express from 'express'
const router = express.Router();

import {
    getContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact,
} from "../controller/contactController.js";


router.route("/users").get(getContacts).post(createContact);
router.route("/user/:id").get(getContact).put(updateContact).delete(deleteContact);

export default router;