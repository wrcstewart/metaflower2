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

    res.sendFile(path.resolve(__dirname,'index1.html'))

})


io.on('connection', (socket)=>{console.log("sock it")});
/*
io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
    });
});
*/
io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
        console.log(msg)
    });
});
