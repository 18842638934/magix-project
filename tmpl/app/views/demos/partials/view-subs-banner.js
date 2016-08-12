/*
    author:xinglie.lkf@taobao.com
 */
'ref@../view-subs.css';
var Magix = require('magix');
module.exports = Magix.View.extend({
    tmpl: '@view-subs-banner.html',
    tmplData: '@view-subs-banner.html:data',
    render: function() {
        var me = this;
        setTimeout(me.wrapAsync(function() {
            me.$updater.digest();
        }), 10000);
    }
});