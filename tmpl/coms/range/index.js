/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
var $ = require('jquery');
Magix.applyStyle('@index.css');
var DD = require('../dragdrop/index');
var tmpl = '@index.html';
module.exports = Magix.View.extend({
    render: function() {
        var me = this;
        me.setHTML(me.id, tmpl);
    },
    'drag<mousedown>': function(e) {
        var current = $(e.current);
        var width = current.width();
        var half = width / 2;
        var min = -half; //最小
        var pWidth = current.parent().width();
        var max = pWidth - half; //最大
        var currentX = parseInt(current.css('left'), 10);
        var last;
        var node = $('#' + this.id);
        DD.begin(e.current, function(ex) {
            DD.clear();
            var newX = currentX + ex.pageX - e.pageX;
            if (newX < min) newX = min;
            else if (newX > max) newX = max;
            var p = (newX + half) / pWidth;
            if (p != last) {
                last = p;
                current.css({
                    left: newX
                });
                node.trigger({
                    type: 'change',
                    value: p
                });
            }
        });
    }
});