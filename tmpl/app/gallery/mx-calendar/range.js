'#snippet';
/*
    author:xinglie.lkf@taobao.com
 */
let Magix = require('magix');
let $ = require('$');
let Calendar = require('./index');
let DateParse = Calendar.parse;
let DateFormat = Calendar.format;
Magix.applyStyle('@range.css');
let DayMillisecond = 86400000,
    GetOffsetDate = (offset, date) => {
        if (!date) {
            date = new Date();
        }
        let uom = new Date(date.getTime() + offset * DayMillisecond);
        uom = uom.getFullYear() + '/' + (uom.getMonth() + 1) + '/' + uom.getDate();
        return new Date(uom);
    },
    Today = GetOffsetDate(0),
    Yesterday = GetOffsetDate(-1),
    GetLastMonth = () => {
        let start = new Date(Today.getFullYear(), Today.getMonth() - 1, 1),
            startYear = start.getFullYear(),
            startMonth = start.getMonth(),
            lastDay = 32 - new Date(startYear, startMonth, 32).getDate();
        return {
            start: start,
            end: new Date(startYear, startMonth, lastDay)
        };
    },
    GetLastWeek = (start) => {
        let temp = GetOffsetDate(-7),
            offset = start - temp.getDay();
        return {
            start: GetOffsetDate(offset, temp),
            end: GetOffsetDate(offset + 6, temp)
        };
    },
    LastWeekSun = GetLastWeek(0),
    LastWeekMon = GetLastWeek(1),
    LastMonth = GetLastMonth();
