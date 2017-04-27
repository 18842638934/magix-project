/*
    author:xinglie.lkf@alibaba-inc.com
 */
let Magix = require('magix');
let $ = require('$');
let Monitor = require('../mx-monitor/index');
module.exports = Magix.View.extend({
    init(extra) {
        let me = this;
        me.$placement = extra.placement;
        me.$align = extra.align;
        Monitor.setup();
        let ownerNode = $('#' + me.id);
        let click = (e) => {
            e.preventDefault();
            me.show();
        };
        me.on('destroy', () => {
            Monitor.teardown();
            ownerNode.off('click', click);
        });
        ownerNode.on('click', click);
        me.$ownerNode = ownerNode;
        me.$relatedNode = $(extra.related);
        me.$relatedId = me.$relatedNode.attr('id');
        me.$relatedNode.css({
            position: 'absolute'
        });
    },
    inside(node) {
        let me = this;
        return Magix.inside(node, me.id) || Magix.inside(node, me.$relatedId);
    },
    show() {
        let me = this;
        if (!me.$shown) {
            let node = me.$relatedNode,
                ref = me.$ownerNode;
            me.$shown = true;
            Monitor.add(me);
            node.show();
            let offset = ref.offset();
            let left, top;
            switch (me.$placement) {
                case 'top':
                    top = offset.top - node.outerHeight() - 5;
                    break;
                default:
                    top = offset.top + ref.outerHeight() + 5;
                    break;
            }
            switch (me.$align) {
                case 'right':
                    left = offset.left + ref.outerWidth() - node.outerWidth();
                    break;
                default:
                    left = offset.left;
                    break;
            }
            node.offset({
                left: left,
                top: top
            });
        }
    },
    hide() {
        let me = this;
        if (me.$shown) {
            let node = me.$relatedNode;
            me.$shown = false;
            node.hide();
            Monitor.remove(me);
        }
    }
});