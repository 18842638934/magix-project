/*
    author:xinglie.lkf@taobao.com
 */
let Magix = require('magix');
Magix.applyStyle('@index.less');
let $ = require('$');
let GetNumOfDays = (year, month) => {
    return 32 - new Date(year, month - 1, 32).getDate();
};
let Days = ['日', '一', '二', '三', '四', '五', '六'];
let PadZero = (str) => {
    return ('0' + str).slice(-2);
};
let GetWeekText = (weekStart) => {
    let a = [];
    for (let i = 0; i < 7; i++) {
        a[i] = Days[(i + weekStart) % 7];
    }
    return a;
};
let DateDisabled = (current, start, end) => {
    let ts = current.getTime(),
        flag;
    if (start) {
        flag = ts < start.getTime();
    }
    if (!flag) {
        if (end) {
            flag = ts > end.getTime();
        } else {
            flag = false;
        }
    }
    return flag;
};
let MonthDisabled = (year, month, start, end) => {
    let flag, current = parseInt(year + PadZero(month), 10);
    if (start) {
        start = parseInt(start.getFullYear() + PadZero(start.getMonth()), 10);
        flag = current < start;
    }
    if (!flag && end) {
        end = parseInt(end.getFullYear() + PadZero(end.getMonth()), 10);
        flag = current > end;
    }
    return flag;
};
let YearDisabled = (year, start, end) => {
    let flag;
    if (start) {
        flag = year < start.getFullYear();
    }
    if (!flag && end) {
        flag = year > end.getFullYear();
    }
    return flag;
};
let DateReg = {
    y: {
        reg: /y+/gi,
        fn(m, d) {
            return String(d.getFullYear()).slice(-m.length);
        }
    },
    M: {
        reg: /M+/g,
        fn(m, d, t) {
            t = d.getMonth() + 1;
            return PadZero(t).slice(-m.length);
        }
    },
    d: {
        reg: /d+/gi,
        fn(m, d, t) {
            t = d.getDate();
            return PadZero(t).slice(-m.length);
        }
    },
    h: {
        reg: /h+/gi,
        fn(m, d, t) {
            t = d.getHours();
            return PadZero(t).slice(-m.length);
        }
    },
    m: {
        reg: /m+/g,
        fn(m, d, t) {
            t = d.getMinutes();
            return PadZero(t).slice(-m.length);
        }
    },
    s: {
        reg: /s+/g,
        fn(m, d, t) {
            t = d.getSeconds();
            return PadZero(t).slice(-m.length);
        }
    },
    S: {
        reg: /S+/g,
        fn(m, d, t) {
            t = d.getMilliseconds();
            return String(t).substring(0, m.length);
        }
    }
};
let DateParse = (date) => {
    if (date instanceof Date) {
        return date;
    } else {
        date = new Date(Date.parse(String(date).replace(/-/g, '/')));
    }
    if (date instanceof Date && (date != 'Invalid Date') && !isNaN(date)) {
        return date;
    }
    return null;
};
let DateFormat = (date, format) => {
    date = DateParse(date);
    format = format || 'YYYY/MM/dd hh:mm:ss';
    let key;
    let replacement = (match) => {
        return DateReg[key].fn(match, date);
    };
    for (key in DateReg) {
        format = format.replace(DateReg[key].reg, replacement);
    }
    return format;
};
let DefaultFormatter = 'YYYY-MM-dd';
module.exports = Magix.View.extend({
    tmpl: '@index.html',
    init(extra) {
        let me = this;
        me.$extra = extra || {};
    },
    update(ops) {
        ops = ops || {};
        if (!ops.selected) {
            ops.selected = new Date();
        }
        let weekStart = ops.weekStart || 0;
        let selected = DateParse(ops.selected);
        let today = new Date();
        let me = this;
        let date = selected || today;
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let data = me.updater;
        let max = DateParse(ops.max);
        let min = DateParse(ops.min);
        data.set({
            max: max,
            min: min,
            year: year,
            month: month,
            id: me.id,
            weekStart: weekStart,
            weekText: GetWeekText(weekStart)
        });
        me.updateSelected(selected);
        me.updateYears();
        me.updateMonths();
        me.updateDays(true);
    },
    updateSelected(selected) {
        let me = this,
            data = me.updater;
        selected = DateParse(selected);
        if (selected) {
            data.set({
                selectedYear: selected.getFullYear(),
                selectedMonth: selected.getMonth() + 1,
                selected: DateFormat(selected, DefaultFormatter)
            });
        }
    },
    updateYears(render) {
        let me = this;
        let data = me.updater;
        let json = data.get();
        let year = json.year;
        let min = json.min;
        let max = json.max;
        let startYear = year - year % 10 - 1;
        let endYear = startYear + 11;
        let rows = [];
        for (let i = startYear; i <= endYear; i++) {
            rows.push({
                year: i,
                selected: i == json.selectedYear,
                disabled: YearDisabled(i, min, max)
            });
        }
        data.set({
            startYear: startYear,
            endYear: endYear,
            years: rows
        });
        if (render) {
            data.digest();
        }
    },
    updateMonths(render) {
        let rows = [],
            data = this.updater,
            json = data.get(),
            year = json.year,
            min = json.min,
            max = json.max;
        for (let i = 1; i <= 12; i++) {
            rows.push({
                month: i,
                selected: year == json.selectedYear && i == json.selectedMonth,
                disabled: MonthDisabled(year, i - 1, min, max)
            });
        }
        data.set({
            months: rows
        });
        if (render) {
            data.digest();
        }
    },
    updateDays(render) {
        let me = this;
        let trs = [];
        let data = me.updater;
        let weekStart = data.get('weekStart');
        let year = data.get('year');
        let month = data.get('month');
        let startOffset = (7 - weekStart + new Date(year, month - 1, 1).getDay()) % 7;
        let tds = [];
        let days = GetNumOfDays(year, month),
            i;
        let preDays = GetNumOfDays(year, month - 1);
        let max = data.get('max');
        let min = data.get('min');
        let selected = data.get('selected');
        let day, date, formatDay;
        for (i = 1; i <= startOffset; i++) {
            day = preDays - (startOffset - i);
            date = new Date(year, month - 2, day);
            tds.push({
                month: month - 1,
                full: DateFormat(date, DefaultFormatter),
                day: day,
                otherMonth: true,
                disabled: DateDisabled(date, min, max)
            });
        }
        for (i = 1; i <= days; i++) {
            date = new Date(year, month - 1, i);
            formatDay = DateFormat(date, DefaultFormatter);
            tds.push({
                selected: formatDay == selected,
                day: i,
                month: month,
                full: formatDay,
                disabled: DateDisabled(date, min, max)
            });
            if (((i + startOffset) % 7) === 0) {
                trs.push(tds);
                tds = [];
            }
        }
        let fillStart = tds.length; //补充
        let fillEnd = 14; //2周
        for (i = fillStart; i < fillEnd; i++) {
            day = i - fillStart + 1;
            date = new Date(year, month, day);
            tds.push({
                month: month + 1,
                day: day,
                otherMonth: true,
                full: DateFormat(date, DefaultFormatter),
                disabled: DateDisabled(date, min, max)
            });
            if ((i + 1) % 7 === 0) {
                trs.push(tds);
                tds = [];
                if (trs.length == 6) break;
            }
        }
        data.set({
            days: trs
        });
        if (render) {
            data.digest();
        }
    },
    render() {
        let me = this;
        me.update(me.$extra);
    },
    changeMonth(toNext) {
        let me = this,
            data = me.updater,
            month = data.get('month'),
            year = data.get('year');
        if (toNext) {
            month += 1;
            if (month > 12) {
                month = 1;
                year++;
            }
        } else {
            month -= 1;
            if (month < 1) {
                month = 12;
                year--;
            }
        }
        data.set({
            year: year,
            month: month
        });
        me.updateDays(true);
    },
    toDaysPannel() {
        let me = this;
        $('#months_' + me.id).hide();
        $('#days_' + me.id).show();
        $('#years_' + me.id).hide();
    },
    'changeMonth<click>' (e) {
        this.changeMonth(e.params.next);
    },
    'changeYear<click>' (e) {
        let me = this;
        let params = e.params;
        let data = me.updater,
            year = data.get('year');
        if (params.range) {
            year = year + (params.next ? 10 : -10);
        } else {
            year = year + (params.next ? 1 : -1);
        }
        data.set({
            year: year
        });
        if (params.range) {
            me.updateYears(true);
        } else {
            me.updateMonths(true);
        }
    },
    'showMonths<click>' () {
        let me = this;
        $('#days_' + me.id).slideUp('fast');
        $('#months_' + me.id).slideDown('fast');
        me.updateMonths(true);
    },
    'showYears<click>' () {
        let me = this;
        $('#months_' + me.id).slideUp('fast');
        $('#years_' + me.id).slideDown('fast');
        me.updateYears(true);
    },
    'pickYear<click>' (e) {
        let year = e.params.year;
        let me = this;
        me.updater.set({
            year: +year
        });
        $('#years_' + me.id).slideUp('fast');
        $('#months_' + me.id).slideDown('fast');
        me.updateMonths(true);
    },
    'pickMonth<click>' (e) {
        let month = e.params.month;
        let me = this;
        me.updater.set({
            month: +month
        });
        $('#months_' + me.id).slideUp('fast');
        $('#days_' + me.id).slideDown('fast');
        me.updateDays(true);
    },
    'choose<click>' (e) {
        let me = this;
        $('#days_' + me.id + ' span').removeClass('@index.less:selected');
        $(e.eventTarget).addClass('@index.less:selected');
        let data = me.updater;
        me.updateSelected(e.params.date);
        if (e.params.toMonth != data.get('month')) {
            me.changeMonth(e.params.toMonth - data.get('month') > 0);
        }
        $('#' + me.id).trigger({
            type: 'change',
            date: e.params.date
        });
    }
}, {
    parse: DateParse,
    format: DateFormat,
    dateDisabled: DateDisabled
});
