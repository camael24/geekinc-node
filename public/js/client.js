var socket    = io.connect();
var title     = $('#title');
var color     = title.css('background-color');

title.css('transform', 'scaleX(0)');

function hide() {
  TweenLite.to(title, 1, {transform: 'scaleX(0)', "transform-origin": 'right', color: color});
  console.log('hide')
}
function show(t, h, tl) {
  title.text(t);
  TweenLite.to(title, 1, {transform: 'scaleX(1)', "transform-origin": 'left', color: 'white'});
  console.log('show')

  if(h && h > 0) {
    console.log('Hide after', h)
    tl.addPause('+='+h, hide);
  }
}


socket.on('display_title', function (o){
  var tl = new TimelineMax();

  tl.add(hide, 1);
  tl.addPause('+=1', show, [o.title, o.duration, tl]);
});
