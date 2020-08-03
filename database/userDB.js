const mongoose = require('mongoose');
const userModel = mongoose.model('user')

saveUser = function (reqBody){
    return new Promise ((resolve, reject)=>{
        userModel.create({
            client:reqBody.user || `Anonymus ${Date.now()}`
        }).then((user)=>{
            return resolve(user);
        }).catch((e)=>{
            return reject(e);
        })
    })
}

getUser = function (userId){
    return new Promise ((resolve, reject)=>{
        userModel.findById({
            _id: userId
        }).then((user)=>{
            return resolve(user);
        }).catch((e)=>{
            return reject(e);
        })
    })
}

changeUserStatus = function (reqBody){
    return new Promise ((resolve, reject)=>{
        userModel.findByIdAndUpdate(
            { id : reqBody.userId},
            {$set:{deleted:true }});
    }).then((user)=>{
        return resolve(user)
    }).catch((e)=>{
        return reject(e);
    })
}

module.exports = { saveUser,getUser, changeUserStatus};