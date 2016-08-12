/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
module.exports = Magix.View.extend({
    tmpl: '@index.html',
    tmplData: '@index.html:data',
    render: function() {
        var me = this;
        me.$updater.digest();
    }
});