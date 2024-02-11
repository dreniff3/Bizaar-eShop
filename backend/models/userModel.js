import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
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
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
}, {
    timestamps: true,
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// pre === run this code before 'save'
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        // do nothing if password was not modified
        next();
    }

    // otherwise, hash password
    const salt = await bcrypt.genSalt(10); // random data added to a password before it is hashed
    // trade user password with hashed password BEFORE it is saved
    this.password = await bcrypt.hash(this.password, salt);
});

const User = new mongoose.model("User", userSchema);

export default User;