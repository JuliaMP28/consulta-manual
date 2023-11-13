import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Manual = new Schema({
    name: { type: String },
    model: { type: String},
    manufacturer: { type: String},
    type: { type: String},
    createdBy: { type: String },
    link: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    isRestricted: { type: Boolean, default: false }
});

export default mongoose.model('Manual', Manual);
