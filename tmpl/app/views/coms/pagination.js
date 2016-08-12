/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
module.exports = Magix.View.extend({
    tmpl: '@pagination.html',
    tmplData: '@pagination.html:data',
    render: function() {
        var me = this;
        me.$updater.set({
            id: me.id
        }).digest();
    }
});