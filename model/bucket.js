const mongoose = require('mongoose');
const bucket = new mongoose.Schema(
    {
        name:{
            type:String,
            required: true
        },
        details:{
            type: String,
            default: null
        }
    },{timestamps: true}
    );

module.exports = mongoose.model('bucket',bucket);