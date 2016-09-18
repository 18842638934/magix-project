define('app/views/coms/menu',['magix','../../../coms/menu/context'],function(require,exports,module){
/*Magix ,Contextmenu */
/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
var Contextmenu = require('../../../coms/menu/context');
module.exports = Magix.View.extend({
    tmpl: "<div id=\"m1_<%=id%>\" style=\"margin:20px;float:left\" mx-view=\"coms/menu/index?list=<%@list%>&width=<%@width1%>\" mx-guid=\"x8c91-\u001f\"></div><div id=\"m2_<%=id%>\" style=\"margin:20px;float:left\" mx-view=\"coms/menu/index?list=<%@list%>&width=<%@width2%>\" mx-guid=\"x8c92-\u001f\" mx-pick=\"menu2()\"></div><button mx-click=\"changeService()\" class=\"btn btn-size30\" style=\"margin:20px\">切换数据源</button><div style=\"width:300px;height:300px;line-height:300px;background:#ccc;margin:200px 200px 0 200px;float:left\" mx-contextmenu=\"showContextMenu()\">context menu</div>",
    tmplData: [{"keys":["list","width1"],"selector":"div[mx-guid=\"x8c91-\u001f\"]","view":"coms/menu/index?list=<%@list%>&width=<%@width1%>"},{"keys":["list","width2"],"selector":"div[mx-guid=\"x8c92-\u001f\"]","view":"coms/menu/index?list=<%@list%>&width=<%@width2%>"}],
    render: function(name) {
        var me = this;
        me.request('render').all(name || 'list', function(err, bag) {
            if (err) {
                me.setHTML(me.id, err.msg);
            } else {
                me.$list = bag.get('data', []);
                me.$updater.set({
                    id: me.id,
                    list: bag.get('data', []),
                    width1: name ? 360 : 300,
                    width2: name ? 300 : 130
                }).digest();
            }
        });
    },
    'showContextMenu<contextmenu>': function(e) {
        e.preventDefault();
        Contextmenu.show(this, {
            ownerNode: e.current,
            width: 400,
            list: this.$list,
            pageX: e.pageX,
            pageY: e.pageY,
            picked: function(e) {
                console.log('contextmenu', e);
            }
        });
    },
    'changeService<click>': function() {
        this.render('list1');
    },
    'menu2<pick>': function(e) {
        console.log(e);
    }
});
});