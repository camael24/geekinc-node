var socket    = io.connect();
var title     = $('#title');
var color     = title.css('background-color');
var tl        = new TimelineMax();

title.css('transform', 'scaleX(0)');

function hide() {
  TweenLite.to(title, 1, {transform: 'scaleX(0)', "transform-origin": 'right', color: color});
}
function show(t, h, tl) {
  title.text(t);
  TweenLite.to(title, 1, {transform: 'scaleX(1)', "transform-origin": 'left', color: 'white'});

  if(h && h > 0) {
    console.log('Hide after', h)
    tl.addPause('+='+h, hide);
  }
}


socket.on('display_title', function (o){

  console.log(o)
  tl.progress(1); // TODO : this not take about the ended :/
  tl.add(hide);
  tl.addPause('+=1', show, [o.title, o.duration, tl]);
});
