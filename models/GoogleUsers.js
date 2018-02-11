
const mongoose = require("mongoose");

var GoogleUserSchema = mongoose.Schema({
    googleId: {
        type: String
    }
})

module.exports = mongoose.model('GoogleUser', GoogleUserSchema)