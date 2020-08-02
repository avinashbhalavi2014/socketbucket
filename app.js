const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const port = process.env.PORT || 8081;

require('./database/mongo');
const socket = require('./custom/socket');
const cron = require('./custom/cron');

socket(io);
cron(io);

// middlewares
app.use(express.static('public'));

app.use(bodyParser.json({ extended: true, limit: "50mb"}));
app.use(bodyParser.urlencoded({extended: true, limit:"50mb"}));

// routes
app.get('/', (req, res) => {
    res.render('index.html');
});

http.listen(port,()=>{
    console.log('Node server running at port :',port);
})