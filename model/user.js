const mongoose = require('mongoose');
const user = new mongoose.Schema(
    {
        client:{
            type: String,
            default:null
        },
    },
    {timestamps: true}
);

module.exports = mongoose.model('user',user);