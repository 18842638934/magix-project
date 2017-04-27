/*
    author:xinglie.lkf@alibaba-inc.com
 */
let Magix = require('magix');
Magix.applyStyle('@calendar.css');
let GTip = require('@app/mixins/gtip');
module.exports = Magix.View.extend({
    tmpl: '@calendar.html',
    mixins: [GTip],
    render() {
        let me = this;
        me.updater.digest();
    },
    'showDate<change>' (e) {
        this.gtipRT('选中的日期：' + e.date);
    },
    'showIptDate<change>' (e) {
        this.gtipRT('选中的日期：' + e.eventTarget.value);
    },
    'showRngDate<change>' (e) {
        let dates = e.dates;
        let msg = '选中的日期：';
        if (dates.quickDateText) {
            msg += '快捷日期:' + dates.quickDateText + '。';
        }
        msg += '范围(' + dates.startStr + '~' + dates.endStr + ')';
        this.gtipRT(msg);
    }
});