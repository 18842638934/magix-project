/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
var $ = require('$');
var tmpl = require('../tmpl/index');
var ListToTree = require('../generic/tree');
Magix.applyStyle('@index.css');
module.exports = Magix.View.extend({
    tmpl: '@index.html',
    render: function() {
        var me = this;
        var html = $.trim($('#' + me.id + ' script').html());
        var info = JSON.parse(html);
        me.setHTML(me.id, tmpl(me.tmpl, {
            id: me.id
        }));
        me.update(info);
    },
    update: function(ops) {
        var me = this;
        var info = ListToTree(ops.list, ops.id, ops.pId);
        me.$info = info;
        me.owner.mountVframe('tree_' + me.id, '@./branch', {
            id: ops.id || 'id',
            pId: ops.pId || 'pId',
            text: (ops.text || 'text')
        });
    },
    getList: function() {
        return this.$info.list;
    }
});