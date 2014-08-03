var Sprite = require('../');
var Loop = require('frame-loop');
var keyname = require('keynames');

var elem = document.querySelector('svg #player');
var sp = Sprite(elem);

var engine = Loop(function (dt) {
    sp.tick(dt);
});
engine.run();

window.addEventListener('keydown', function (ev) {
    var name = keyname[ev.which];
    if (name === 'left') sp.velocity.x = -300;
    if (name === 'right') sp.velocity.x = 300;
    if (name === 'up') sp.velocity.y = -300;
    if (name === 'down') sp.velocity.y = 300;
});
window.addEventListener('keyup', function (ev) {
    var name = keyname[ev.which];
    if (name === 'left' || name === 'right') sp.velocity.x = 0;
    if (name === 'up' || name === 'down') sp.velocity.y = 0;
});
