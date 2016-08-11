define('app/views/coms/inputmask',['magix'],function(require,exports,module){
/*Magix */
/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
module.exports = Magix.View.extend({
    tmpl: {"html":"<div style=\"margin:50px\"><input class=\"input\" mx-view=\"coms/inputmask/index?mask=9999-aaaa-w*ww99\"/> <input class=\"input\" mx-view=\"coms/inputmask/index?mask=999.999.999.999\" placeholder=\"IPV4\"/></div>","subs":[]},
    tmplData: [],
    render: function() {
        var me = this;
        me.$updater.digest();
    }
});
});