import mongoose from "mongoose";

const companySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    logo:{
        type:String,
        required:true
    },
    website: {
        type: String,
        unique:true
    },
    location: {
        type: String,
    },
    userId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
}, { timestamp: true });


export const Company = mongoose.model('Company',companySchema)