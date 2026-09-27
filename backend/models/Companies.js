import mongoose from "mongoose";

const companySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
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
        trim: true
    },
    userId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
}, { timestamps: true });

companySchema.index(
    { name: 1, location: 1 },
    { unique: true, collation: { locale: "en", strength: 2 } }
);

export const Company = mongoose.model('Company',companySchema)