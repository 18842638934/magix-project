define('coms/tree/index',['magix','$','../generic/treeable'],function(require,exports,module){
/*Magix ,$ ,ListToTree */
/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
var $ = require('$');
var ListToTree = require('../generic/treeable');
Magix.applyStyle('mx-582',".mx-582-indent{margin-left:22px;border-left:1px dotted #ccc}.mx-582-li{padding:0 4px}.mx-582-icon,.mx-582-li{line-height:22px}.mx-582-icon{width:22px;height:22px;float:left;text-align:center;font-weight:800}.mx-582-cp{cursor:pointer}.mx-582-none{display:none}");
module.exports = Magix.View.extend({
    tmpl: "<div id=\"tree_<%=id%>\" mx-view=\"\"></div>",
    tmplData: [],
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
        me.owner.mountVframe('tree_' + me.id, 'coms/tree/branch', {
            id: ops.id || 'id',
            pId: ops.pId || 'pId',
            text: (ops.text || 'text'),
            list: info.list
        });
    }
});
});