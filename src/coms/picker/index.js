define('coms/picker/index',['magix','$','../monitor/index'],function(require,exports,module){
/*Magix ,$ ,Monitor */
/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
var $ = require('$');
var Monitor = require('../monitor/index');
Magix.applyStyle('mx-d8e',".mx-d8e-picker{background:#fff;position:absolute;display:none;box-shadow:0 4px 10px 0 rgba(0,0,0,.1),0 3px 5px 0 rgba(0,0,0,.05),0 0 0 1px rgba(0,0,0,.09098)}.mx-d8e-left:after,.mx-d8e-left:before{border:8px solid transparent;border-bottom:8px solid #fff;width:0;height:0;position:absolute;top:-16px;left:8px;content:' '}.mx-d8e-left:before{border-width:8px;border-bottom-color:#888}.mx-d8e-right:after,.mx-d8e-right:before{border:8px solid transparent;border-bottom:8px solid #fff;width:0;height:0;position:absolute;top:-16px;right:8px;content:' '}.mx-d8e-right:before{border-width:8px;border-bottom-color:#888}");
var ArrowHeight = 8;
var CSSNames = {"left":"mx-d8e-left","right":"mx-d8e-right"};
module.exports = Magix.View.extend({
    ctor: function(extra) {
        var me = this;
        Monitor.setup();
        me.on('destroy', function() {
            Monitor.teardown();
            $('#' + me.id).remove();
        });
        me.$ownerNodeId = extra.ownerNodeId;
        me.$dock = extra.dock || 'left';
        $('#' + me.id).addClass('mx-d8e-picker ' + CSSNames[me.$dock]);
    },
    inside: function(node) {
        var me = this;
        var inside = Magix.inside(node, me.id) || Magix.inside(node, me.$ownerNodeId);
        return inside;
    },
    show: function() {
        var me = this;
        if (!me.$shown) {
            var node = $('#' + me.id),
                ref = $('#' + me.$ownerNodeId);
            me.$shown = true;
            Monitor.add(me);
            node.show();
            var offset = ref.offset();
            var left, top = offset.top + ref.outerHeight() + ArrowHeight;
            if (me.$dock == 'left') {
                left = offset.left;
            } else {
                left = offset.left + ref.outerWidth() - node.outerWidth();
            }
            node.css({
                left: left,
                top: top
            });
        }
    },
    hide: function() {
        var me = this;
        if (me.$shown) {
            var node = $('#' + me.id);
            me.$shown = false;
            node.hide();
            Monitor.remove(me);
        }
    }
});
});