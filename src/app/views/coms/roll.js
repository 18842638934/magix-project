define('app/views/coms/roll',['magix'],function(require,exports,module){
/*Magix */
/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
Magix.applyStyle('mx-14b',".mx-14b-roll{overflow:hidden;background:#eee;margin:100px}.mx-14b-roll,.mx-14b-roll li{height:40px;width:400px}.mx-14b-roll li{line-height:40px;text-align:center}");
module.exports = Magix.View.extend({
    tmpl: {"html":"<ul mx-view=\"coms/roll/index\" class=\"mx-14b-roll\"><li>one</li><li>two</li><li>three</li></ul>","subs":[]},
    tmplData: [],
    render: function() {
        var me = this;
        me.$updater.digest();
    }
});
});