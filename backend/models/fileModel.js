import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
     filename: { type: String, required: true },
    documentNumber: { type: String, required: true },
    status: { type: String, default: 'uploaded' }, // default status
    comments: {
        hod: { type: String, default: '' },
        dean: { type: String, default: '' },
        dvs: { type: String, default: '' },
    },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

export default mongoose.model('File', fileSchema)