define('app/views/coms/tree',['magix'],function(require,exports,module){
/*Magix */
/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
module.exports = Magix.View.extend({
    tmpl: "<div id=\"tree_<%=id%>\" mx-view=\"coms/tree/index?list={list1}\"><script type=\"magix/config\"><%=JSON.stringify({list:list1})%></script></div><div id=\"code_<%=id%>\" mx-view=\"coms/tree/index?list={list2}&pId=parentCode&text=keyName&id=keyCode\"></div><div>adf<div class=\"a\">aaa</div>adfasdfasd</div>",
    tmplData: [],
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
});