LastMonth.text = '上月';
LastWeekSun.text = '上周（周日至周六）';
LastWeekMon.text = '上周（周一至周日）';
let QuickDates = {
    today: {
        text: '今天',
        start: Today,
        end: Today
    },
    yesterday: {
        text: '昨天',
        start: Yesterday,
        end: Yesterday
    },
    preMonth: LastMonth,
    preWeekSun: LastWeekSun,
    preWeekMon: LastWeekMon,
    passedThisMonth: {
        text: '本月',
        start: GetOffsetDate(-Today.getDate() + 1),
        end: Yesterday
    },
    lastestThisMonth: {
        text: '本月',
        start: GetOffsetDate(-Today.getDate() + 1),
        end: Today
    }
};
let TempDates = [2, 6, 13, 14, 29, 89];
for (let i = 0, date, dateSucc; i < TempDates.length; i++) {
    date = TempDates[i];
    dateSucc = date + 1;
    QuickDates['passed' + dateSucc] = {
        text: '过去' + dateSucc + '天',
        start: GetOffsetDate(-dateSucc),
        end: Yesterday
    };
    QuickDates['lastest' + dateSucc] = {
        text: '最近' + dateSucc + '天',
        start: GetOffsetDate(-date),
        end: Today
    };
}
let QueryQuickDateKeys = [
    'preMonth',
    'preWeekMon',
    'preWeekSun',
    'passedThisMonth',
    'lastestThisMonth'
];
let Range = Magix.View.extend({
    tmpl: '@range.html',
    init(ops) {
        let me = this;
        me.$linkage = ops.linkage;
        me.$min = ops.min;
        me.$max = ops.max;
        me.$dates = ops.dates;
        me.$quickDates = ops.quickDates || [];
        me.$placement = ops.placement;
        me.$align = ops.align;
    },
    inside(node) {
        let me = this;
        let inView = Magix.inside(node, me.id);
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
    render() {
        let me = this;
        me.updater.digest({
            id: me.id,
            quickDatesMap: QuickDates,
            quickDates: me.$quickDates,
            dates: me.$dates
        });
        me.$node = $('#' + me.id);
    },
    'sync<change>' (e) {
        let me = this;
        e.stopPropagation();
        $(e.eventTarget).data('hidden', e.date);
        let start = $('#start_' + me.id).data('hidden');
        let end = $('#end_' + me.id).data('hidden');
        let dates = me.updater.get('dates');
        let startTime = DateParse(start, dates.formatter);
        let endTime = DateParse(end, dates.formatter);
        if (endTime.getTime() < startTime.getTime()) {
            end = start;
            $('#end_' + me.id).data('hidden', end);
        }
        dates = Range.getDescription(start, end, me.$quickDates);
        me.updater.digest({
            dates: dates
        });
    },
    'showDatepicker<click>' (e) {
        let me = this,
            node = e.eventTarget,
            params = e.params;
        let dparams = {
            max: me.$max,
            min: me.$min,
            selected: node.value,
            placement: me.$placement,
            align: me.$align
        };
        if (params.first) {
            if (me.$linkage) {
                dparams.max = $('#end_' + me.id).data('hidden');
            }
        } else {
            dparams.min = $('#start_' + me.id).data('hidden');
        }
        if (node.vframe) {
            node.vframe.invoke('update', dparams);
        } else {
            me.owner.mountVframe(node.id, '@./datepicker', dparams).invoke('show');
        }
    },
    'picked<click>' (e) {
        let me = this;
        let params = e.params;
        let data = me.updater;
        let dates = data.get('dates'),
            start, end, startStr, endStr;
        if (params.quick) {
            dates.quickDateKey = params.key;
            let info = QuickDates[params.key];
            start = info.start;
            end = info.end;
            startStr = DateFormat(start, dates.formatter);
            endStr = DateFormat(end, dates.formatter);
            $('#start_' + me.id).data('hidden', startStr);
            $('#end_' + me.id).data('hidden', endStr);
            dates.startStr = startStr;
            dates.endStr = endStr;
            dates.start = start;
            dates.end = end;
            dates.quickDateText = info.text;
            data.digest({
                dates: dates
            });
        } else {
            startStr = $('#start_' + me.id).data('hidden');
            endStr = $('#end_' + me.id).data('hidden');
            dates = Range.getDescription(startStr, endStr, me.$quickDates);
            data.digest({
                dates: dates
            });
        }
        me.$node.trigger({
            type: 'change',
            dates: dates
        });
    },
    'cancel<click>' () {
        let me = this;
        me.$node.trigger('cancel');
    }
}, {
    getSupportQuickDates() {
        return QuickDates;
    },
    getDescription(start, end, translateQuickdatesKeys) {
        start = DateParse(start);
        end = DateParse(end);
        let formatter = 'yyyy-MM-dd';
        let result = {
            startStr: DateFormat(start, formatter),
            endStr: DateFormat(end, formatter),
            formatter: formatter
        };
        let quickDateKey,
            todayMillisecond = Today.getTime(),
            yesterdayMillisecond = Yesterday.getTime(),
            startMillisecond = start.getTime(),
            endMillisecond = end.getTime();
        console.log(start, endMillisecond, Today, translateQuickdatesKeys);
        if (startMillisecond == endMillisecond) {
            if (todayMillisecond == endMillisecond) {
                quickDateKey = 'today';
            } else if (yesterdayMillisecond == endMillisecond) {
                quickDateKey = 'yesterday';
            }
        } else {
            let mapped;
            let days = (endMillisecond - startMillisecond) / DayMillisecond + 1;
            if (yesterdayMillisecond == endMillisecond) {
                mapped = QuickDates[quickDateKey = 'passed' + days];
                if (!mapped) {
                    quickDateKey = 0;
                }
            } else if (todayMillisecond == endMillisecond) {
                mapped = QuickDates[quickDateKey = 'lastest' + days];
                if (!mapped) {
                    quickDateKey = 0;
                }
            }
        }
        if (!quickDateKey) {
            for (let i = QueryQuickDateKeys.length - 1; i > -1; i--) {
                let param = QueryQuickDateKeys[i];
                let info = QuickDates[param];
                if (endMillisecond == info.end.getTime() &&
                    startMillisecond == info.start.getTime()) {
                    quickDateKey = param;
                    break;
                }
            }
        }
        if (quickDateKey && translateQuickdatesKeys) {
            if (!Magix.toMap(translateQuickdatesKeys)[quickDateKey]) {
                quickDateKey = 0;
            }
        }
        if (quickDateKey) {
            result.quickDateText = QuickDates[quickDateKey].text;
            result.quickDateKey = quickDateKey;
        }
        return result;
    }
});

module.exports = Range;