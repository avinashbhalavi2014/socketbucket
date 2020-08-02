const mongoose = require('mongoose');
require('dotenv').config();
let databaseUrl = process.env.databaseUrl;
mongoose.Promise = global.Promise

const env = process.env.NODE_ENV || "development";
if(env == "development"){
    databaseUrl = "mongodb://localhost:27017/socketbucket";
}

mongoose.connect(databaseUrl,{useNewUrlParser:true, useUnifiedTopology: true}).then(
    ()=>{console.log('mongodb connected successfully...')},
    (error)=>{console.log('unable to connect mongodb')}
)

// register schema
require('../model/user');
require('../model/bucket');