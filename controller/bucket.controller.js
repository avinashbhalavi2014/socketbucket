const bucketDB = require('../database/bucketDB');
const bucketController = {
    saveBucket: async (req, res)=>{
        try {
            let { name } = body;
            if(!name){ return res.status(400).json({success: false, message: "BAD REQUEST"})};
            let bucket  = await bucketDB.saveBucket(req.body);
            if(bucket) return res.status(201).json({success: true, message:"DATA SAVED SUCCESSFULLY"});
            else return res.status(200).json({success: false, message:"UNABLE TO SAVE DATA"});
        } catch (error) {
            console.log('error:',error);
            return res.status(500).json({success: false, message: "INTERNAL SERVER ERROR"})
        }
    }
}