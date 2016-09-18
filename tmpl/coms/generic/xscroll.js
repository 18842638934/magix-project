/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
var $ = require('$');
var TOP = 1;
var BOTTOM = 2;
module.exports = Magix.Base.extend({
    link: function(itemHeight, viewportMax, list, node) {
        var me = this;
        me.$h = itemHeight;
        me.$l = list;
        me.$s = Math.floor(viewportMax / 5);
        me.$m = viewportMax;
        if (viewportMax < list.length) {
            var totalHeight = list.length * itemHeight;
            var before = 0,
                after = totalHeight - viewportMax * itemHeight,
                newList = list.slice(0, viewportMax);
            me.fire('update', me.$i = {
                before: before,
                after: after,
                list: newList
            });
        } else {
            me.fire('update', me.$i = {
                before: 0,
                after: 0,
                list: list
            });
        }
        me.bind(node);
    },
    scroll: function(node) {
        var me = this;
        if (me.$cancel) return;
        var top = node.scrollTop;
        var to = '';
        var info = me.$i;
        var before = info.before;
        var after = info.after;
        var offset = me.$s;
        var height = me.$h;
        var max = me.$m;
        var list = me.$l;
        if (after > 0 && top + offset * height > before + max * height) {
            to = BOTTOM;
        } else if (before > 0 && top < before + offset * height) {
            to = TOP;
        }
        if (to) {
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
    },
    bind: function(node) {
        node = Magix.node(node);
        var me = this;
        if (node) {
            me.$cancel = 1;
            node.scrollTop = 0;
            delete me.$cancel;
            if (!me.$node) {
                me.$node = node;
                $(node).on('scroll', me.$scroll = $.proxy(me.scroll, me, node));
            }
        }
    },
    destroy: function() {
        var me = this;
        var node = me.$node;
        if (node) {
            $(node).off('scroll', me.$scroll);
            delete me.$node;
            delete me.$scroll;
        }
    }
});