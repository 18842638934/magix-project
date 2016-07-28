/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
var $ = require('$');
var FX = require('../generic/fx');
module.exports = Magix.View.extend({
    ctor: function() {
        var me = this;
        me.$fx = new FX();
    },
    render: function() {
        var me = this;
        var node = $('#' + me.id);
        var fx = me.$fx;
        var height = node.prop('offsetHeight');
        node.prop('scrollTop', 0);
        node.append(node.children().first().clone());
        fx.onstop = function() {
            if (node.prop('scrollTop') + height >= node.prop('scrollHeight')) {
                node.prop('scrollTop', 0);
            }
        };
        var start = function() {
            start.timer = setTimeout(run, 5000);
        };
        var stop = function() {
            clearTimeout(start.timer);
        };
        var run = function() {
            var from = node.prop('scrollTop');
            fx.run(400, function(f) {
                node.prop('scrollTop', f(from, from + height));
            });
            start();
        };
        start();
        node.on('mouseenter', stop);
        node.on('mouseleave', start);
        me.on('destroy', function() {
            stop();
            node.off('mouseenter', stop);
            node.off('mouseleave', start);
        });
    }
});