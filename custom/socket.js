const bucketDB = require('../database/bucketDB');
const userDB = require('../database/userDB');
module.exports = function (io) {
    io.on('connection', async (socket) => {
        try {
            if (socket.handshake.query) {
                let user = await userDB.getUser(socket.handshake.query.userId);
                if (user) {
                    console.log('user connected to server:',user.client);
                    socket.emit('connected', {
                        success: true, socket: 'connected'
                    });

                    socket.on('disconnect', async () => {
                        console.log('user disconnected from socket');
                    })
                    socket.on('send', async (req, callback) => {
                        //console.log('userId', user);
                        let { data } = req;
                        if (!data) {
                            callback({ success: false })
                        }
                        req['userId'] = user._id.toString();
                        let save = await bucketDB.saveBucket(req)
                        callback({ success: true })
                    })
                    //   socket.on('postdata', async()=>{
                    //     let bucketList = {success: true, list:'socket data'}
                    //     io.emit('socketbucket', bucketList)
                    //   })

                } else {
                    console.log('unauthorized....')
                }
            }
        } catch (error) {
            console.log('socket connection error:', error)
        }
    })
}