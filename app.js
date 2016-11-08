var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var express =  require('express');

server.listen(3001);
app.use(express.static('public'));
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/public/index.html');
});

io.on('connection', function (socket) {
  socket.on('message', function (data) {
    console.log(data);
	io.emit('message',data);
  });
});