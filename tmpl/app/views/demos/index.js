/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
var $ = require('$');
var FX = require('@coms/generic/fx');
Magix.applyStyle('@index.css');
module.exports = Magix.View.extend({
    tmpl: '@index.html',
    tmplData: '@index.html:data',
    render: function() {
        var me = this;
        me.update();
        var fx = new FX();
        var node = $('#counter');
        fx.run(1000, function(f) {
            //console.log(f(0,2000));
            node.html(f(0, 2000).toFixed(0));
        });
        fx.run(60000, function(f) {
            node.html(f(2000, 20000).toFixed(0));
        });
        fx.run(60000, function(f) {
            node.html(f(20000, -20000).toFixed(0));
        });
        me.capture('fx', fx);
        console.log(me.capture('fx'));
    },
    update: function() {
        var width = $(window).width();
        var data = this.$updater;
        if (width > 500) {
            data.set({
                cls: '@index.css:w900'
            });
        } else {
            data.set({
                cls: '@index.css:w500'
            });
        }
        data.digest();
    },
    '$win<resize>': function() {
        this.update();
    }
});