const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    username: {
        type : String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        // select : false
    },
    email: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false,
        maxlength: 10,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    }
}, { timestamps: true });

userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        try {
            const passwordHash = await bcrypt.hash(this.password, 10);
            this.password = passwordHash;
            return next();
        } catch (error) {
            return next(error);
        }
    }
    return next();
});

userSchema.methods.isValidPassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};


const User = mongoose.model('User', userSchema);
module.exports = User;