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
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select : false
    },
    passwordChangedAt: Date,
    email: {
        type: String,
        required: false,
        lowercase: true
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
    if (this.isModified('password') || this.isNew) {
            this.passwordChangedAt = Date.now() - 1000;
    }

    return next();
});

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


userSchema.methods.isValidPassword = async function(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
        return JWTTimestamp < changedTimestamp;
    }
    return false;
};

const User = mongoose.model('User', userSchema);
module.exports = User;