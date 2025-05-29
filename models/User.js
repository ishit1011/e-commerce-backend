const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum: ["admin","rider","user"],
        default: "user"
    }
})


module.exports = mongoose.model('User', userSchema);