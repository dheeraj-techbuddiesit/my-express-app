const asyncHandler = require('async-error-handler');
const Contact = require('../models/modalController');



const getAllContact =asyncHandler( async (req,res)=>{
    const contacts = await Contact.find({user_id:req.user.id});
    res.status(200).json(contacts);
});

const getSingleContact =asyncHandler( async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        return res.status(404).json({error:'Contact not found'});
    }
    res.status(200).json(contact);
});

const createContact =asyncHandler( async (req,res)=>{
    const {name,mobile} = req.body;
    if(!name || !mobile){
        return res.status(400).json({error:'All fields required'});
    };
    const contact = await Contact.create ({
        name , 
        mobile,
        user_id:req.user.id
    });
    res.status(201).json(contact);
});

const updateContact =asyncHandler( async (req,res)=>{
    const contact = await Contact.findByIdAndUpdate(req.params.id,req.body,{new : true,runValidators:true});
    if(!contact){
        return res.status(404).json({error:'Contact not found'});
    }
    if(contact?.user_id.toString() != req.user.id){
        return res.status(403).json({message:"User don't have persmission to update!"})
    }
    res.status(200).json(contact);
});

const deleteContact =asyncHandler( async (req,res)=>{
    const contact =await Contact.deleteOne({_id :req.params.id});
    if(!contact){
        return res.status(404).json({error:'Contact not found'});
    }
    if(contact?.user_id.toString() != req.user.id){
        return res.status(403).json({message:"User don't have persmission to delete!"})
    }
    res.status(200).json(contact);
});

module.exports = {
    getAllContact,
    getSingleContact,
    createContact,
    updateContact,
    deleteContact
}