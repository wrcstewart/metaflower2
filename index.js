

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
const url = 'mongodb+srv://wrcstewart:Ginger>1951@cluster0.ewegv.mongodb.net/my_database';



const MongoClient = require('mongodb').MongoClient;

const assert = require('assert');
const dbName = 'my_database2';
const client = new MongoClient(url, {useNewUrlParser: true});

async function doIt() {

    await client.connect(function (err) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        global.db2 = client.db(dbName);
        global.db2.collection('Petals').insertOne({

            title: 'Better PostL1',

            slug: 'a-better-post',

            published: true,

            author: 'Ado Kukic',

            content: 'This is an even better post',

            tags: ['featured'],

        })
    });
}


doIt();


global.db2.collection('Petals').insertOne({

     title:'Better PostL2',

     slug:'a-better-post',

     published: true,

     author: 'Ado Kukic',

     content: 'This is an even better post',

     tags: ['featured'],

})






const io = require('socket.io')(server);

app.get('/', (req,res)=>{

    res.sendFile(path.resolve(__dirname,'index5.html'))

})

let usersObj = {};
let invUsersObj = {};
let testUser = "user1";
let chatPairs ={};
console.log(usersObj[testUser]);
getCompactDateTime();

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

global.db2.collection('Petals').insertOne({

     title:'Better PostL3',

     slug:'a-better-post',

     published: true,

     author: 'Ado Kukic',

     content: 'This is an even better post',

     tags: ['featured'],

})







        let message = msg.message;
        let status = msg.status;
        console.log(status);
        //console.log(db1);

        io.to(socket.id).emit('chat message',{user:"self",status:status,message:message});
       io.to(chatPairs[socket.id]).emit('chat message',{user:"buddy",status:status, message:message});
        //io.emit('chat message', msg);
        //console.log(msg);
        //console.log(socket.id);
    });
    socket.on('publish', (msg) => {






        // do all the database stuff here
        msg = constructInfoBar(socket.id) + "<br>" + msg;


        let status = 'publish';
       // console.log(status);

        io.to(socket.id).emit('chat message',{user:"self",status:status,message:msg});
       io.to(chatPairs[socket.id]).emit('chat message',{user:"buddy",status:status, message:msg});
        //io.emit('chat message', msg);
        //console.log(msg);
        //console.log(socket.id);
        console.log(constructInfoBar(socket.id))



    });



    socket.on('help', (msg) => {
        let helpMessage ="";
        if( msg === 'explain panes'){

            helpMessage = "Explanation about the panes";
        }
        let status = 'help';
        console.log(msg);
        io.to(socket.id).emit('chat message',{user:"self",status:status,message:helpMessage});
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
});//client data

function addUserToUserObj(msg){

usersObj[msg.user] = msg.socketID;
invUsersObj[msg.socketID] = msg.user;

console.log(usersObj);
console.log(invUsersObj);

if(msg.user == "user2" ) testInitialiseChatPairs();

}

function testInitialiseChatPairs(){
// assumes as an example user1 and user 2 have agreed a chat.

chatPairs[usersObj["user1"]] = usersObj["user2"];//should be socket ids
chatPairs[usersObj["user2"]] = usersObj["user1"];
console.log(chatPairs)

}

function getReadableDateTime(){
    let date_ob = new Date();

// current date
// adjust 0 before single digit date
let date = ("0" + date_ob.getUTCDate()).slice(-2);

// current month
let month = ("0" + (date_ob.getUTCMonth() + 1)).slice(-2);

// current year
let year = date_ob.getUTCFullYear();

// current hours
let hours = date_ob.getUTCHours();

// current minutes
let minutes = date_ob.getUTCMinutes();

// current seconds
let seconds = date_ob.getUTCSeconds();

// prints date in YYYY-MM-DD format
//console.log(year + "-" + month + "-" + date);

// prints date & time in YYYY-MM-DD HH:MM:SS format
return(year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds +" UTC");

}
function getCompactDateTime(){
    let date_ob = new Date();

// current date
// adjust 0 before single digit date
let date = ("0" + date_ob.getUTCDate()).slice(-2);

// current month
let month = ("0" + (date_ob.getUTCMonth() + 1)).slice(-2);

// current year
let year = date_ob.getUTCFullYear();

// current hours
let hours = date_ob.getUTCHours();

// current minutes
let minutes = date_ob.getUTCMinutes();

// current seconds
let seconds = date_ob.getUTCSeconds();

// prints date in YYYY-MM-DD format
//console.log(year + "-" + month + "-" + date);

// prints date & time in YYYY-MM-DD HH:MM:SS format
return("_"+year +"_" + month +"_" + date + "___" + hours + "_" + minutes + "_" + seconds +"_UTC");

}

function constructInfoBar(sockId){
    let outString;
    let readableDate = getReadableDateTime();
    let userSelf = invUsersObj[sockId]
    //console.log(userSelf)
    let clientId =chatPairs[sockId];
    let userBuddy = invUsersObj[clientId];
    //console.log(userBuddy);
    let outName = userBuddy + "_" + userSelf;
    return(outName + getCompactDateTime());
}

