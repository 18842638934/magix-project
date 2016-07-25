define('app/views/demos/index',['magix','$'],function(require,exports,module){
/*Magix ,$ */
/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
var $ = require('$');
Magix.applyStyle('mp-afd',".mp-afd-w900{color:red}.mp-afd-w500{color:green}.content .mp-afd-w500{color:#ff0}");
module.exports = Magix.View.extend({
    tmpl: "<div class=\"<%=cls%>\" mx-guid=\"xae61-\u001f\">响应式测试，经验页</div>",
    render: function() {
        var me = this;
        me.update();
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