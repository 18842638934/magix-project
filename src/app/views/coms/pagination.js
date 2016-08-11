define('app/views/coms/pagination',['magix'],function(require,exports,module){
/*Magix */
/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
module.exports = Magix.View.extend({
    tmpl: {"html":"<div id=\"p1_<%=id%>\" style=\"margin:50px\" mx-view=\"coms/pagination/index?size=10&total=300&index=9&step=11\"></div>","subs":[]},
    render: function() {
        var me = this;
        me.$updater.set({
            id: me.id
        }).digest();
    }
});
});