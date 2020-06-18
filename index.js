
// importing modules
var express = require('express')
var app = express()
var http = require('http').createServer(app)
var io = require('socket.io')(http)
const host = '127.0.0.1'|| 'localhost';
const port = 5000 || process.env.PORT;

// accessing newsapi module
const NewsAPI = require('newsapi');
const { response } = require('express');
const newsapi = new NewsAPI('8ff2d269333b454fa928026b6304a231');
 // the fuction that sends data to the user is connected
var myObject = [];
function sendData(){
   var data= newsapi.v2.topHeadlines({
     language: 'en',
    country: 'za'
    }).then(response => {
     myObject = response.articles[2];
     console.log(myObject)
    })
 }   
app.get('/', (req, res, next)=>{
    res.sendFile(__dirname+'/index.html')
})
sendData()
// web sockets with socketIO
var online_members =0
io.on('connection', (socket)=>{
    online_members++;
    socket.emit('dataFromServer',  myObject)
    console.log(online_members +" user(s) online on our server")
    socket.on('disconnect', ()=>{
        online_members --;
        console.log(online_members +"  are online on our server")
    })
})

// starting the server
var server =http.listen(port, host, (err)=>{
    if(err){
        console.log(err)
    }else{
        var por = server.address().port;
        var hos = server.address().address;
        console.log(`Strawberry server is running on port ${por}`)
        console.log(`URL: http://${hos}:${por}/`)
    }
})



