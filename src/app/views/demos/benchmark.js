define('app/views/demos/benchmark',['magix','../../../coms/form/index','$'],function(require,exports,module){
/*Magix ,FormView ,$ */
/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
var FormView = require('../../../coms/form/index');
var $ = require('$');
Magix.applyStyle('mx-573',".mx-573-buttons{margin:20px}.mx-573-item{width:50px;line-height:20px}.mx-573-dropdown,.mx-573-item{float:left}");
if (!Date.now) {
    Date.now = function() {
        return new Date().valueOf();
    };
}
module.exports = FormView.extend({
    tmpl: "<div class=\"mx-573-buttons\"><button class=\"btn\" mx-click=\"render()\">渲染</button> 行：<input class=\"input\" value=\"<%=rows%>\" mx-change=\"setValue({path:'rows'})\"/> 列：<input class=\"input\" value=\"<%=cols%>\" mx-change=\"setValue({path:'cols'})\"/> 用时:<span id=\"time_<%=id%>\">0</span></div><div id=\"list_<%=id%>\" mx-guid=\"x63f1-\u001f\">@1-\u001f</div>",
    tmplData: [{"guid":1,"keys":["list"],"tmpl":"<%for(var i=0;i<list.length;i++){for(var j=0;j<list[i].length;j++){%><div class=\"mx-573-item\"><%=list[i][j]%></div><div class=\"mx-573-dropdown\" mx-view=\"coms/dropdown/index?list={dropdown}\"></div><%if(j==list[i].length-1){%><div mx-view=\"app/views/demos/benchmark\"></div><%}}}%>","selector":"div[mx-guid=\"x63f1-\u001f\"]"}],
    render: function() {
        var me = this;
        me.$updater.set({
            rows: 50,
            cols: 20,
            id: me.id,
            list: [],
            dropdown: [{
                "id": 1,
                "text": "abc"
            }, {
                "id": 2,
                "text": "def"
            }]
        }).digest();
    },
    'render<click>': function() {
        var me = this;
        var data = me.$updater;
        var rows = data.get('rows') | 0;
        var cols = data.get('cols') | 0;
        var list = [];
        for (var i = 0, temp; i < rows; i++) {
            temp = [];
            for (var j = 0; j < cols; j++) {
                temp.push(i + '-' + j + Math.random());
            }
            list.push(temp);
        }

        var now = Date.now();
        data.set({
            list: list
        }).digest();
        $('#time_' + me.id).html(Date.now() - now);
    }
});
});