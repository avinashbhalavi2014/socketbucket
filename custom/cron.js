const cron = require('node-cron');
const mongoose = require('mongoose');
const bucketModel = mongoose.model('bucket');

module.exports = function (io) {
 cron.schedule('*/10 * * * * *', async()=>{
     try {
         let bucketList = await bucketModel.findOne({});
         if(!bucketList) { 
             bucketList = {success: true, list:'data'}
         }
         io.emit('socketbucket', bucketList)  // socket broadcast
     } catch (error) {
         console.log('error:',error);
     }
 })
}