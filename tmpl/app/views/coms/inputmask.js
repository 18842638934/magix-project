/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
module.exports = Magix.View.extend({
    tmpl: '@inputmask.html',
    tmplData: '@inputmask.html:data',
    render: function() {
        var me = this;
        me.$updater.digest();
    }
});