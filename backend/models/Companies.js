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
        required:false
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
    }],
}, { timestamps: true });


export const Company = mongoose.model('Company',companySchema)