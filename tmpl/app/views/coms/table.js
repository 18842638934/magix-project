/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
module.exports = Magix.View.extend({
    tmpl: '@table.html',
    tmplData: '@table.html:data',
    render: function() {
        var me = this;
        me.$updater.digest();
    }
});