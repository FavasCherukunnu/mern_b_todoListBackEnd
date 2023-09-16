const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    houseName: { type: String },
    panchayath: { type: String },
    postOffice: { type: String },
})


const Schema = new mongoose.Schema({
    fullName: {
        type: String, 
        required: true,
        validate:{
            validator:(val)=>{
                if(val==='davood'){
                    return false;
                }else{
                    return true;
                }
            },
            message:props=>`${props} is in balcklist`
        }
    },
    age:{
        type: Number,
        min:18,
        max:45,
    },
    fatherName: { 
        type: String,
        lowercase: true,
        minLength:3,
    },
    createdAt:{
        type: Date,
        immutable:true,         //can not change val
        default:()=>Date.now(),
    },
    updatedAt:{
        type:Date,
        default:()=>Date.now()
    },
    bestFriend: { type: mongoose.SchemaTypes.ObjectId },
    address: addressSchema
})

module.exports = mongoose.model('User', Schema); 