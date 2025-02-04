const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            trim: true,
            required: true  
        },

        password: {
            type: String,
            trim: true,
            required: true
        }
    }

)

module.exports = mongoose.model('usuarios', userSchema)