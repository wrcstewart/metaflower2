

const express = require('express');
const path = require('path');



const app = express();

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}
const server = app.listen(port, ()=>{
    console.log('App listening on 3000')
})

const io = require('socket.io')(server);
const url = 'mongodb+srv://wrcstewart:Ginger>1951@cluster0.ewegv.mongodb.net/my_database';



const MongoClient = require('mongodb').MongoClient;

const assert = require('assert');
const dbName = 'my_database2';
const client = new MongoClient(url, {useNewUrlParser: true ,useUnifiedTopology: true });

async function doIt() {
    //connection to db stuff
    let result1;
    //await client.connect(function (err) {
    let ddd = new Date();
    let ms1 = ddd.getTime();
    await client.connect();
    let dddd = new Date();
    let ms2 = dddd.getTime();
    console.log("connect time in ms")
    console.log(ms2-ms1);



    // assert.equal(null, err);


    console.log("Connected successfully to server");

    const globaldb2 = client.db(dbName);




   // await globaldb2.collection('Petals').insertOne
      //  (myDoc,async function(err,docs){/*await console.log("my test doc inserted")*/});
//await console.log((myDoc._id).toString());
    //result1 = await globaldb2.collection('Petals').findOne({ "_id": myDoc._id });
    //console.log("retrieved test doc using its id");
    //console.log(result1);
//
//const io = require('socket.io')(server);



app.get('/', (req, res) => {

        res.sendFile(path.resolve(__dirname, 'index9.html'))

    })

    app.get('/pieces/:id'), (req,res)=>

    let usersObj = {};
    let invUsersObj = {};
    let testUser = "user1";
    let chatPairs = {};
    console.log(usersObj[testUser]);
    getCompactDateTime();

    io.on('connection', (socket) => {
        console.log("socketID " + socket.id)
    });




    io.on('connection', (socket) => {
        socket.on('chat message', (msg) => {

            let message = msg.message;
            let status = msg.status;
            console.log(status);
            //console.log(db1);

            io.to(socket.id).emit('chat message', {user: "self", status: status, message: message});
            io.to(chatPairs[socket.id]).emit('chat message', {user: "buddy", status: status, message: message});
            //io.emit('chat message', msg);
            //console.log(msg);
            //console.log(socket.id);
        });



        socket.on('publish', async (msg) => {


            // do all the database stuff here

            let the_id = constructInfoBar(socket.id);
            let linkHtml = constructLinkHtml(the_id);


            //let the_idLink = "<a href= 'https://www.google.com' target='_blank'>google</a>"
             let the_idLink = linkHtml;


            msg = the_idLink + "<br>" + msg;

            let timeStored = new Date().getTime();
            let expiry = 0;
            let contentType = 'standard';
            let author1 = invUsersObj[socket.id]
            //console.log(userSelf)
            let clientId = chatPairs[socket.id];
            let author2 = invUsersObj[clientId];


            let doc= {_id:the_id,author1:author1,author2:author2,
                timeStored:timeStored,expiry:0,contentType:contentType,content:msg};


                await globaldb2.collection('Petals').insertOne
                (doc, async function (err, docs) {
                });



            let status = 'publish';
            // console.log(status);

            io.to(socket.id).emit('chat message', {user: "self", status: status, message: msg});
            io.to(chatPairs[socket.id]).emit('chat message', {user: "buddy", status: status, message: msg});
            //io.emit('chat message', msg);
            //console.log(msg);
            //console.log(socket.id);
            console.log(constructInfoBar(socket.id))


        });

        socket.on('publistupdate', async function(pubListQueryObj){

        let nRecs = pubListQueryObj.nRecs;
        let tempArray = new Array();
        //get the records and send update
        const cursor = globaldb2.collection('Petals').find({});
        await cursor.forEach(doc => tempArray.push(doc.content)); //will need to be modified
            io.to(socket.id).emit('pubupdateresponse', {responsearray: tempArray});
            io.to(chatPairs[socket.id]).emit('pubupdateresponse',{responsearray: tempArray} );
        })


        socket.on('help', (msg) => {
            let helpMessage = "";
            if (msg === 'explain panes') {

                helpMessage = "Explanation about the panes";
            }
            let status = 'help';
            console.log(msg);
            io.to(socket.id).emit('chat message', {user: "self", status: status, message: helpMessage});
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

    function constructLinkHtml(id){

        let lk = "<a href= 'localhost:3000/pieces/" +id+"'"+ " target='_blank'>test</a>";
        console.log(lk);
        return(lk);
    }

    function addUserToUserObj(msg) {

        usersObj[msg.user] = msg.socketID;
        invUsersObj[msg.socketID] = msg.user;

        console.log(usersObj);
        console.log(invUsersObj);

        if (msg.user == "user2") testInitialiseChatPairs();

    }

    function testInitialiseChatPairs() {
// assumes as an example user1 and user 2 have agreed a chat.

        chatPairs[usersObj["user1"]] = usersObj["user2"];//should be socket ids
        chatPairs[usersObj["user2"]] = usersObj["user1"];
        console.log(chatPairs)

    }

    function getReadableDateTime() {
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
        return (year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds + " UTC");

    }

    function getCompactDateTime() {
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
        return ("_" + year + "_" + month + "_" + date + "___" + hours + "_" + minutes + "_" + seconds + "_UTC");

    }

    function constructInfoBar(sockId) {
        let outString;
        let readableDate = getReadableDateTime();
        let userSelf = invUsersObj[sockId]
        //console.log(userSelf)
        let clientId = chatPairs[sockId];
        let userBuddy = invUsersObj[clientId];
        //console.log(userBuddy);
        let outName = userBuddy + "_" + userSelf;
        return (outName + getCompactDateTime());
    }
}
doIt()