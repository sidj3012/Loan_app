import mongoose, { InferSchemaType, model } from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    // Add correct field for 'role'
    role: {
        type: String,
        enum: ['user', 'verifier', 'admin'],
        default: 'user',
    }
});

type User = InferSchemaType<typeof userSchema>;
export default model<User>("User", userSchema);
