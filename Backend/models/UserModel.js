const mongoose = require('mongoose'); 
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    name: 
    {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: 
    {
        type: String,
        required: true
    },
    phone: 
    {
        type: String,
        required: true
    },
    isAdmin:  {type: Boolean, default: false}
},
{
    timestamps: true,
});
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};
const User = mongoose.model('user', userSchema);
module.exports = User;