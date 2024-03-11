import mongoose, { Schema } from "mongoose";


const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true  // Add this line
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });


export const User = mongoose.model("User", UserSchema);
