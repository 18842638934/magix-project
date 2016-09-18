define('coms/generic/xwinscroll',['magix','jquery'],function(require,exports,module){
/*Magix ,$ */
/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
var $ = require('jquery');
var TOP = 1;
var BOTTOM = 2;
var Win = $(window);
module.exports = Magix.Base.extend({
    link: function(itemHeight, list, cnt) {
        var me = this;
        me.$h = itemHeight;
        me.$l = list;
        me.$c = cnt;
        if (!me.$resize) {
            Win.on('resize', me.$resize = function() {
                var viewportMax = Math.floor(Win.height() / itemHeight) * 4;
                me.$s = Math.floor(viewportMax / 4);
                me.$m = viewportMax;
                me.scroll();
            });
            Win.on('scroll', me.$scroll = $.proxy(me.scroll, me));
            me.scroll();
        }
        delete me.$i;
        me.$resize();
    },
    scroll: function() {
        var me = this;
        var pos = $(me.$c).offset() || {
            top: 0
        };
        var top = Win.scrollTop() - pos.top;
        var to = '';
        var info = me.$i;
        var offset = me.$s;
        var height = me.$h;
        var max = me.$m;
        var list = me.$l;
        var before, after;
        //console.log(info, pos, top, offset * height, max * height);
        if (info) {
            before = info.before;
            after = info.after;
            if (after > 0 && top + offset * height > before + max * height) {
                to = BOTTOM;
            } else if (before > 0 && top < before + offset * height) {
                to = TOP;
            }
            if (to) {
                console.log('to', to);
                var items = to == TOP ? max - offset : offset;
                before = Math.max(top - items * height, 0);
                after = Math.max(list.length * height - before - max * height, 0);
                var start = Math.floor(before / height);
                me.fire('update', me.$i = {
                    before: before,
                    after: after,
                    list: list.slice(start, start + max)
                });
            }
        } else {
            if (max < list.length) {
                var totalHeight = list.length * height;
                before = 0;
                after = totalHeight - max * height;
                me.fire('update', me.$i = {
                    before: before,
                    after: after,
                    list: list.slice(0, max)
                });
            } else {
                me.fire('update', me.$i = {
                    before: 0,
                    after: 0,
                    list: list
                });
            }
        }
    },
    destroy: function() {
        var me = this;
        Win.off('resize', me.$resize);
        Win.off('scroll', me.$scroll);
        delete me.$resize;
        delete me.$scroll;
    }
});
});