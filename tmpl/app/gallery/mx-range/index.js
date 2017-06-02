/*
    author:xinglie.lkf@taobao.com
 */
let Magix = require('magix');
let $ = require('$');
Magix.applyStyle('@index.css');
let DD = require('../mx-dragdrop/index');
let FixPercent = (p) => {
    if (p > 1) p = 1;
    else if (p < 0) p = 0;
    return p;
};
module.exports = Magix.View.extend({
    tmpl: '@index.html',
    init(extra) {
        let me = this;
        me.$value = extra.value || 0;
        me.$oNode = $('#' + me.id);
        let click = (e) => {
            let offset = me.$oNode.offset();
            let vars = me.vars();
            let left = (e.pageX - offset.left);
            let p = (left - vars.half) / vars.max;
            p = FixPercent(p);
            me.val(p);
            me.trigger(p);
        };
        me.$oNode.on('click', click);
        me.on('destroy', () => {
            me.$oNode.off('click', click);
        });
    },
    render() {
        let me = this;
        me.updater.digest();
        me.val(me.$value);
        me.$oNode.addClass('@index.css:as-input');
    },
    vars() {
        let me = this;
        let tracker = me.$oNode.find('.@index.css:tracker');
        let indicator = me.$oNode.find('.@index.css:indicator');
        let half = indicator.outerWidth() / 2;
        let max = tracker.width() - half * 2;
        return {
            tracker,
            indicator,
            max,
            half
        };
    },
    val(v) {
        let me = this;
        if (v || v === 0) {
            v = FixPercent(v);
            let vars = me.vars();
            let left = v * vars.max;
            vars.indicator.css({
                left
            });
            me.$value = v;
        }
        return me.$value;
    },
    trigger(p) {
        this.$oNode.val(p).trigger({
            type: 'change',
            value: p
        });
    },
    'drag<mousedown>' (e) {
        e.stopPropagation();
        let current = $(e.eventTarget);
        let width = current.outerWidth();
        let min = 0; //最小
        let pWidth = current.parent().width();
        let max = pWidth - width; //最大
        let currentX = parseInt(current.css('left'), 10);
        let last, me = this;
        current.addClass('@index.css:active');
        DD.begin(e.eventTarget, (ex) => {
            DD.clear();
            let newX = currentX + ex.pageX - e.pageX;
            if (newX < min) newX = min;
            else if (newX > max) newX = max;
            let p = newX / max;
            if (p != last) {
                last = p;
                current.css({
                    left: newX
                });
                me.trigger(p);
            }
        }, () => {
            current.removeClass('@index.css:active');
        });
    }
});