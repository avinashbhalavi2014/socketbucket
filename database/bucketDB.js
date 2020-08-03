const mongoose = require('mongoose');
const bucketModel= mongoose.model('bucket');

saveBucket = function (reqBody){
    return new Promise((resolve, reject)=>{
        bucketModel.create({
            name:reqBody.data,
            userId: reqBody.userId
        }).then((res)=>{
            return resolve(res);
        }).catch((e)=>{
            return reject(e);
        })
    })
}

getBucket = function (){
    return new Promise((resolve,reject)=>{
        bucketModel.find()
        .populate('userId', 'client')
        .then((bucketList)=>{
            return resolve(bucketList.map((doc)=>({
                name:doc.name,
                user:doc.userId.client
            })));
        }).catch((e)=>{
            return reject(e);
        })
    })
}

module.exports = {saveBucket, getBucket};