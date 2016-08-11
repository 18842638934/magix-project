define('app/views/coms/tree',['magix'],function(require,exports,module){
/*Magix */
/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
module.exports = Magix.View.extend({
    tmpl: {"html":"<div id=\"tree_<%=id%>\" mx-view=\"coms/tree/index?list={list1}\"><script type=\"magix/config\"><%=JSON.stringify({list:list1})%></script></div><div id=\"code_<%=id%>\" mx-view=\"coms/tree/index?list={list2}&pId=parentCode&text=keyName&id=keyCode\"></div>","subs":[]},
    render: function() {
        var me = this;
        me.request().all(['list', 'code'], function(err, bag, code) {
            console.time('test');
            me.$updater.set({
                id: me.id,
                list1:bag.get('data',[]),
                list2:code.get('data', [])
            }).digest();
            console.timeEnd('test');
        });
    }
});
});