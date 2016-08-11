define('coms/calendar/rangepicker',['magix','$','./index','../picker/index','./datepicker'],function(require,exports,module){
/*Magix ,$ ,Calendar ,Picker ,Datepicker */
/*
    author:xinglie.lkf@taobao.com
 */
var Magix = require('magix');
var $ = require('$');
var Calendar = require('./index');
var Picker = require('../picker/index');
var Datepicker = require('./datepicker');
var DateParse = Calendar.parse;
var DateFormat = Calendar.format;
Magix.applyStyle('mx-bd5',".mx-bd5-shortcuts{width:220px;padding:4px}.mx-bd5-shortcuts-header{height:22px;line-height:22px;margin:4px 10px}.mx-bd5-shortcuts a{padding:4px;float:left;width:65px;height:20px;line-height:20px;text-align:center}.mx-bd5-shortcuts a:hover{background:#eee;cursor:pointer;border-radius:4px}.mx-bd5-clearfix:after{content:\" \";display:block;clear:both;height:0}.mx-bd5-clearfix{zoom:1}.mx-bd5-datepicker{margin:4px;text-align:center}.mx-bd5-datepicker input{width:80px}.mx-bd5-buttons{margin:15px 4px 10px 14px}.mx-bd5-buttons button{height:25px;margin-right:5px;width:50px}.mx-bd5-shortcuts a.mx-bd5-selected,.mx-bd5-shortcuts a.mx-bd5-selected:hover{cursor:pointer;background-color:#197de1;background-image:-webkit-linear-gradient(top,#1b87e3 2%,#166ed5 98%);background-image:linear-gradient(180deg,#1b87e3 2%,#166ed5 98%);color:#ecf2f8;text-shadow:0 -1px 0 rgba(0,0,0,.05);border-radius:2px}");
var DayMillisecond = 86400000,
    GetOffsetDate = function(offset, date) {
        if (!date) {
            date = new Date();
        }
        var uom = new Date(date.getTime() + offset * DayMillisecond);
        uom = uom.getFullYear() + '/' + (uom.getMonth() + 1) + '/' + uom.getDate();
        return new Date(uom);
    },
    Today = GetOffsetDate(0),
    Yesterday = GetOffsetDate(-1),
    GetLastMonth = function() {
        var start = new Date(Today.getFullYear(), Today.getMonth() - 1, 1),
            startYear = start.getFullYear(),
            startMonth = start.getMonth(),
            lastDay = 32 - new Date(startYear, startMonth, 32).getDate();
        return {
            start: start,
            end: new Date(startYear, startMonth, lastDay)
        };
    },
    GetLastWeek = function(start) {
        var temp = GetOffsetDate(-7),
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
var QuickDates = {
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
var TempDates = [2, 6, 13, 14, 29, 89];
for (var i = 0, date, dateSucc; i < TempDates.length; i++) {
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
var QueryQuickDateKeys = [
    'preMonth',
    'preWeekMon',
    'preWeekSun',
    'passedThisMonth',
    'lastestThisMonth'
];
var Rangepicker = Picker.extend({
    tmpl: {"html":"<%if(quickDates.length){%><div class=\"mx-bd5-shortcuts-header\">快捷日期</div><div class=\"mx-bd5-shortcuts mx-bd5-clearfix\" mx-guid=\"x9481-\u001f\">@1-\u001f</div><%}%><div class=\"mx-bd5-shortcuts-header\">日期范围</div><div class=\"mx-bd5-datepicker mx-bd5-clearfix\" mx-guid=\"x9482-\u001f\">@2-\u001f</div><div class=\"mx-bd5-buttons mx-bd5-clearfix\"><button mx-click=\"picked()\" class=\"btn\">确定</button> <button mx-click=\"hide()\" class=\"btn\">取消</button></div>","subs":[{"guid":1,"keys":["dates"],"tmpl":"<%for(var i=0;i<quickDates.length;i++){var key=quickDates[i],info=quickDatesMap[key]%><a <%if(dates.quickDateKey==key){%> class=\"mx-bd5-selected\" <%}%> mx-click=\"picked({quick:true,key:'<%=key%>'})\"><%=info?info.text:key%></a><%}%>","selector":"div[mx-guid=\"x9481-\u001f\"]"},{"guid":2,"keys":["dates"],"tmpl":"<input class=\"input\" value=\"<%=dates.startStr%>\" readonly=\"readonly\" mx-click=\"showDatepicker({first:true})\" id=\"start_<%=id%>\"/>-<input class=\"input\" value=\"<%=dates.endStr%>\" readonly=\"readonly\" mx-click=\"showDatepicker()\" id=\"end_<%=id%>\"/>","selector":"div[mx-guid=\"x9482-\u001f\"]"}]},
    ctor: function(ops) {
        var me = this;
        me.$dates = ops.dates;
        me.$quickDates = ops.quickDates || [];
        me.$picked = ops.picked;
    },
    inside: function(node) {
        var me = this;
        var inside = Magix.inside(node, me.id) || Magix.inside(node, me.$ownerNodeId);
        if (!inside) {
            var children = me.owner.children();
            for (var i = children.length - 1; i >= 0; i--) {
                var child = Magix.Vframe.get(children[i]);
                if (child)
                    inside = child.invoke('inside', node);
                if (inside) break;
            }
        }
        console.log(inside);
        return inside;
    },
    render: function() {
        var me = this;
        me.$updater.set({
            id: me.id,
            quickDatesMap: QuickDates,
            quickDates: me.$quickDates,
            dates: me.$dates
        }).digest();
        me.show();
    },
    hide: function() {
        var me = this;
        Picker.prototype.hide.call(me);
        var dates = me.$updater.get('dates');
        $('#start_' + me.id).val(dates.startStr);
        $('#end_' + me.id).val(dates.endStr);
    },
    'hide<click>': function() {
        this.hide();
    },
    'showDatepicker<click>': function(e) {
        var me = this,
            node = e.current,
            params = e.params;
        var dparams = {
            id: 'dp_' + node.id,
            ownerNodeId: node.id,
            selected: node.value,
            dock: me.$dock,
            picked: function(pe) {
                node.value = pe.date;
            }
        };
        if (params.first) {
            dparams.max = $('#end_' + me.id).val();
        } else {
            dparams.min = $('#start_' + me.id).val();
        }
        Datepicker.show(me, dparams);
    },
    'picked<click>': function(e) {
        var me = this;
        var params = e.params;
        var data = me.$updater;
        var dates = data.get('dates'),
            start, end, startStr, endStr;
        if (params.quick) {
            dates.quickDateKey = params.key;
            var info = QuickDates[params.key];
            start = info.start;
            end = info.end;
            startStr = DateFormat(start, dates.formatter);
            endStr = DateFormat(end, dates.formatter);
            dates.startStr = startStr;
            dates.endStr = endStr;
            dates.start = start;
            dates.end = end;
            dates.quickDateText = info.text;
            data.set({
                dates: dates
            });
            data.digest();
        } else {
            startStr = $('#start_' + me.id).val();
            endStr = $('#end_' + me.id).val();
            dates = Rangepicker.getRangeDescription(startStr, endStr, me.$quickDates);
            data.set({
                dates: dates
            });
            data.digest();
        }
        if (me.$picked) {
            me.$picked(dates);
        }
        me.hide();
    }
}, {
    show: function(view, ops) {
        var id = ops.ownerNodeId;
        id = 'rp_' + id;
        var vf = Magix.Vframe.get(id);
        if (!vf) {
            $('body').append('<div id="' + id + '" />');
            view.owner.mountVframe(id, 'coms/calendar/rangepicker', ops);
        } else {
            vf.invoke('show');
        }
    },
    getSupportQuickDates: function() {
        return QuickDates;
    },
    getRangeDescription: function(start, end, translateQuickdatesKeys) {
        start = DateParse(start);
        end = DateParse(end);
        var formatter = 'yyyy-MM-dd';
        var result = {
            startStr: DateFormat(start, formatter),
            endStr: DateFormat(end, formatter),
            formatter: formatter
        };
        var quickDateKey,
            todayMillisecond = Today.getTime(),
            yesterdayMillisecond = Yesterday.getTime(),
            startMillisecond = start.getTime(),
            endMillisecond = end.getTime();
        if (startMillisecond == endMillisecond) {
            if (todayMillisecond == endMillisecond) {
                quickDateKey = 'today';
            } else if (yesterdayMillisecond == endMillisecond) {
                quickDateKey = 'yesterday';
            }
        } else {
            var mapped;
            var days = (endMillisecond - startMillisecond) / DayMillisecond + 1;
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
            for (var i = QueryQuickDateKeys.length - 1; i > -1; i--) {
                var param = QueryQuickDateKeys[i];
                var info = QuickDates[param];
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

module.exports = Rangepicker;
});