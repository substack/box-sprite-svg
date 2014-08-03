var inherits = require('inherits');
var EventEmitter = require('events').EventEmitter;
var createElement = require('svg-create-element');

module.exports = Sprite;
inherits(Sprite, EventEmitter);

function Sprite (fn) {
    if (!(this instanceof Sprite)) return new Sprite(fn);
    EventEmitter.call(this);
    
    this.element = createElement('g');
    this.acceleration = { x: 0, y: 0 };
    this.velocity = { x: 0, y: 0 };
    this.position = { x: 0, y: 0 };
    
    if (fn) this.on('tick', fn);
}

Sprite.prototype.appendTo = function (target) {
    if (typeof target === 'string') target = document.querySelector(target);
    target.appendChild(this.element);
    return this;
};

Sprite.prototype.tick = function (dt) {
    var a = this.acceleration;
    var v = this.velocity;
    var p = this.position;
    
    v.x += a.x;
    v.y += a.y;
    p.x += v.x * dt / 1000;
    p.y += v.y * dt / 1000;
    
    this.emit('tick', dt);
    
    var tr = this.position.x + ',' + this.position.y;
    this.element.setAttribute('transform', 'translate(' + tr + ')');
};

Sprite.prototype.bbox = function () {
    return this.element.getBoundingClientRect();
};
