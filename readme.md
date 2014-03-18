# ScrollBounds

Event emitter for scroll boundaries. Useful when you want to know if the
target element has been scrolled to its edges.

Currently only top and bottom are supported.

## Usage

```
npm install scroll-bounds --save
```

```js
var scrollBounds = require('scroll-bounds');

var b = scrollBounds(document.getElementById('outer'));

b.on('top', function () { console.log('TOP'); });
b.on('bottom', function () { console.log('BOTTOM'); });
b.on('break', function (boundary) { console.log('was: ', boundary); });
```

## Events

### b.on('top', cb)

When the target viewport has scrolled to the top.

### b.on('bottom', cb)

When the target viewport has scrolled to the bottom.

### b.on('break', cb)

When the initial scroll position at time of scrolling is at a boundary and
then scrolled away from. `cb` will contain the last set boundary.

![Scrolllll](http://media2.giphy.com/media/8CAFRDokyQkhi/giphy.gif)
