/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
var $ = require('$');
var Picker = require('../picker/index');
var tmpl = require('../tmpl/index');
var Base = Picker.prototype;
var Vframe = Magix.Vframe;
module.exports = Picker.extend({
    tmpl: '@datepicker.html',
    ctor: function() {
        var me = this;
        var node = $('#' + me.id);
        node.on('pick', function(e) {
            me.hide();
            var pick = me.$picked;
            if (pick) pick(e);
        });
        me.on('destroy', function() {
            node.off('pick');
        });
    },
    render: function() {
        var me = this;
        var html = tmpl(me.tmpl, {
            id: me.id
        });
        me.setHTML(me.id, html);
    },
    update: function(ops) {
        var me = this;
        var vf = Vframe.get('cal_' + me.id);
        me.$picked = ops.picked;
        vf.invoke('update', [ops]);
        me.show();
    },
    hide: function() {
        var me = this;
        var vf = Vframe.get('cal_' + me.id);
        vf.invoke('toDaysPannel');
        Base.hide.call(me);
    }
}, {
    show: function(view, ops) {
        var id = ops.id;
        if (!id) {
            id = 'dp_' + ops.ownerNodeId;
        }
        var vf = Magix.Vframe.get(id);
        if (!vf) {
            $('body').append('<div id="' + id + '" />');
            vf = view.owner.mountVframe(id, '@moduleId', ops);
        }
        vf.invoke('update', [ops]);
    }
});