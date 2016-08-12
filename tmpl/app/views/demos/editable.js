/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
var View = require('../../../coms/form/index');
Magix.applyStyle('@editable.css');
module.exports = View.extend({
    tmpl: '@editable.html',
    tmplData: '@editable.html:data',
    ctor: function() {
        var list = [];
        for (var i = 0; i < 10; i++) {
            list.push({
                index: i,
                name: 'name-' + i,
                id: 'id-' + i
            });
        }
        this.$updater.set({
            list: list
        });
    },
    render: function() {
        var me = this;
        me.$updater.digest();
    },
    'edit<click>': function(e) {
        e.preventDefault();
        var data = this.$updater;
        var list = data.get('list');
        var item = list[e.params.index];
        item.editable = true;
        data.set({
            list: list
        }).digest();
    },
    'save<click>': function(e) {
        e.preventDefault();
        var data = this.$updater;
        var list = data.get('list');
        var item = list[e.params.index];
        delete item.editable;
        data.set({
            list: list
        }).digest();
    }
});