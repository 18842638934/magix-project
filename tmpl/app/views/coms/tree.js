/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
module.exports = Magix.View.extend({
    tmpl: '@tree.html',
    tmplData: '@tree.html:data',
    render: function() {
        var me = this;
        me.request().all(['list', 'code'], function(err, bag, code) {
            me.$updater.set({
                id: me.id,
                list1:bag.get('data',[]),
                list2:code.get('data', [])
            }).digest();
        });
    }
});