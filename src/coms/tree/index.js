define('coms/tree/index',['magix','$','../tmpl/index','../generic/tree'],function(require,exports,module){
/*Magix ,$ ,tmpl ,ListToTree */
/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
var $ = require('$');
var tmpl = require('../tmpl/index');
var ListToTree = require('../generic/tree');
Magix.applyStyle('mp-582',".mp-582-indent{margin-left:22px;border-left:1px dotted #ccc}.mp-582-li{padding:0 4px}.mp-582-icon,.mp-582-li{line-height:22px}.mp-582-icon{width:22px;height:22px;float:left;text-align:center;font-weight:800}.mp-582-cp{cursor:pointer}.mp-582-none{display:none}");
module.exports = Magix.View.extend({
    tmpl: "<div id=\"tree_<%=id%>\" mx-view=\"\"></div>",
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
        me.owner.mountVframe('tree_' + me.id, 'coms/tree/branch', {
            id: ops.id || 'id',
            pId: ops.pId || 'pId',
            text: (ops.text || 'text')
        });
    },
    getList: function() {
        return this.$info.list;
    }
});
});