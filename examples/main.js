var scrollBounds = require('../index');

var bounds = scrollBounds(document.getElementById('outer'));

bounds.on('top', function () { console.log('TOP'); });
bounds.on('bottom', function () { console.log('BOTTOM'); });
bounds.on('break', function (boundary) { console.log('was: ', boundary); });
