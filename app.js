const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const port = process.env.PORT || 8081;

require('./database/mongo');
const userDB = require('./database/userDB');
const socket = require('./custom/socket');
const cron = require('./custom/cron');

socket(io);
cron(io);

// middlewares
// app.use(express.static('public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(bodyParser.json({ extended: true, limit: "50mb"}));
app.use(bodyParser.urlencoded({extended: true, limit:"50mb"}));

// routes
app.get('/', (req, res) => {
    res.render('index.html');
});

//save user
app.post('/user', async (req, res) => {
    let { user } = req.body;
    let saveUser = await userDB.saveUser(req.body);
    if(saveUser){ return res.status(201).json({success: true, message:'USER SAVED', userId:saveUser._id.toString()})}
    else return res.status(400).json({success: false, message:'UNABLE TO SAVE USER'})
});

//socket page
app.get('/socket',(req,res)=>{
     res.render('socket.html');
})

http.listen(port,()=>{
    console.log('Node server running at port :',port);
})