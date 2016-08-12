define('app/views/home/index',['magix'],function(require,exports,module){
/*Magix */
/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
module.exports = Magix.View.extend({
    tmpl: "Magix 示例项目",
    tmplData: [],
    render: function() {
        var me = this;
        me.$updater.digest();
    }
});
});