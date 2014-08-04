# box-sprite-svg

2d physics container for svg elements

# example

To drive an svg circle around, starting from this html:

``` html
<!doctype html5>
<html>
  <body>
    <svg xmlns="http://www.w3.org/2000/svg">
      <circle id="player" cx=250 cy=250 r=10 fill="blue"></circle>
    </svg>
    <script src="bundle.js"></script>
  </body>
</html>
```

we can wrap the player element in a sprite and change its velocity when a key is
pressed:

``` js
var Sprite = require('box-sprite-svg');
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
```

# methods

``` js
var Sprite = require('box-sprite-svg');
```

## var sp = Sprite(elem, fn)

Create a new sprite instance `sp` given an element `elem`.

Optionally register an `fn` handler for the `'tick'` event.

You can also create a new `Sprite` using inheritance with a module like
[inherits](https://npmjs.org/package/inherits):

``` js
var Sprite = require('box-sprite-svg');
var inherits = require('inherits');

inherits(Player, Sprite);

function Player (elem) {
    if (!(this instanceof Player)) return new Player(elem);
    Sprite.call(this, elem);
}

Player.prototype.jump = function () {
    if (this.position.y !== 0) return;
    this.velocity.y = -1450;
    this.acceleration.y = 120;
};
```

## sp.bbox()

Return the bounding rectangle of the underlying svg element. This is very handy
for computing collisions among sprites.

## sp.appendTo(target)

Append the current sprite element to a dom node or query selector string
`target`.

## sp.tick(dt)

Call this method when you want the sprite to advance by `dt`, a time delta in
milliseconds.

## sp.reset()

Set the motion properties all back to `(0,0)`, remove the element from its
parent node, and unregister all listeners.

This method is very handy for reusing sprites, which you'll probably want to do
for performance reasons.

# properties

## sp.acceleration = { x: 0, y: 0 }

Change in velocity as pixels per second per second

## sp.velocity = { x: 0, y: 0 }

Change in position as pixels per second

## sp.position = { x: 0, y: 0 }

Coordinates as pixels

# events

## sp.on('tick', function (dt) {})

Every time `.tick(dt)` is called with the time delta `dt`, this event fires.

## sp.on('reset', function () {})

When the `.reset()` method is called, this event fires.

# install

With [npm](https://npmjs.org) do:

```
npm install box-sprite-svg
```

# license

MIT
