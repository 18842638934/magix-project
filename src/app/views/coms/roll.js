define('app/views/coms/roll',['magix'],function(require,exports,module){
/*Magix */
/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
Magix.applyStyle('mp-14b',".mp-14b-roll{overflow:hidden;background:#eee;margin:100px}.mp-14b-roll,.mp-14b-roll li{height:40px;width:400px}.mp-14b-roll li{line-height:40px;text-align:center}");
module.exports = Magix.View.extend({
    tmpl: "<ul mx-view=\"coms/roll/index\" class=\"mp-14b-roll\"><li>one</li><li>two</li><li>three</li></ul>",
    tmplData: [],
    render: function() {
        var me = this;
        me.$updater.digest();
    }
});
});