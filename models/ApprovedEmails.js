const mongoose = require('mongoose');

const approvedEmailSchema = ({
    email: {
        type: String,
        required: true,
        unique: true,
    }
});

module.exports = mongoose.model('ApprovedEmail',approvedEmailSchema);