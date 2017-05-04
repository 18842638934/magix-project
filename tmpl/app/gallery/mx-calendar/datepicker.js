/*
    author:xinglie.lkf@alibaba-inc.com
 */
let Magix = require('magix');
let $ = require('$');
let Vframe = Magix.Vframe;
let Monitor = require('../mx-monitor/index');
let Wrapper = '@datepicker.html';
module.exports = Magix.View.extend({
    init(extra) {
        let me = this;
        me.$extra = extra;
        Monitor.setup();
        let ownerNode = $('#' + me.id);
        let click = () => {
            me.show();
        };
        me.on('destroy', () => {
            Monitor.teardown();
            $('#dpcnt_' + me.id).remove();
            ownerNode.off('click', click);
        });
        ownerNode.on('click', click);
        me.$ownerNode = ownerNode;
    },
    inside(node) {
        let me = this;
        return Magix.inside(node, me.id) || Magix.inside(node, 'dpcnt_' + me.id);
    },
    update(options) {
        let me = this;
        let vf = Vframe.get('dpcnt_' + me.id);
        vf.invoke('update', [options]);
    },
    render() {
        let me = this;
        let id = 'dpcnt_' + me.id;
        $(me.wrapEvent(Wrapper)).attr('id', id).insertAfter(me.$ownerNode);
        if (!me.$extra.selected) {
            me.$extra.selected = me.$ownerNode.val();
        }
    },
    show() {
        let me = this;
        if (!me.$shown) {
            let node = $('#dpcnt_' + me.id),
                ref = me.$ownerNode;
            me.$shown = true;
            Monitor.add(me);
            if (!me.$rendered) {
                me.$rendered = true;
                me.owner.mountVframe('dpcnt_' + me.id, '@./index');
                me.update(me.$extra);
            }
            node.show();
            let offset = ref.offset();
            let left, top;
            switch (me.$extra.placement) {
                case 'top':
                    top = offset.top - node.outerHeight() - 5;
                    break;
                default:
                    top = offset.top + ref.outerHeight() + 5;
                    break;
            }
            switch (me.$extra.align) {
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
            let node = $('#dpcnt_' + me.id);
            let vf = node.prop('vframe');
            vf.invoke('toDaysPannel');
            me.$shown = false;
            node.hide();
            Monitor.remove(me);
        }
    },
    'pickDate<change>' (e) {
        let me = this;
        e.stopPropagation();
        me.$ownerNode.val(e.date).trigger({
            type: 'change',
            date: e.date
        });
        me.hide();
    }
});