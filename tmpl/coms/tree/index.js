/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
var $ = require('$');
var ListToTree = require('../generic/treeable');
Magix.applyStyle('@index.css');
module.exports = Magix.View.extend({
    tmpl: '@index.html',
    tmplData: '@index.html:data',
    ctor: function(extra) {
        this.$extra = extra;
    },
    render: function() {
        var me = this;
        me.$updater.set({
            id: me.id
        }).digest();
        me.update(me.$extra);
    },
    update: function(ops) {
        var me = this;
        var info = ListToTree(ops.list, ops.id, ops.pId);
        console.log(info,me);
        me.$info = info;
        me.owner.mountVframe('tree_' + me.id, '@./branch', {
            id: ops.id || 'id',
            pId: ops.pId || 'pId',
            text: (ops.text || 'text'),
            list: info.list
        });
    }
});