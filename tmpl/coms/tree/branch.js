/*
    author:xinglie.lkf@taobao.com
 */
'ref@./index.css';
var Magix = require('magix');
var $ = require('$');
module.exports = Magix.View.extend({
    tmpl: '@branch.html',
    tmplData: '@branch.html:data',
    ctor: function(extra) {
        var me = this;
        if (Magix.has(extra, 'index')) {
            me.$list = extra.list[extra.index].children;
        } else {
            me.$list = extra.list;
        }
        console.log(me);
        me.$textKey = extra.text;
        me.$dataId = extra.id;
    },
    render: function() {
        var me = this;
        me.$updater.set({
            textKey: me.$textKey,
            id: me.id,
            dataId: me.$dataId,
            list: me.$list
        }).digest();
    },
    checkAll: function(state) {
        $('#' + this.id + ' input[type="checkbox"]').prop('checked', state);
    },
    'toggle<click>': function(e) {
        var node = $('#' + this.id + '_' + e.params.id);
        var current = $(e.current);
        var val = $.trim(current.html());
        if (val == '+') {
            node.slideDown();
            current.html('-');
        } else {
            node.slideUp();
            current.html('+');
        }
    },
    'check<change>': function(e) {
        var me = this;
        var vf = Magix.Vframe.get(me.id + '_' + e.current.value);
        if (vf) {
            vf.invoke('checkAll', e.current.checked);
        }
    }
});