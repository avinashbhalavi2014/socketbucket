const cron = require('node-cron');
const bucketDB = require('../database/bucketDB')

module.exports = function (io) {
 cron.schedule('*/10 * * * * *', async()=>{
     try {
         let bucketList = await bucketDB.getBucket();
         if(!bucketList) { 
             bucketList = {success: true, list:'data'}
         }
         io.emit('socketbucket', bucketList)  // socket broadcast
     } catch (error) {
         console.log('error:',error);
     }
 })
}