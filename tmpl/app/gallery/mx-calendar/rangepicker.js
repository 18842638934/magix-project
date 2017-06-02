'top@./range.js';
/*
    author:xinglie.lkf@taobao.com
 */
let Magix = require('magix');
let $ = require('$');
let Monitor = require('../mx-monitor/index');
let Calendar = require('./index');
let Range = require('./range');
let Wrapper = '@rangepicker.html';
let DefaultQuickDateKeys = [
    'today',
    'yesterday',
    'passed7',
    'lastestThisMonth',
    'preMonth',
    'lastest15'
];
let Rangepicker = Magix.View.extend({
    init(extra) {
        let me = this;
        let start = extra.start;
        let end = extra.end;
        let today = Calendar.format(new Date(), 'YYYY-MM-dd');
        me.$fill = true;
        if (!start) {
            me.$fill = false;
            start = today;
        }
        if (!end) {
            me.$fill = false;
            end = today;
        }
        me.$shortcuts = extra.shortcuts != 'false';
        me.$max = extra.max;
        me.$min = extra.min;
        me.$placement = extra.placement;
        me.$align = extra.align;
        me.$quickDates = me.$shortcuts ? DefaultQuickDateKeys : [];
        me.$dates = Range.getDescription(start, end, me.$quickDates);
        Monitor.setup();
        let ownerNode = $('#' + me.id);
        let click = () => {
            me.show();
        };
        me.on('destroy', () => {
            Monitor.teardown();
            $('#rpcnt_' + me.id).remove();
            ownerNode.off('click', click);
        });
        ownerNode.on('click', click);
        me.$ownerNode = ownerNode;
        ownerNode.prop('autocomplete', 'off');
    },
    inside(node) {
        let me = this;
        let inView = Magix.inside(node, me.id) || Magix.inside(node, 'rpcnt_' + me.id);
        if (!inView) {
            let children = me.owner.children();
            for (let i = children.length - 1; i >= 0; i--) {
                let child = Magix.Vframe.get(children[i]);
                if (child) {
                    inView = child.invoke('inside', node);
                }
                if (inView) break;
            }
        }
        return inView;
    },
    fill() {
        let me = this;
        let dates = me.$dates;
        if (dates.quickDateText) {
            me.$ownerNode.val(dates.quickDateText);
        } else {
            me.$ownerNode.val(dates.startStr + '至' + dates.endStr);
        }
    },
    render() {
        let me = this;
        let id = 'rpcnt_' + me.id;
        $(me.wrapEvent(Wrapper)).attr('id', id).insertAfter(me.$ownerNode);
        if (me.$fill) {
            me.fill();
        }
    },
    show() {
        let me = this;
        if (!me.$shown) {
            let node = $('#rpcnt_' + me.id),
                ref = me.$ownerNode;
            me.$shown = true;
            if (!me.$rendered) {
                me.$rendered = true;
                me.owner.mountVframe('rpcnt_' + me.id, '@./range', {
                    min: me.$min,
                    max: me.$max,
                    dates: me.$dates,
                    quickDates: me.$quickDates,
                    placement: me.$placement,
                    align: me.$align
                });
            }
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
            let node = $('#rpcnt_' + me.id);
            me.$shown = false;
            node.hide();
            Monitor.remove(me);
        }
    },
    'pickRange<change>' (e) {
        let me = this;
        e.stopPropagation();
        me.$dates = e.dates;
        me.fill();
        me.hide();
        me.$ownerNode.trigger({
            type: 'change',
            dates: e.dates
        });
    },
    'hide<cancel>' (e) {
        e.stopPropagation();
        this.hide();
    }
});

module.exports = Rangepicker;