var fs        = require('fs');
var express   = require('express');
var app       = express();
var server    = require('http').Server(app);
var io        = require('socket.io')(server);
var jsonfile  = require('jsonfile')
var util      = require('util')

var file = 'data.json'
var data = [];

fs.lstat(file, function(err, stats) {

    if (!err && stats.isFile()) {
        data = jsonfile.readFileSync(file);
    }
    else {
        jsonfile.writeFileSync(file, []);
    }

    app.use(express.static('./public')) // Indique que le dossier /public contient des fichiers statiques (middleware chargé de base)
     .use(function(req, res){ // Répond enfin
         res.send('Hello');
    });

    io.on('connection', function (socket) {

      io.sockets.emit('init', data);

      socket.on('display', function (data) {
        console.log('display', data);
        io.sockets.emit('display_title', data);
      })

      socket.on('save', function (e) {
        // TODO : bug on first addition (see the i value)

        if (e.i  > 0) {
          data[e.i] = e;
        }
        else {
          e.i = null
          data.push(e);
        }
        console.log('save', data)

        jsonfile.writeFileSync(file, data);

        io.sockets.emit('display', e);
        io.sockets.emit('init', data);
      })
    });

    io.listen(app.listen(8081));

});
