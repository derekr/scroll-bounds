var inherits = require('inherits'),
    EventEmitter = require('events').EventEmitter;

/**
 * Determining bottom of element is different for body.
 */
function isBottom ($el) {
    if ($el === window || $el === document.body) {
        var body = document.body
        return (window.innerHeight >= body.clientHeight - body.scrollTop);
    } else {
        return ($el.scrollHeight <= $el.clientHeight + $el.scrollTop);
    }
}

function ScrollBounds ($el, data) {
    data = data || {};

    if (typeof data.interval === 'number') data.interval = 50;

    var me = this;

    this.$el = $el;

    this.boundary = null;

    /**
     * When listening on body scroll events sometimes the event would
     * stop firing. Simpler to check scroll position on an interval.
     */
    setInterval(function () {
        me.scrolled();
    }, data.interval);
}

inherits(ScrollBounds, EventEmitter);

ScrollBounds.prototype.scrolled = function () {
    var bottom = isBottom(this.$el);

    if (this.$el.scrollTop === this.lastScrollTop) return;

    this.lastScrollTop = this.$el.scrollTop;

    if (this.$el.scrollTop === 0) {
        this.boundary = 'top';
        this.emit(this.boundary);
        return;
    }

    if (isBottom(this.$el)) {
        this.boundary = 'bottom';
        this.emit(this.boundary);
        return;
    }

    if (this.boundary !== null) {
        this.emit('break', this.boundary);
        this.boundary = null;
    }
};

module.exports = function ($el, data) {
    return new ScrollBounds($el, data);
};
