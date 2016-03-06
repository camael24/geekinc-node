var title     = $('#title');
var duration  = 2;
var tl        = new TimelineMax();
var color     = title.css('background-color');

title.css('transform', 'scaleX(0)');
title.text('Bouuuh')

function hide() {
console.log('d');
}

tl.add( TweenLite.to(title, 1, {transform: 'scaleX(1)', "transform-origin": 'right', color: 'white'}) )
tl.addPause(1 , hide)
//tl.add( TweenLite.to(title, 1, {transform: 'scaleX(0)', "transform-origin": 'right', color: color}))

//tween.to(title, 1, {transform: 'scaleX(0)', "transform-origin": 'right', color: color});
//tween.to(title, 1, {transform: 'scaleX(1)', "transform-origin": 'left', color: 'white'});
//tween.to(title, 1, {transform: 'scaleX(0)', "transform-origin": 'right', color: color});
