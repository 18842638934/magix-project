define('app/views/demos/test',['magix','../../../coms/generic/xwinscroll'],function(require,exports,module){
/*Magix ,XWinScroll */
/*
    author: xinglie.lkf@ taobao.com
 */
var Magix = require('magix');
var XWinScroll = require('../../../coms/generic/xwinscroll');
module.exports = Magix.View.extend({
    tmpl: "<div id=\"test1\" mx-guid=\"x3ad1-\u001f\">@1-\u001f</div><div mx-guid=\"x3ad2-\u001f\" class=\"tree <%=a%>-def\" title=\"<%=b%>\" mx-view1=\"a/b?s=<%=b%>\">@2-\u001f</div><textarea mx-guid=\"x3ad3-\u001f\" <%if(checked){%>disabled=\"<%=checked%>\"<%}%>><%=a%>-<%=b%></textarea><%for(var i=0;i<10;i++){%><div mx-view=\"coms/dropdown/index?source=script&selected=<%=a%>&list={list}\" mx-guid=\"x3ad4-\u001f\"></div><%}%><div mx-guid=\"x3ad5-\u001f\" style=\"height:<%=height+20%>px;background: red\"></div><input mx-guid=\"x3ad6-\u001f\" value=\"<%=a%>-<%=b%>\"/> <input type=\"checkbox\" id=\"cb_<%=a%>\" mx-guid=\"x3ad7-\u001f\"/><label for=\"cb_<%=a%>\" mx-guid=\"x3ad8-\u001f\">abcdefg</label><input type=\"checkbox\" mx-guid=\"x3ad9-\u001f\" <%if(checked){%>disabled=\"<%=checked%>\"<%}%> <%if(checked){%>checked=\"<%=checked%>\"<%}%>/> <input type=\"radio\" mx-guid=\"x3ad10-\u001f\" <%if(checked){%>checked=\"<%=checked%>\"<%}%>/><label><input type=\"radio\" mx-guid=\"x3ad11-\u001f\" <%if(checked){%>checked=\"<%=checked%>\"<%}%>/> new test</label><div mx-guid=\"x3ad12-\u001f\" <%if(checked){%>checked=\"<%=checked%>\"<%}%> value=\"<%=a+'_'+b%>\" checked2=\"<%=checked%>\">test value</div><button mx-guid=\"x3ad13-\u001f\" mx-click=\"change({a:'<%=a%>',b:'<%=b%>'})\" class=\"btn\">change a and b</button><div mx-guid=\"x3ad14-\u001f\">@9-\u001f</div><button class=\"btn\" mx-click=\"changeMap()\">change pmap</button> mail:xinglie.lkf@taobao.com<div>@abc @./coms/a/d</div><div <%if(view){%>mx-view=\"<%=view%>\"<%}%> mx-guid=\"x3ad15-\u001f\">@10-\u001f</div><div <%if(checked){%>test=\"<%=checked%>\"<%}%> mx-guid=\"x3ad16-\u001f\">xx</div>",
    tmplData: [{"guid":1,"keys":["list1","before","after"],"tmpl":"<%if(before){%><div style=\"height:<%=before%>px\"></div><%}for(var i=0;i<list1.length;i++){%><div style=\"height:20px;line-height: 20px\"><%=list1[i]%></div><%}if(after){%><div style=\"height:<%=after%>px\"></div><%}%>","selector":"div[mx-guid=\"x3ad1-\u001f\"]"},{"guid":2,"keys":["a","b"],"tmpl":"<%=a%>-<%=b%>","selector":"div[mx-guid=\"x3ad2-\u001f\"]","attrs":[{"n":"className","v":"tree <%=a%>-def","p":1},{"n":"title","v":"<%=b%>"},{"n":"mx-view1","v":"a/b?s=<%=b%>"}]},{"keys":["a","b","checked"],"selector":"textarea[mx-guid=\"x3ad3-\u001f\"]","attrs":[{"n":"disabled","v":"<%if(checked){%>disabled<%}%>","p":1},{"n":"value","v":"<%=a%>-<%=b%>","p":1}]},{"keys":["a","b"],"selector":"div[mx-guid=\"x3ad4-\u001f\"]","view":"coms/dropdown/index?source=script&selected=<%=a%>&list={list}"},{"keys":["a","b","height"],"selector":"div[mx-guid=\"x3ad5-\u001f\"]","attrs":[{"n":"style","v":"height:<%=height+20%>px;background: red"}]},{"keys":["a"],"selector":"label[mx-guid=\"x3ad8-\u001f\"]","attrs":[{"n":"for","v":"cb_<%=a%>"}]},{"keys":["checked","a","b"],"selector":"div[mx-guid=\"x3ad12-\u001f\"]","attrs":[{"n":"checked","v":"<%if(checked){%><%=checked%><%}%>","a":1},{"n":"value","v":"<%=a+'_'+b%>"},{"n":"checked2","v":"<%=checked%>"}]},{"keys":["a","b"],"selector":"button[mx-guid=\"x3ad13-\u001f\"]","attrs":[{"n":"mx-click","v":"change({a:'<%=a%>',b:'<%=b%>'})"}]},{"guid":9,"keys":["pMap"],"tmpl":"<%for(var i=0;i<permissions.length;i++){console.log(pMap[permissions[i]])%><label><input type=\"checkbox\" <%if(pMap[permissions[i]]){%>checked=\"<%=pMap[permissions[i]]%>\"<%}%>/><%=permissions[i]%></label><%}%>","selector":"div[mx-guid=\"x3ad14-\u001f\"]"},{"guid":10,"keys":["view","a"],"tmpl":"<%=a%>","selector":"div[mx-guid=\"x3ad15-\u001f\"]","view":"<%=view%>"},{"keys":["checked"],"selector":"div[mx-guid=\"x3ad16-\u001f\"]","attrs":[{"n":"test","v":"<%if(checked){%><%=checked%><%}%>","a":1}]},{"keys":["a","b"],"selector":"input[mx-guid=\"x3ad6-\u001f\"]","attrs":[{"n":"value","v":"<%=a%>-<%=b%>","p":1}]},{"keys":["a"],"selector":"input[mx-guid=\"x3ad7-\u001f\"]","attrs":[{"n":"id","v":"cb_<%=a%>"}]},{"keys":["checked"],"selector":"input[mx-guid=\"x3ad9-\u001f\"]","attrs":[{"n":"disabled","v":"<%if(checked){%>disabled<%}%>","p":1},{"n":"checked","v":"<%if(checked){%>checked<%}%>","p":1}]},{"keys":["checked"],"selector":"input[mx-guid=\"x3ad10-\u001f\"]","attrs":[{"n":"checked","v":"<%if(checked){%>checked<%}%>","p":1}]},{"keys":["checked"],"selector":"input[mx-guid=\"x3ad11-\u001f\"]","attrs":[{"n":"checked","v":"<%if(checked){%>checked<%}%>","p":1}]}],
    render: function() {
        var me = this;
        var list1 = [];
        for (var i = 10000; i >= 0; i--) list1.push(i);
        me.$updater.set({
            view: me.$updater.get('view') ? '' : 'app/views/coms/popover',
            a: Magix.guid(),
            b: Magix.guid(),
            checked: !me.$updater.get('checked'),
            pMap: {
                a: 1,
                c: 1
            },
            height: 10 + me.$updater.get('height') || 0,
            permissions: ['a', 'b', 'c', 'd'],
            list: [{
                id: Magix.guid(),
                text: Magix.guid()
            }]
        });

        var xscroll = me.$xscroll;
        if (!xscroll) {
            xscroll = new XWinScroll();
            me.capture('xscroll', me.$xscroll = xscroll);
            xscroll.onupdate = function(e) {
                console.log(e);
                e.list1 = e.list;
                delete e.list;
                me.$updater.set(e).digest();
            };
        }
        xscroll.link(20, list1, 'test1');
        console.log(me.$updater);
    },
    'change<click>': function() {
        this.render();
    },
    'changeMap<click>': function() {
        var data = this.$updater;
        var r = function() {
            return Math.random() < 0.5;
        };
        var pMap = {
            a: r(),
            b: r(),
            c: r(),
            d: r()
        };
        data.set({
            pMap: pMap
        }).digest();
    }
});
});