/*
    author:xinglie.lkf@alibaba-inc.com
 */
let Magix = require('magix');
let $ = require('$');
let Core = require('./index');
Magix.applyStyle('@day.css');
module.exports = Magix.View.extend({
    tmpl: '@day.html',
    init(extra) {
        let me = this;
        me.$range = extra.range;
    },
    render() {
        let me = this;
        me.updater.digest({
            viewId: me.id
        });
        me.val(me.$range);
    },
    val(range) {
        let me = this;
        if (range) {
            me.$range = Core.improve(range);
            let vf = $('#range_' + me.id).prop('vframe');
            if (vf) {
                vf.invoke('val', [range]);
            }
        }
        return me.$range;
    },
    'hour<change>' (e) {
        let me = this;
        me.$range = e.range;
    }
});