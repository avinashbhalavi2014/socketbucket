const mongoose = require('mongoose');
const user = new mongoose.Schema(
    {
        client:{
            type: String,
            default:null
        },
        deleted:{
            type: Boolean,
            default:false
        }
    },
    {timestamps: true}
);

module.exports = mongoose.model('user',user);