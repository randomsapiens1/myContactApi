const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModels");
const { Error } = require("mongoose");


//@desc Get all contacts
//@route GET /api/contacts
//@acess public to private

const getContacts = asyncHandler(async(req, res) => {
    const contacts = await Contact.find({user_id: req.user.id});
    res.status(200).json(contacts);
});

//@desc get specific contacts
//@route GET /api/contacts
//@acess public/:id to private

const getContact = asyncHandler(async(req, res) => {
    const contact =await Contact.findById(req.params.id);
    if(!contact) {
        res.status(404);
        throw new Error("Contact not found!");

    }
    res.status(200).json(contact);
});


//@desc Create new contacts
//@route POST /api/contacts
//@acess public to private

const createContact =asyncHandler(async(req, res) => {
    console.log("The request body is :", req.body);
    const{ name,email, phone} =req.body;
    if(!name || !email || !phone) {
       res.status(400);
       throw new Error("All fields are manadatory!");
    }
    const contact = await Contact.create({
        name,email,phone, user_id: req.user.id
    });
    res.status(201).json(contact);
});

//@desc update contacts
//@route PUT /api/contacts
//@acess public /:id to private

const updateContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact) {
        res.status(400);
        throw new Error("Contact not found");
    }

    if(contact.user_id.tostring() !== req.user.id) {
        res.status(403);
        throw new Error("User don't have permission to update another users contact");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id, req.body, {new: true}
    );
    res.status(200).json(updatedContact);
});

//@desc delete contacts
//@route DELETE /api/contacts
//@acess public /:id to private

const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    if(contact.user_id.tostring() !== req.user.id) {
        res.status(403);
        throw new Error("User don't have permission to delete another users contact");
    }

    await Contact.findOneAndDelete(req.params.id);
    res.status(200).json(contact);
});


module.exports ={getContacts, createContact, updateContact, deleteContact, getContact};