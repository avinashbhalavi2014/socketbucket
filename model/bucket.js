const mongoose = require('mongoose');
const bucket = new mongoose.Schema(
    {
        name:{
            type:String,
            required: true
        },
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'user'
        },
        details:{
            type: String,
            default: null
        }
    },{timestamps: true}
    );

module.exports = mongoose.model('bucket',bucket);