/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
module.exports = Magix.View.extend({
    tmpl: '@popover.html',
    tmplData: '@popover.html:data',
    render: function() {
        var me = this;
        me.$updater.digest();
    }
});