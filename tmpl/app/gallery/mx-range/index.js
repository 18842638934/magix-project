/*
    author:xinglie.lkf@taobao.com
 */
let Magix = require('magix');
let $ = require('$');
Magix.applyStyle('@index.css');
let DD = require('../mx-dragdrop/index');
module.exports = Magix.View.extend({
    tmpl: '@index.html',
    init(extra) {
        let me = this;
        me.$value = extra.value || 0;
    },
    render() {
        let me = this;
        me.updater.digest({
            value: me.$value * 300 - 8
        });
    },
    'drag<mousedown>' (e) {
        let current = $(e.eventTarget);
        let width = current.width();
        let half = width / 2;
        let min = -half; //最小
        let pWidth = current.parent().width();
        let max = pWidth - half; //最大
        let currentX = parseInt(current.css('left'), 10);
        let last;
        let node = $('#' + this.id);
        DD.begin(e.eventTarget, (ex) => {
            DD.clear();
            let newX = currentX + ex.pageX - e.pageX;
            if (newX < min) newX = min;
            else if (newX > max) newX = max;
            let p = (newX + half) / pWidth;
            if (p != last) {
                last = p;
                current.css({
                    left: newX
                });
                node.val(p).trigger({
                    type: 'change',
                    value: p
                });
            }
        });
    }
});