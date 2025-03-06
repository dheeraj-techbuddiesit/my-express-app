const express=require('express');
const router=express.Router();
const {getAllContact,
    getSingleContact,
    createContact,
    updateContact , 
    deleteContact}=require('../controller/contactController');
    const validateToken = require("../middleware/validateToken");


// router.use(validateToken);
router.get("/",validateToken, getAllContact).post("/",validateToken,createContact);
router.route("/:id").get(getSingleContact).put(updateContact).delete(deleteContact);
module.exports = router;