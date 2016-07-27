define('app/views/demos/index',['magix','$','../../../coms/generic/fx'],function(require,exports,module){
/*Magix ,$ ,FX */
/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
var $ = require('$');
var FX = require('../../../coms/generic/fx');
Magix.applyStyle('mp-afd',".mp-afd-w900{color:red}.mp-afd-w500{color:green}.content .mp-afd-w500{color:#ff0}");
module.exports = Magix.View.extend({
    tmpl: "<div class=\"<%=cls%>\" mx-guid=\"xae61-\u001f\">响应式测试，经验页</div><div id=\"counter\">--</div>",
    render: function() {
        var me = this;
        me.update();
        var fx = new FX();
        var node = $('#counter');
        fx.run(1000, function(f) {
            node.html(f(0, 2000).toFixed(0));
        });
        fx.run(60000, function(f) {
            node.html(f(2000, 20000).toFixed(0));
        });
        fx.run(60000, function(f) {
            node.html(f(20000, -20000).toFixed(0));
        });
        me.capture('fx', fx);
    },
    update: function() {
        var width = $(window).width();
        var data = this.$updater;
        if (width > 500) {
            data.set({
                cls: 'mp-afd-w900'
            });
        } else {
            data.set({
                cls: 'mp-afd-w500'
            });
        }
        data.digest();
    },
    '$win<resize>': function() {
        this.update();
    }
});
});