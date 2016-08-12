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
            console.time('test');
            me.$updater.set({
                id: me.id,
                list1: bag.get('data', []),
                list2: code.get('data', [])
            }).digest();
            console.timeEnd('test');
        });
    },
    '$doc<click>': function(e) {
        //console.log(e);
    },
    '$div[class="a"]<click>':function(e){
        //console.log('a',e);
        //e.stopPropagation();
    },
    '$div<click>': function(e) {
        console.log('common',e,e.currentTarget);
    }
});