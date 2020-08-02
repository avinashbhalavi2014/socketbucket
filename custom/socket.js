module.exports = function (io) {
    io.on('connection', async (socket)=>{
        try {
            console.log('user connected to server');
            socket.emit('connected', {
                success: true, socket: 'connected'
              });

              socket.on('disconnect', async () => {
                  console.log('user disconnected from socket');
              })
            //   socket.on('testsocket', async()=>{
            //     let bucketList = {success: true, list:'socket data'}
            //     io.emit('socketbucket', bucketList)
            //   })
        } catch (error) {
          console.log('socket connection error:',error)  
        }
    })
}