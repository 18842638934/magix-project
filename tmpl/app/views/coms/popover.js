/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
module.exports = Magix.View.extend({
    tmpl: '@popover.html',
    render: function() {
        var me = this;
        me.$updater.digest();
    }
});