define('coms/range/index',['magix','jquery','../dragdrop/index'],function(require,exports,module){
/*Magix ,$ ,DD */
/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
var $ = require('jquery');
Magix.applyStyle('mx-ec8',".mx-ec8-tracker{width:300px;height:4px;background:#aaa;position:relative;margin:60px}.mx-ec8-indicator{border-radius:8px;width:16px;height:16px;position:absolute;left:-6px;top:-6px;cursor:move;background:#aaa}");
var DD = require('../dragdrop/index');
var tmpl = "<div class=\"mx-ec8-tracker\"><div class=\"mx-ec8-indicator\" mx-mousedown=\"drag()\"></div></div>";
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
});