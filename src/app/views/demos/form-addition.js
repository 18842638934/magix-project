define('app/views/demos/form-addition',['magix','../../../coms/form/index'],function(require,exports,module){
/*Magix ,View */
/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
var View = require('../../../coms/form/index');
Magix.applyStyle('mx-1cd',".mx-1cd-wrapper{margin:20px}.mx-1cd-w80{width:80px}.mx-1cd-fl{float:left}.mx-1cd-ml10{margin-left:10px}.mx-1cd-wrapper li{margin:5px 0}.mx-1cd-red{border:1px solid red}");
module.exports = View.extend({
    tmpl: {"html":"<div class=\"mx-1cd-wrapper\"><ul mx-guid=\"xff61-\u001f\">@1-\u001f</ul></div><hr/><div class=\"mx-1cd-wrapper\"><ul mx-guid=\"xff62-\u001f\">@2-\u001f</ul></div><button mx-click=\"saveSnapshot()\" class=\"btn\">保存当前数据</button>","subs":[{"guid":1,"keys":["list"],"tmpl":"<li><input class=\"input\" type=\"text\" value=\"<%=list[0].test%>\" mx-change=\"setValue({path:'list.0.test'})\"/></li><%for(var i=1;i<list.length;i++){%><li><input class=\"input\" type=\"text\" mx-change=\"setValue({path:'list.<%=i%>.test'})\" value=\"<%=list[i].test%>\"/><button class=\"btn\" mx-click=\"remove({index:<%=i%>})\" style=\"margin-left:10px\">X</button></li><%}%><li><button mx-click=\"add()\" class=\"btn\">添加一个</button></li>","selector":"ul[mx-guid=\"xff61-\u001f\"]"},{"guid":2,"keys":["platforms"],"tmpl":"<%for(var i=0;i<platforms.length;i++){%><li><div mx-view=\"app/views/demos/partials/dropdown?type=platform&selected=<%=platforms[i].platformId%>\" mx-change=\"setValue({path:'platforms.<%=i%>.platformId'})\" class=\"mx-1cd-fl mx-1cd-ml10\"></div><div mx-view=\"app/views/demos/partials/dropdown?type=operator&selected=<%=platforms[i].operatorId%>\" mx-change=\"setValue({path:'platforms.<%=i%>.operatorId'})\" class=\"mx-1cd-fl mx-1cd-ml10\"></div><input class=\"input mx-1cd-w80 mx-1cd-ml10\" type=\"text\" mx-change=\"setValue({path:'platforms.<%=i%>.version'})\" value=\"<%=platforms[i].version%>\" placeholder=\"版本号\"/> <button class=\"btn mx-1cd-ml10\" mx-click=\"removePlatform({index:<%=i%>})\">X</button></li><%}%><li><button mx-click=\"addPlatform()\" class=\"btn\">添加一个平台</button></li>","selector":"ul[mx-guid=\"xff62-\u001f\"]"}]},
    ctor: function() {
        var me = this;
        // me.leaveTip('表单有改动，您确认离开吗？', function() {
        //     return me.$updater.altered();
        // });
        //me.render();
    },
    render: function() {
        var me = this;
        me.$updater.set({
            list: [{}],
            platforms: [],
        }).digest().snapshot();
    },
    'add<click>': function() {
        var me = this;
        var list = me.$updater.get('list');
        list.push({
            value: 20,
            platform: {
                id: 1
            }
        });
        me.$updater.digest();
    },
    'remove<click>': function(e) {
        var me = this;
        var list = me.$updater.get('list');
        list.splice(e.params.index, 1);
        me.$updater.digest();
    },
    'addPlatform<click>': function() {
        var me = this;
        var list = me.$updater.get('platforms');
        list.push({
            platformId: '',
            operatorId: ''
        });
        me.$updater.digest();
    },
    'removePlatform<click>': function(e) {
        var me = this;
        var list = me.$updater.get('platforms');
        list.splice(e.params.index, 1);
        me.$updater.digest();
    },
    'saveSnapshot<click>': function() {
        console.log(this.$updater.get());
        this.$updater.snapshot();
    }
});
});