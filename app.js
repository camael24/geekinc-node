var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('./public')) // Indique que le dossier /public contient des fichiers statiques (middleware chargé de base)
 .use(function(req, res){ // Répond enfin
     res.send('Hello');
});

io.on('connection', function (socket) {

  var data = [];

  data.push({ "title" : "Hello le monde", "duration" : 1, "class" : "geekinc", "current": true  });
  data.push({ "title" : "Coucou babar",   "duration" : 0, "class" : "geekinc", "current": false });
  data.push({ "title" : "Régie en PLS",   "duration" : 0, "class" : "geekinc", "current": false });

  io.sockets.emit('init', data);

  socket.on('display', function (data) {
    console.log(data);
    io.sockets.emit('display_title', data);
  })
});

io.listen(app.listen(8081));
