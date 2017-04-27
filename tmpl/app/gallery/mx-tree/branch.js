'#snippet';
/*
    author:xinglie.lkf@taobao.com
 */
'ref@./index.css';
let Magix = require('magix');
let $ = require('$');
module.exports = Magix.View.extend({
    tmpl: '@branch.html',
    init(extra) {
        let me = this;
        me.$list = extra.list;
        me.$textKey = extra.text;
        me.$dataId = extra.id;
        me.$fromTop = extra.fromTop;
    },
    render() {
        let me = this;
        me.updater.digest({
            textKey: me.$textKey,
            id: me.id,
            fromTop: me.$fromTop,
            dataId: me.$dataId,
            list: me.$list
        });
    },
    checkAll(state) {
        $('#' + this.id + ' input[type="checkbox"]').prop('checked', state);
    },
    'toggle<click>' (e) {
        let node = $('#' + this.id + '_' + e.params.id);
        let current = $(e.eventTarget).find('span');
        let val = $.trim(current.html());
        if (val == '+') {
            node.slideDown();
            current.html('-');
        } else {
            node.slideUp();
            current.html('+');
        }
    },
    'check<change>' (e) {
        let me = this;
        let vf = Magix.Vframe.get(me.id + '_' + e.eventTarget.value);
        if (vf) {
            vf.invoke('checkAll', [e.eventTarget.checked]);
        }
    }
});