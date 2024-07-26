const http = require("http")
const express = require("express")
const { Server } = require("socket.io");
const path = require('path');
const app = express();

const server = http.createServer(app)

//io input output

const io = new Server(server) // new server created with S.. and give our server in para


io.on('connection', (socket) => { //socket is cliend (user)
    //console.log('new user connected',socket.id); //id automatically manageable
    
    //socket message exchange
    socket.on("user-message",(message)=>{
        console.log("A new user message",message)
        io.emit('message',message);
    })


});

//express for http request 
app.use(express.static(path.resolve('./public')))
app.get("/",(req,res)=>{
    return res.sendFile("/public/index.html")
})


server.listen(9000, ()=> console.log(`server started at port : 9000`))


