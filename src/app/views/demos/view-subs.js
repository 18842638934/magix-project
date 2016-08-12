define('app/views/demos/view-subs',['magix','../../../coms/form/index'],function(require,exports,module){
/*Magix ,Form */
/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
var Form = require('../../../coms/form/index');
Magix.applyStyle('mx-514',".mx-514-wrapper{margin:50px}.mx-514-form-item{height:30px;line-height:30px;margin:5px 0}.mx-514-title{width:120px;text-align:right;margin-right:10px}.mx-514-content,.mx-514-title{float:left}.mx-514-w88{width:88px}");
var Types = [{
    id: 'banner',
    text: '横幅'
}, {
    id: 'float',
    text: '浮动'
}, {
    id: 'popup',
    text: '浮窗'
}];
module.exports = Form.extend({
    tmpl: {"html":"<div class=\"mx-514-wrapper\"><div class=\"mx-514-form-item\"><div class=\"mx-514-title\">创意标题</div><div class=\"mx-514-content\"><input class=\"input\"/></div></div><div class=\"mx-514-form-item\"><div class=\"mx-514-title\">创意类型</div><div class=\"mx-514-content\" mx-view=\"coms/dropdown/index?list={list}&width={width}&selected={selected}\" mx-change=\"cTypes()\"></div></div><div id=\"type_vf_<%=id%>\" mx-view><div class=\"loading\"><span></span></div></div><button class=\"btn\" mx-click=\"save();\">保存</button></div>","subs":[]},
    render: function() {
        var me = this;
        var creative = {
            name: 'test',
            type: 'float',
            stayTime: 100,
            delayTime: 200,
            others: []
        };
        me.share('creative', creative);
        me.$updater.set({
            creative: creative,
            id: me.id,
            list: Types,
            width: 210,
            selected: creative.type
        }).digest();
        me.renderByType(creative.type);
    },
    renderByType: function(type) {
        var me = this;
        var vf = Magix.Vframe.get('type_vf_' + me.id);
        vf.mountView('app/views/demos/partials/view-subs-' + type + '?creative={creative}');
    },
    'cTypes<change>': function(e) {
        this.renderByType(e.value);
    },
    'save<click>': function() {
        console.time('save');
        console.log(this.isSubViewValid());
        console.log(this.$updater.get('creative'));
        console.timeEnd('save');
    }
});
});