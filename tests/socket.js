'use strict';

const path = require('path');
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(5001);
// WARNING: app.listen(80) will NOT work here!

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/socket.html'));
});

io.on('connection', function(socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function(data) {
    console.log(data);
  });
});
