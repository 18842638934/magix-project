/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
var DD = require('./index');
var Autoscroll = require('../autoscroll/index');
var $ = require('$');
var Prefix = '~';
var DragStartEvent = 'mousedown touchstart';
var DragCheck = function(e) {
    var f = e.touches && e.touches.length == 1;
    if (!f) {
        f = (e.which | e.button) === 1;
    }
    return f;
};
var DragdropZone = Magix.Base.extend({
    addZone: function(zoneNode) {
        var me = this;
        var node = $(zoneNode);
        if (!me.$zones) {
            me.$zones = [];
        }
        var id = node.attr('id');
        if (!id) {
            node.attr('id', id = Magix.guid('ddz'));
        }
        var key = Prefix + id;
        if (!me.$zones[key]) {
            me.$zones[key] = 1;
            me.$zones.push(node[0]);
            if (!me.$dragStart) me.$dragStart = $.proxy(me.dragStart, me);
            node.on(DragStartEvent, me.$dragStart);
        }
    },
    removeZone: function(zoneNode) {
        var me = this;
        var zones = me.$zones;
        if (zones) {
            var node = $(zoneNode);
            var id = node.attr('id');
            node.off(DragStartEvent, me.$dragStart);
            var key = Prefix + id;
            delete zones[key];
            for (var i = zones.length - 1; i >= 0; i--) {
                if (zones[i] == node[0]) {
                    zones.splice(i, 1);
                    break;
                }
            }
        }
    },
    findHoverZone: function(node) {
        var me = this,
            zones = me.$zones;
        if (zones) {
            for (var i = zones.length - 1; i >= 0; i--) {
                if (Magix.inside(node, zones[i])) {
                    return zones[i];
                }
            }
        }
        return null;
    },
    findDirectChild: function(target, zone) {
        var me = this;
        var child = null;
        zone = zone || me.findHoverZone(target);
        if (zone) {
            while (zone != target) {
                if (target.parentNode == zone) {
                    child = target;
                    break;
                } else {
                    target = target.parentNode;
                }
            }
        }
        return {
            child: child,
            zone: zone
        };
    },
    dragStart: function(e) {
        var me = this;
        me.$hoverInfo = {};
        if (DragCheck(e)) {
            var info = me.findDirectChild(e.target);
            if (info.child) {
                if (!me.$dragMove) me.$dragMove = $.proxy(me.dragMove, me);
                if (!me.$dragEnd) me.$dragEnd = $.proxy(me.dragEnd, me);
                me.fire('dragstart', info);
                DD.begin(info.child, me.$dragMove, me.$dragEnd);
            }
        }
    },
    hoverChildPlace: function(e, hoverInfo) {
        var position = 0,
            side = 0,
            toLeft = -1,
            toTop = -1,
            toRight = -1,
            toBottom = -1;
        var nb = hoverInfo.underChildBound;
        if (e.pageX >= nb.x && e.pageX <= nb.x + nb.width) {
            position = position | ((e.pageX <= nb.x + nb.width / 2) ? DragdropZone.LEFT : DragdropZone.RIGHT);
            toLeft = e.pageX - nb.x;
            toRight = nb.x + nb.width - e.pageX;
        }
        if (e.pageY >= nb.y && e.pageY <= nb.y + nb.height) {
            position = position | ((e.pageY <= nb.y + nb.height / 2) ? DragdropZone.TOP : DragdropZone.BOTTOM);
            toTop = e.pageY - nb.y;
            toBottom = nb.y + nb.height - e.pageY;
        }
        var temp = Math.min(toLeft, toTop, toRight, toBottom);
        if (temp > -1) {
            if (temp == toLeft) {
                side = DragdropZone.LEFT;
            } else if (temp == toTop) {
                side = DragdropZone.TOP;
            } else if (temp == toRight) {
                side = DragdropZone.RIGHT;
            } else if (temp == toBottom) {
                side = DragdropZone.BOTTOM;
            }
        }
        var me = this;
        if (hoverInfo.underSide != side || hoverInfo.underPosition != position) {
            hoverInfo.underSide = side;
            hoverInfo.underPosition = position;
            me.fire('hoverchildplacechanged', {
                position: position,
                side: side,
                child: hoverInfo.underChild,
                childBound: nb
            });
        }
    },
    dragMove: function(e) {
        var me = this;
        me.fire('dragmove', {
            pageX: e.pageX,
            pageY: e.pageY
        });
        e.preventDefault();
        DD.clear();
        var hoverInfo = me.$hoverInfo;
        var zoneScroll = hoverInfo.zoneScroll;
        if (zoneScroll) zoneScroll.check(e);
        if (me.$scrolling) return;
        var currentNode = DD.fromPoint(e.clientX, e.clientY);
        if (hoverInfo.underNode != currentNode) {
            hoverInfo.underNode = currentNode;
            var zone = me.findHoverZone(e.target);
            if (zone) {
                if (zone != hoverInfo.underZone) {
                    hoverInfo.underZone = zone;
                    zoneScroll = me.getZoneScroll(zone);
                    hoverInfo.zoneScroll = zoneScroll;
                    zoneScroll.onscroll = function() {
                        me.$scrolling = true;
                        DD.clear();
                        me.fire('zonescroll');
                        if (hoverInfo.underChild) {
                            delete hoverInfo.underChild;
                            delete hoverInfo.underNode;
                            me.fire('hoverchildchanged', {
                                zone: zone,
                                child: null
                            });
                        }
                    };
                    zoneScroll.onstop = function() {
                        delete me.$scrolling;
                    };
                    zoneScroll.start();
                    var nZone = $(zone);
                    var zoneOffset = nZone.offset();
                    me.fire('hoverzonechanged', {
                        zone: zone,
                        zoneBound: {
                            x: zoneOffset.left,
                            y: zoneOffset.top,
                            width: nZone.width(),
                            height: nZone.height()
                        }
                    });
                }
                var info = me.findDirectChild(currentNode, zone);
                if (info.child) {
                    if (hoverInfo.underChild != info.child) {
                        hoverInfo.underChild = info.child;
                        delete hoverInfo.underPosition;
                        var node = $(info.child);
                        var offset = node.offset();
                        var width = node.outerWidth();
                        var height = node.outerHeight();
                        hoverInfo.underChildBound = {
                            x: offset.left,
                            y: offset.top,
                            width: width,
                            height: height
                        };
                        me.fire('hoverchildchanged', info);
                        me.hoverChildPlace(e, hoverInfo);
                    }
                } else if (hoverInfo.underChild) {
                    delete hoverInfo.underChild;
                    me.fire('hoverchildchanged', {
                        zone: zone,
                        child: null
                    });
                }
            } else {
                if (hoverInfo.underChild) {
                    delete hoverInfo.underChild;
                    me.fire('hoverchildchanged', {
                        zone: zone,
                        child: null
                    });
                }
                delete hoverInfo.underZone;
                me.fire('hoverzonechanged', {
                    zone: null
                });
            }
        } else if (hoverInfo.underChild && hoverInfo.underChildBound) {
            me.hoverChildPlace(e, hoverInfo);
        }
    },
    dragEnd: function() {
        var me = this;
        var hoverInfo = me.$hoverInfo;
        var zoneScroll = hoverInfo.zoneScroll;
        if (zoneScroll) zoneScroll.finish();
        me.fire('dragend', {
            child: hoverInfo.underChild,
            zone: hoverInfo.underZone,
            position: hoverInfo.underPosition,
            side: hoverInfo.underSide
        });
    },
    getZoneScroll: function(zone) {
        var me = this;
        var scrolls = me.$scrolls;
        var id = zone.id;
        if (!scrolls) me.$scrolls = scrolls = {};
        if (!scrolls[id]) {
            scrolls[id] = new Autoscroll(zone, 10);
        }
        return scrolls[id];
    },
    destroy: function() {
        var me = this;
        var zones = me.$zones;
        var scrolls = me.$scrolls;
        for (var i = zones.length - 1; i >= 0; i--) {
            var n = zones[i];
            if (scrolls) {
                var scroll = scrolls[n.id];
                if (scroll) scroll.finish();
            }
            $(n).off(DragStartEvent, me.$dragStart);
        }
        delete me.$zones;
        delete me.$hoverInfo;
        delete me.$scrolls;
        delete me.$dragStart;
        delete me.$dragMove;
        delete me.$dragEnd;
    }
}, {
    LEFT: 1,
    TOP: 2,
    RIGHT: 4,
    BOTTOM: 8
});
module.exports = DragdropZone;