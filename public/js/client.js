var socket    = io.connect();
var title     = $('#title');
var color     = title.css('background-color');
var root      = new TimelineMax();

title.css('transform', 'scaleX(0)');

function reshow(i) {

    if(i == undefined) {
      console.log('re display');
      socket.emit('display_current');
    }
}

function hide() {
  TweenLite.to(title, 1, {transform: 'scaleX(0)', "transform-origin": 'right', color: color});
}

function show(t, c, h, tl, i) {
  title.text(t);
  if(c != 'none') {
    title.attr('class', 'text-'+c)
  }
  TweenLite.to(title, 1, {transform: 'scaleX(1)', "transform-origin": 'left', color: 'white'});

  if(h && h > 0) {
    tl.addPause('+='+h, hide);
  }

  reshow(i);
}

socket.on('display_title', function (o){

  console.log(o)
  tl = new TimelineMax();
  tl.add(hide);

  var c = 'none'
  if(o.class && o.class != '') {
    c = o.class
  }

  tl.addPause('+=1', show, [o.title, c, o.duration, tl, o.i]);

  root.add(tl);

});
