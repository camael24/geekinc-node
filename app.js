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


    function save() {

    }

    io.on('connection', function (socket) {

      io.sockets.emit('init', data);

      socket.on('display_current', function () {

        for(j = 0; j < data.length ; j++) {
          if(data[j].current == true) {
            console.log('auto display', data[j])
            var d = data[j];
            d.i = '-1'
            io.sockets.emit('display_title', d);
            return
          }
        }
      });

      socket.on('display', function (e) {
        console.log('display', e);

        if(e.i != undefined) {
          for(j = 0; j < data.length ; j++) {
            data[j].current = false
          }

          data[e.i].current = true;


          jsonfile.writeFileSync(file, data);
          io.sockets.emit('init', data);
        }

        io.sockets.emit('display_title', e);
      })

      socket.on('current', function (i) {


      })

      socket.on('save', function (e) {
        // TODO : bug on first addition (see the i value)

        if(e) {
          var i = e.i;
          delete e.i;

          if(!e.current) {
            e.current = false;
          }

          if (i  >= 0) {
            data[i] = e;
          }
          else {
            data.push(e);
          }
        }
        console.log('save', data)

        jsonfile.writeFileSync(file, data);

        io.sockets.emit('display', e);
        io.sockets.emit('init', data);
      })
    });

    io.listen(app.listen(8081));

});
