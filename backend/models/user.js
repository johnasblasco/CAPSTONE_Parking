import { Schema, model } from 'mongoose';
import { hash, compare } from 'bcryptjs';

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await hash(this.password, 10);
    next();
});

// Compare hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await compare(enteredPassword, this.password);
};

export default model('User', userSchema);
