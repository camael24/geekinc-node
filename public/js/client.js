var socket    = io.connect();
var title     = $('#title');
var color     = title.css('background-color');
var root      = new TimelineMax();

title.css('transform', 'scaleX(0)');

function hide() {
  TweenLite.to(title, 1, {transform: 'scaleX(0)', "transform-origin": 'right', color: color});
}

function show(t, c, h, tl) {
  title.text(t);
  if(c != 'none') {
    title.attr('class', 'text-'+c)
  }
  TweenLite.to(title, 1, {transform: 'scaleX(1)', "transform-origin": 'left', color: 'white'});

  if(h && h > 0) {
    tl.addPause('+='+h, hide);
  }
}

socket.on('display_title', function (o){

  console.log(o)
  tl = new TimelineMax();
  tl.add(hide);

  var c = 'none'
  if(o.class && o.class != '') {
    c = o.class
  }

  tl.addPause('+=1', show, [o.title, c, o.duration, tl]);

  root.add(tl);
});
