/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
var Form = require('@coms/form/index');
Magix.applyStyle('@view-subs.css');
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
    tmpl: '@view-subs.html',
    tmplData: '@view-subs.html:data',
    render: function() {
        var me = this;
        var creative = {
            name: 'test',
            type: 'float',
            stayTime: 100,
            delayTime: 200,
            others: []
        };
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
        vf.mountView('@./partials/view-subs-' + type, {
            creative: me.$updater.get('creative')
        });
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