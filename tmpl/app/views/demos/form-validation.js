/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
var View = require('@coms/form/index');
var $ = require('$');
Magix.applyStyle('@form-addition.css');
module.exports = View.extend({
    tmpl: '@form-validation.html',
    tmplData: '@form-validation.html:data',
    ctor: function() {
        var me = this;
        me.leaveTip('表单有改动，您确认离开吗？', function() {
            return me.$updater.altered();
        });
    },
    render: function() {
        var me = this;
        me.$updater.set({
            list: [{
                test: 20
            }, {}],
            platforms: [{}],
            tests: [{
                inner: [{
                    test: 'ok'
                }]
            }]
        }).digest().snapshot();
        me.addValidator({
            'tests.*.inner.*.test': ['required', 'number', function() {
                console.log(arguments);
            }],
            'list.*.test': function(val, key) {
                if (!val) {
                    $('#list_' + key).addClass('validator-error');
                    return false;
                }
            },
            'platforms.*': function(val, key) {
                var result;
                if (!val.platformId) {
                    $('#p_' + key).addClass('validator-error');
                    result = false;
                }

                if (!val.operatorId) {
                    $('#o_' + key).addClass('validator-error');
                    result = false;
                }

                if (!val.version) {
                    $('#v_' + key).addClass('validator-error');
                    result = false;
                }
                return result;
            }
        });
    },
    'add<click>': function() {
        var me = this;
        var list = me.$updater.get('list');
        list.push({
            test: ''
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
    'clearOnePlatform<click>': function() {
        //var vf = Magix.Vframe.get('p_0');
        var owner = this.owner;
        owner.unmountVframe('p_0');
        //vf.unmountView();
    },
    'clearPlatform<click>': function() {
        var data = this.$updater;
        var pfs = data.get('platforms');
        pfs.length = 0;
        data.digest();
    },
    'saveSnapshot<click>': function() {
        if (this.isValid()) {
            this.$updater.snapshot();
        }
    }
});