const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModels");
//@desc Get all contacts
//@route GET /api/contacts
//@acess public

const getContacts = asyncHandler(async(req, res) => {
    const contact = await Contact.find();
    res.status(200).json(contact);
});

//@desc get specific contacts
//@route GET /api/contacts
//@acess public/:id

const getContact = asyncHandler(async(req, res) => {
    res.status(200).json({message: `Get contact for ${req.params.id}`});
});


//@desc Create new contacts
//@route POST /api/contacts
//@acess public

const createContact =asyncHandler(async(req, res) => {
    console.log("The request body is :", req.body);
    const{ name,email, phone} =req.body;
    if(!name || !email || !phone) {
       res.status(400);
       throw new Error("All fields are manadatory!");
    }
    const contact = await Contact.create({
        name,email,phone
    });
    res.status(201).json(contact);
});

//@desc update contacts
//@route PUT /api/contacts
//@acess public /:id

const updateContact = asyncHandler(async(req, res) => {
    res.status(200).json({message: `Update contacts for ${req.params.id}`});
});

//@desc delete contacts
//@route DELETE /api/contacts
//@acess public /:id

const deleteContact = asyncHandler(async(req, res) => {
    res.status(200).json({message: `Delete contacts for ${req.params.id}`});
});


module.exports ={getContacts, createContact, updateContact, deleteContact, getContact};