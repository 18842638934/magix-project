/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
var View = require('@coms/form/index');
Magix.applyStyle('@form-addition.css');
module.exports = View.extend({
    tmpl: '@form-addition.html',
    tmplData: '@form-addition.html:data',
    ctor: function() {
        var me = this;
        me.leaveTip('表单有改动，您确认离开吗？', function() {
            return me.$updater.altered();
        });
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