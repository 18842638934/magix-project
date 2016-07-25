define('app/views/coms/pagination',['magix'],function(require,exports,module){
/*Magix */
/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
module.exports = Magix.View.extend({
    tmpl: "<div id=\"p1_<%=id%>\" style=\"margin:50px\" mx-view=\"coms/pagination/index\"><script type=\"magix/config\"><%=JSON.stringify({size: 10,total: 300,index: 9,step: 11})%></script></div>",
    tmplData: [],
    render: function() {
        var me = this;
        me.$updater.set({
            id: me.id
        }).digest();
    }
});
});