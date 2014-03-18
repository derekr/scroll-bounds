var inherits = require('inherits')
    EventEmitter = require('events').EventEmitter;

function ScrollBounds ($el) {
    var me = this;

    this.boundary = null;

    $el.addEventListener('scroll', function (e) {
        var target = e.target;

        if (target.scrollTop === 0) {
            me.boundary = 'top';
            me.emit(me.boundary);
            return;
        }

        if (target.scrollHeight <= target.clientHeight + target.scrollTop) {
            me.boundary = 'bottom';
            me.emit(me.boundary);
            return;
        }

        if (me.boundary !== null) {
            me.emit('break', me.boundary);
            me.boundary = null;
        }
    });
}

inherits(ScrollBounds, EventEmitter);

module.exports = function ($el) {
    return new ScrollBounds($el);
};
