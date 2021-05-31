const express = require('express');
const path = require('path');

const app = express();

let port = process.env.PORT;
if (port == null || port == "") {
    port = 4000;
}
const server = app.listen(port, ()=>{
    console.log('App listening on 4000')
})

const io = require('socket.io')(server);

app.get('/', (req,res)=>{

    res.sendFile(path.resolve(__dirname,'index3.html'))

})

let usersObj = {};
let testUser = "user1";
let chatPairs ={};
console.log(usersObj[testUser]);

io.on('connection', (socket)=>{console.log("socketID "+socket.id)});
//io.on('connection', (socket)=>{console.log( socket.id    )});
/*
io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
    });
});
*/
io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {

        let message = msg.message;
        let status = msg.status;
        console.log(status);

        io.to(socket.id).emit('chat message',{user:"self",status:status,message:message});
       io.to(chatPairs[socket.id]).emit('chat message',{user:"buddy",status:status, message:message});
        //io.emit('chat message', msg);
        //console.log(msg);
        //console.log(socket.id);
    });
});

io.on('connection', (socket) => {
    socket.on('client data', (msg) => {
        //io.emit('chat message', msg);
        console.log(msg);
        addUserToUserObj(msg);
        /*
       io.to(msg.socketID).emit('chat message',"private message from yourself");
        io.to(chatPairs[msg.socketID]).emit('chat message',"private message from chat buddy");
        */

        //console.log(socket.id);
    });
});

function addUserToUserObj(msg){

usersObj[msg.user] = msg.socketID;

console.log(usersObj);

if(msg.user == "user2" ) testInitialiseChatPairs();

}

function testInitialiseChatPairs(){
// assumes as an example user1 and user 2 have agreed a chat.

chatPairs[usersObj["user1"]] = usersObj["user2"];//should be socket ids
chatPairs[usersObj["user2"]] = usersObj["user1"];
console.log(chatPairs)

}

