const mongoose = require('mongoose')


const empschema = new mongoose.Schema({


    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    phone: {
        type: Number,
        required: true,
    },
    branch: {
        type: String,
        required: true,
    },
    reason: {
        type: String,
        required: true
    },
    yearOfStudy: {
        type: String,
    },
    isDualBooted: {
        type: String,
    },

});
module.exports = mongoose.model('FE_MemberBoard_2023-24', empschema);