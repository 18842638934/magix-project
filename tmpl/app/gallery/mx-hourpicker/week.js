/*
    author:xinglie.lkf@alibaba-inc.com
*/
let Magix = require('magix');
let $ = require('$');
let Monitor = require('../mx-monitor/index');
Magix.applyStyle('@week.css');
let Weeks = '一二三四五六日';
let Core = require('./index');
let All = '111111111111111111111111';
let None = '000000000000000000000000';
let ImproveDays = (days) => {
    let start = 0;
    let end = 7;
    while (start < end) {
        days[start] = Core.improve(days[start]);
        start++;
    }
    return days;
};
module.exports = Magix.View.extend({
    tmpl: '@week.html',
    init(extra) {
        let me = this;
        me.$days = extra.days || [None, None, None, None, None, None, None];
        me.$days = ImproveDays(me.$days);
        Monitor.setup();
        me.on('destroy', Monitor.teardown);
    },
    render() {
        let me = this;
        me.updater.digest({
            viewId: me.id,
            days: Weeks
        });
        me.val(me.$days);
    },
    inside(node) {
        let me = this;
        let inView = Magix.inside(node, 'dlg_' + me.id);
        if (!inView && me.$ref) {
            let parent = me.$ref.parent();
            inView = Magix.inside(node, parent[0]);
        }
        return inView;
    },
    syncShortcuts() {
        let me = this;
        let weekdays = me.$days.slice(0, 5).join('');
        let weekends = me.$days.slice(-2).join('');
        let weekdaysHas = weekdays.indexOf('1') > -1;
        let weekendsHas = weekends.indexOf('1') > -1;
        let weekdaysChecked = weekdays.indexOf('0') == -1;
        let weekendsChekced = weekends.indexOf('0') == -1;
        let allDaysChecked = weekdaysChecked && weekendsChekced;
        me.updater.digest({
            allDays: allDaysChecked,
            weekdays: !weekendsHas && weekdaysChecked,
            weekends: weekendsChekced && !weekdaysHas
        });
    },
    syncUI() {
        let me = this;
        let ws = me.$days;
        for (let i = 0, w, vf; i < ws.length; i++) {
            w = ws[i];
            vf = Magix.Vframe.get('hours_' + me.id + '_' + i);
            if (vf) {
                vf.invoke('val', [w]);
            }
        }
    },
    val(days) {
        let me = this;
        if (days) {
            me.$days = ImproveDays(days);
            me.syncUI();
            me.syncShortcuts();
        }
        return me.$days;
    },
    show() {
        let me = this;
        if (!me.$shown) {
            me.$shown = true;
            Monitor.add(me);
            let ref = me.$ref;
            let dlg = $('#dlg_' + me.id);
            dlg.show();
            let offset = ref.offset();
            let left = offset.left + ref.outerWidth() - dlg.outerWidth();
            let top = offset.top + ref.outerHeight() + 10;
            dlg.offset({
                left: left,
                top: top
            });
            ref.parent().addClass('@week.css:opshow');
        }
    },
    hide() {
        let me = this;
        if (me.$shown) {
            me.$shown = false;
            Monitor.remove(me);
            $('#dlg_' + me.id).hide();
            let ref = me.$ref;
            if (ref) {
                ref.parent().removeClass('@week.css:opshow');
            }
        }
    },
    'st<click>' (e) {
        let me = this;
        switch (e.params.type) {
            case 0:
                me.$days = [All, All, All, All, All, All, All];
                break;
            case 1:
                me.$days = [All, All, All, All, All, None, None];
                break;
            case 2:
                me.$days = [None, None, None, None, None, All, All];
                break;
        }
        me.syncShortcuts();
        me.syncUI();
    },
    'hour<change>' (e) {
        let me = this;
        me.$days[e.params.day] = e.range;
        clearTimeout(me.$timer);
        me.$timer = setTimeout(me.wrapAsync(() => {
            me.syncShortcuts();
        }), 100);
    },
    'toggle<click>' (e) {
        let day = e.params.day;
        let me = this;
        let vf = Magix.Vframe.get('hours_' + me.id + '_' + day);
        if (vf) {
            let val = vf.invoke('val');
            if (val.indexOf('0') > -1) {
                vf.invoke('val', [me.$days[day] = All]);
            } else {
                vf.invoke('val', [me.$days[day] = None]);
            }
            me.syncShortcuts();
        }
    },
    'copy<click>' (e) {
        let me = this;
        let ref = $(e.eventTarget);
        me.$ref = ref;
        me.show();
        me.updater.digest({
            currentClone: e.params.day
        });
    },
    'closeDlg<click>' () {
        this.hide();
    },
    'apply<click>' () {
        let me = this;
        let day = me.updater.get('currentClone');
        let val = me.$days[day];
        $('#dlg_' + me.id + ' input:checked').each((idx, item) => {
            me.$days[item.value] = val;
        });
        me.hide();
        me.syncUI();
        me.syncShortcuts();
    }
})